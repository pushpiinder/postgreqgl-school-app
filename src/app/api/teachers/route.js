import { NextResponse } from "next/server";
import { verify } from "@/utils/jwt";
import { cookies } from "next/headers";
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

    // const token = await verify(cookies().get({ name: "token" })?.value);

    // if(!token || token.payload.accessLevel !== "admin") {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const teachers = await prisma.teacher.findMany();
    return NextResponse.json(teachers);
}

export async function POST(req) {
   try {
       const teacher = teacherSchema.parse(await req.json());
       
        const newTeacher = await prisma.teacher.create({
            data: teacher,
        });

        return NextResponse.json(newTeacher, {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": "daniakash.com google.com",
              "Access-Control-Allow-Methods": "GET",
            },
        });
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