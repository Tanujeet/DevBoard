import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const totalTask = await prisma.task.count({
    where: { userId },
  });

  const completedTask = await prisma.task.count({
    where: { userId, status: "Completed" },
  });

  const activeTask = await prisma.task.count({
    where: { userId, status: "in-progress" },
  });

  const totalProject = await prisma.project.count({
    where: { userId },
  });

  const archivedProject = await prisma.project.count({
    where: { userId, status: "Archived" },
  });

  const activeProject = await prisma.project.count({
    where: { userId, status: "Active" },
  });

  const pomodoroSession = await prisma.pomodoroSession.count({
    where: { userId },
  });

  const focusTime = await prisma.pomodoroSession.aggregate({
    where: { userId },
    _sum: { duration: true },
  });

  const totalMinutes = focusTime._sum.duration || 0;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours}h ${minutes}m`;

  return NextResponse.json({
    totalTask,
    completedTask,
    activeTask,
    totalProject,
    activeProject,
    archivedProject,
    pomodoroSession,
    totalFocusTime: formattedTime,
  });
}
