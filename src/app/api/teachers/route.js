import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { z } from "zod";

const teacherSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number().min(18).max(60),
    gender: z.enum(['m', 'f']),
    email: z.string().email().min(5)
});

export async function GET() {
    const teachers = await prisma.teacher.findMany();
    return NextResponse.json(teachers);
}

export async function POST(req) {
   try {
       const teacher = teacherSchema.parse(await req.json());
       
        const newTeacher = await prisma.teacher.create({
            data: teacher,
        });

        return NextResponse.json(newTeacher);
    } catch (e) {

        console.error(e);
        if(e instanceof z.ZodError) {
            const error = e.format();

            // return NextResponse.json({ error }, {status: 400});
            return NextResponse.json({ ZodError: error }, {status: 400});
        }

        return NextResponse.json({ message:"Something went wrong" }, {status: 500});
    } 
}