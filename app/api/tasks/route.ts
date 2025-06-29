import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const url = new URL(req.url);
  const status = url.searchParams.get("status");

  const findTask = await prisma.task.findMany({
    where: { userId, ...(status && { status }) },
  });

  return NextResponse.json({ tasks: findTask });
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title } = body;

  if (!title || title.trim() === "") {
    return new NextResponse("Title is required", { status: 400 });
  }

  const createNewTask = await prisma.task.create({
    data: {
      title: title,
      userId: userId,
      status: "todo",
    },
  });

  return NextResponse.json({
    message: "Task created",
    task: createNewTask,
  });
}
