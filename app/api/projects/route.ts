import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get("statusFilter") || "All";

  // Validate that status is one of the allowed values
  const allowedStatuses = ["All", "Active", "Archived", "Completed"];
  if (!allowedStatuses.includes(statusFilter)) {
    return new NextResponse("Invalid status filter", { status: 400 });
  }

  const newProjects = await prisma.project.findMany({
    where: {
      userId,
      ...(statusFilter !== "All" && {
        status: statusFilter as "Active" | "Archived" | "Completed",
      }),
    },
  });

  return NextResponse.json({ projects: newProjects });
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await req.json();
  const { name, description } = body;

  if (!name || name.trim() === "") {
    return new NextResponse("Name is required", { status: 400 });
  }

  const newProject = await prisma.project.create({
    data: {
      name,
      description,
      userId,
      status: "Active",
    },
  });
  return NextResponse.json({
    message: "Project created",
    project: newProject,
  });
}
