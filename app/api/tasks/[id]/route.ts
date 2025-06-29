import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { title } = body;
  const url = new URL(req.url);
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const taskId = params.id;

  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
      userId,
    },
    data: { title },
  });

  return NextResponse.json({
    message: "Task updated",
    task: updatedTask,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const taskId = params.id;
  try {
    const deleleTask = await prisma.task.delete({
      where: { id: taskId, userId },
    });
    return NextResponse.json({ message: "Task deleted", task: deleleTask });
  } catch (error) {
    return new NextResponse("Task not found", { status: 404 });
  }
}
