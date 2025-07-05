import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

import { TaskStatus } from "@prisma/client";
import { Prisma, TaskStatus as PrismaTaskStatus } from "@prisma/client";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const statusParam = url.searchParams.get("status");

  const whereClause: { userId: string; status?: PrismaTaskStatus } = { userId };
  if (statusParam) {
    const validGetStatuses = Object.values(PrismaTaskStatus);
    if (validGetStatuses.includes(statusParam as PrismaTaskStatus)) {
      whereClause.status = statusParam as PrismaTaskStatus;
    } else {
      return new NextResponse("Invalid status query parameter", {
        status: 400,
      });
    }
  }

  try {
    const findTask = await prisma.task.findMany({
      where: whereClause,
    });

    return NextResponse.json({ tasks: findTask });
  } catch (error) {
    console.error("GET TASKS ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

type CreateTaskPayload = {
  title: string;
  status: TaskStatus;
  dueDate?: string;
};

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = (await req.json()) as CreateTaskPayload;
  const { title, status, dueDate } = body;

  console.log("Received status:", status);
  console.log("Received dueDate:", dueDate);

  if (!title?.trim()) {
    return new NextResponse("Title is required", { status: 400 });
  }

  // Validate enum
  if (!Object.values(TaskStatus).includes(status)) {
    return new NextResponse("Invalid status", { status: 400 });
  }

  // Validate date string (if provided)
  let parsedDueDate: Date | undefined;
  if (dueDate !== undefined) {
    const ms = Date.parse(dueDate);
    if (isNaN(ms)) {
      return new NextResponse("Invalid dueDate", { status: 400 });
    }
    parsedDueDate = new Date(ms);
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        userId,
        status,
        dueDate: parsedDueDate ?? null,
      },
    });

    return NextResponse.json({ message: "Task created", task: newTask });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("POST TASK ERROR:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
