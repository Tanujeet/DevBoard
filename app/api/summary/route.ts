import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const totalTasks = await prisma.task.count({ where: { userId } });
  const totalProjects = await prisma.project.count({ where: { userId } });
  const totalMinutes = await prisma.pomodoroSession.aggregate({
    where: { userId },
    _sum: { duration: true },
  });

  return NextResponse.json({
    totalTasks,
    totalProjects,
    totalMinutes: totalMinutes._sum.duration || 0,
  });
}
