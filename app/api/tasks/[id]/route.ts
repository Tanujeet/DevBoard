import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = PrismaClient();

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

export async function DELETE() {}
