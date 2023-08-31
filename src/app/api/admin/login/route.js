import { prisma } from "@/db/prisma";
import { compare } from "@/utils/hash";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  const requestedAdmin = await prisma.admin.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (requestedAdmin) {
    const isValidPassword = compare(requestedAdmin.password, password);

    if (isValidPassword) {

      return NextResponse.json(
        {
          message: "User Logged In",
        },
        { status: 200 }
      );
    }
  }

  return NextResponse.json(
    {
      error: "invalid credentials",
    },
    { status: 400 }
  );
}