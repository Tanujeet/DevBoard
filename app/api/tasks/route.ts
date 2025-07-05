import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


import { TaskStatus as PrismaTaskStatus } from "@/lib/generated/prisma";

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

export async function POST(req: Request) {
  console.log("DATABASE_URL in API route:", process.env.DATABASE_URL);
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title, status, dueDate } = body;

  if (!title || title.trim() === "") {
    return new NextResponse("Title is required", { status: 400 });
  }

  const allowedStatuses: PrismaTaskStatus[] = [
    PrismaTaskStatus.TODO,
    PrismaTaskStatus.IN_PROGRESS,
    PrismaTaskStatus.COMPLETED,
  ];

  if (!allowedStatuses.includes(status as PrismaTaskStatus)) {
    return new NextResponse("Invalid status", { status: 400 });
  }

  try {
    const createNewTask = await prisma.task.create({
      data: {
        title,
        userId,
        status: status as PrismaTaskStatus,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    return NextResponse.json({
      message: "Task created",
      task: createNewTask,
    });
  } catch (error: unknown) {
    console.error("POST TASK ERROR:", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
