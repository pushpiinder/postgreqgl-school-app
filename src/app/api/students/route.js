import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { z } from "zod";

const studentSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().min(5).max(16),
    gender: z.enum(["m", "f"]),
    email: z.string().email().min(5),
    teacherId: z.number(),
});

export async function GET() {
    const students = studentSchema.parse(await prisma.student.findMany());
    return NextResponse.json(students);
}

export async function POST(req) {
   try {
    //    const student = await req.json();
       const student = studentSchema.parse(await req.json());
       
        console.log(student)

        // prisma.student.create({
        //     data: {

        //     }
        // })

        return NextResponse.json([]);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message:"Something went wrong" }, {status: 500});
    } 
}