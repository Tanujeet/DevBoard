
import { NextResponse } from "next/server";

// GET /api/tasks
export async function GET() {
  // yahan Prisma se task list fetch karni hogi
  return NextResponse.json({ tasks: ["task 1", "task 2"] });
}

// POST /api/tasks
export async function POST(req: Request) {
  const body = await req.json(); // req.body nahi chalega, ye fetch API hai
  const { title } = body;

  // yahan Prisma se task create hoga

  return NextResponse.json({ message: "Task created", task: { title } });
}
