import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { TaskStatus, ProjectStatus } from "@prisma/client";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const totalTask = await prisma.task.count({ where: { userId } });
    const completedTask = await prisma.task.count({
      where: { userId, status: TaskStatus.COMPLETED },
    });
    const activeTask = await prisma.task.count({
      where: { userId, status: TaskStatus.IN_PROGRESS },
    });

    const totalProject = await prisma.project.count({ where: { userId } });
    const archivedProject = await prisma.project.count({
      where: { userId, status: ProjectStatus.Archived },
    });
    const activeProject = await prisma.project.count({
      where: { userId, status: ProjectStatus.Active },
    });

    const pomodoroSession = await prisma.pomodoroSession.count({
      where: { userId },
    });

    const focusTime = await prisma.pomodoroSession.aggregate({
      where: { userId },
      _sum: { duration: true },
    });

    const totalMinutes = focusTime._sum?.duration ?? 0;

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
  } catch (error) {
    const err = error instanceof Error ? error.message : JSON.stringify(error);
    console.error("ANALYTICS API ERROR:", err);
    return new NextResponse(err, { status: 500 });
  }
  
}
