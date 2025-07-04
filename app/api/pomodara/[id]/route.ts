import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 404 });
  }
  const sessionId = params.id;
  const body = await req.json();
  const { duration, taskId } = body;

  if (!duration) {
    return new NextResponse("Duration doesnt exist", { status: 404 });
  }

  const updatedSession = await prisma.pomodoroSession.update({
    where: {
      id: sessionId,
      userId: userId,
    },
    data: {
      ...(duration && { duration }),
      ...(taskId && { taskId }),
    },
  });

  return NextResponse.json({
    message: "Session updated",
    session: updatedSession,
  });
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const pomoId = params.id;

  const session = await prisma.pomodoroSession.findFirst({
    where: {
      id: pomoId,
      userId: userId,
    },
  });

  if (!session) {
    return new NextResponse("Pomodoro not found", { status: 404 });
  }

  const deleteSession = await prisma.pomodoroSession.delete({
    where: { id: pomoId },
  });
  return NextResponse.json({
    message: "Pomodoro session deleted successfully",
    deleteSession,
  });
}
