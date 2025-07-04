import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const url = new URL(req.url);
  const taskId = url.searchParams.get("taskId");

  const findPomo = await prisma.pomodoroSession.findMany({
    where: { userId: userId, ...(taskId && { taskId }) },
  });

  return NextResponse.json({ sessions: findPomo });
}
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  try {
    const body = await req.json();
    const { duration, taskId } = body;

    if (!duration || typeof duration !== "number") {
      return new NextResponse("Invalid duration", { status: 400 });
    }

    const newPomo = await prisma.pomodoroSession.create({
      data: {
        userId,
        duration,
        taskId: taskId || null,
      },
    });

    return NextResponse.json(
      { message: "New pomo created", pomo: newPomo },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error creating pomodoro session:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
