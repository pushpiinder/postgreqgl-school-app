import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma"; 

export async function GET(res, { params }) {
    const {id} = params;

    const student = await prisma.student.findFirst({
        where: {
            id: {
                equals: id,
            }
        }
    });
    return NextResponse.json(student);
}