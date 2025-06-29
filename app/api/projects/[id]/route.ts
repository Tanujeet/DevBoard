import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const projectId = params.id;
  const body = await req.json();
  const { name, description } = body;

  if (!name || name.trim() === "") {
    return new NextResponse("Name is required", { status: 400 });
  }

  const updatedProject = await prisma.project.update({
    Where: { id: projectId, userId },
    data: {
      name,
      description,
    },
  });

  return NextResponse.json({
    message: "Project updated",
    project: updatedProject,
  });
}

export async function DELETE({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const projectId = params.id;

  const deleteProject = await prisma.project.delete({
    where: { id: projectId, userId: userId },
  });

  return NextResponse.json({ message: "Project deleted succesfully" });
}
