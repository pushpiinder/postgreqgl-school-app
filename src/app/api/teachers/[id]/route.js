import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma"; 

export async function GET(res, { params }) {
    const {id} = params;

    const teacher = await prisma.teacher.findFirst({
        where: {
            id: {
                equals: Number(id),
            }
        }
    });
    
    if(teacher) {
        return NextResponse.json(teacher);
    }

    return NextResponse.json({ error: "No teachers found" }, { status: 404 });
}