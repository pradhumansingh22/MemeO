import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

const signUpSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  const signUpBody = await req.json();
  try {
    const { success } = signUpSchema.safeParse(signUpBody);
    if (!success) {
      return NextResponse.json(
        {
          message: "Invalid inputs",
        },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(signUpBody.password, 10);
    const user = await prisma.user.create({
      data: {
        firstName: signUpBody.firstName,
        lastName: signUpBody.lastName,
        email: signUpBody.email,
        password: hashedPassword,
      },
    });
    
    return NextResponse.json(
      { message: "successfully signed up", id: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { messge: "Internal server error" },
      { status: 500 }
    );
  }
}
