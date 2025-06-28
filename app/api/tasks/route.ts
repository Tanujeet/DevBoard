import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET /api/tasks
export async function GET() {
  return NextResponse.json({ tasks: ["task 1", "task 2"] });
}

// POST /api/tasks
export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title } = body;

  return NextResponse.json({
    message: "Task created",
    task: { title, userId },
  });
}
