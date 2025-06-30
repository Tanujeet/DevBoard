import { prisma } from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // 1. Get all pomodoro sessions of the user
  const sessions = await prisma.pomodoroSession.findMany({
    where: { userId },
  });

  // 2. Total sessions
  const totalSessions = sessions.length;

  // 3. Total minutes
  const totalMinutes = sessions.reduce(
    (acc, session) => acc + session.duration,
    0
  );

  // 4. Average duration
  const averageDuration =
    totalSessions === 0 ? 0 : totalMinutes / totalSessions;

  // 5. Group by date to find best day
  const dayMap: Record<string, number> = {};

  sessions.forEach((session) => {
    const day = new Date(session.startedAt).toDateString();
    if (!dayMap[day]) dayMap[day] = 0;
    dayMap[day] += session.duration;
  });

  const bestDay = Object.entries(dayMap).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["", 0]
  )[0];

  // 6. Return summary response
  return NextResponse.json({
    totalSessions,
    totalMinutes,
    averageDuration,
    bestDay,
  });
}
