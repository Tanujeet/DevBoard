import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const sessions = await prisma.pomodoroSession.findMany({
    where: { userId },
    select: {
      duration: true,
      startedAt: true,
    },
  });

  // Group durations by date
  const dailyMap: Record<string, number> = {};

  sessions.forEach((session) => {
    const date = new Date(session.startedAt).toISOString().slice(0, 10); // "YYYY-MM-DD"
    if (!dailyMap[date]) dailyMap[date] = 0;
    dailyMap[date] += session.duration;
  });

  // Convert to sorted array
  const result = Object.entries(dailyMap)
    .map(([date, totalMinutes]) => ({
      date,
      totalMinutes,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return NextResponse.json(result);
}
