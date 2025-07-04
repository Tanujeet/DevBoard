import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ProjectStatus } from "@prisma/client";

export async function PATCH(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id: projectId } = await paramsPromise;
  const body = await req.json();
  const { name, description, status } = body;

  if (!name || name.trim() === "") {
    return new NextResponse("Name is required", { status: 400 });
  }
  console.log("Incoming status:", status); // 👀 Check kya aa raha

  const updatedProject = await prisma.project.update({
    where: { id: projectId, userId },
    data: {
      name,
      description,
      status: status as ProjectStatus,
    },
  });

  return NextResponse.json({
    message: "Project updated",
    project: updatedProject,
  });
}

export async function DELETE(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id: projectId } = await paramsPromise;

  const deleteProject = await prisma.project.delete({
    where: { id: projectId, userId: userId },
  });

  return NextResponse.json({
    message: "Project deleted succesfully",
    deleteProject,
  });
}
