import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth()
    
    if (!userId) {
        return new NextResponse("Unauthorised",{status:404})
    }

    const totalTask = await prisma.task.count()
    const completedTask = await prisma.task.count({ where: { status: "Completed" } })
    const activeTask = await prisma.task.count({where:{status:"in-progress"}})


    const totalProject = await prisma.project.count()
    const arhcivedProject = await prisma.project.count({where:{status:"Archived"}}) 
    const activeProject = await prisma.project.count({where:{status:"Active"}}) 
    




    return NextResponse.json({
    totalTask,totalProject,completedTask,activeProject,activeTask,arhcivedProject
})







}