import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const body = await req.json();
  const { title } = body;
  const url = new URL(req.url);
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function DELETE() {}
