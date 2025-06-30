import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const session = await prisma.pomodoroSession.findMany({
    where: { userId },
    select: { startedAt: true },
  });

  if (!session || session.length === 0) {
    return NextResponse.json({
      currentStreak: 0,
      lastFocusedDay: null,
    });
  }
  const sessionDates = new Set(
    session.map((s) => new Date(s.startedAt).toISOString().slice(0, 10))
  );

  // Step 2: Start streak from today and move backward
  let streak = 0;
  let today = new Date();
  let dateStr = today.toISOString().slice(0, 10);

  while (sessionDates.has(dateStr)) {
    streak++;
    today.setDate(today.getDate() - 1);
    dateStr = today.toISOString().slice(0, 10);
  }

  return NextResponse.json({
    currentStreak: streak,
    lastFocusedDay: streak > 0 ? new Date().toISOString().slice(0, 10) : null,
  });
}
