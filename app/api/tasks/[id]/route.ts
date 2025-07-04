import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function PATCH(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json();
  const { title, status, dueDate } = body;
  const { id: taskId } = await paramsPromise;
  // Validate inputs
  if (!title || !status) {
    return new NextResponse("Title and status required", { status: 400 });
  }

  const allowedStatuses = ["pending", "in-progress", "completed"];
  if (!allowedStatuses.includes(status)) {
    return new NextResponse("Invalid status", { status: 400 });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
        userId,
      },
      data: {
        title,
        status,
        dueDate: dueDate ? new Date(dueDate) : null, // ✅ KEY LINE
      },
    });

    return NextResponse.json({ task: updatedTask });
  } catch (err) {
    console.log("PATCH ERROR:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { id: taskId } = await paramsPromise;
  try {
    const deleleTask = await prisma.task.delete({
      where: { id: taskId, userId },
    });
    return NextResponse.json({ message: "Task deleted", task: deleleTask });
  } catch (err) {
    console.log(err);
    return new NextResponse("Task not found", { status: 404 });
  }
}
