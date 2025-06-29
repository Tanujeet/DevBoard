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
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const body = await req.json();
  const { duration, taskId } = body;

  if (!duration) {
    return new NextResponse("Invalid duration", { status: 400 });
  }

  const newPomo = await prisma.pomodoroSession.create({
    data: { duration, taskId, userId },
  });

  return NextResponse.json(
    { message: "New pomo created", pomo: newPomo },
    { status: 200 }
  );
}
