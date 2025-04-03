import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userId = user.id;
    const { memeId } = await req.json();
    if (!memeId) {
      return NextResponse.json({ message: "MemeId not sent" }, { status: 400 });
    }

    await prisma.likes.create({
      data: {
        userId,
        memeId,
      },
    });
    const likes = await prisma.likes.count({ where: { memeId } });

    return NextResponse.json({ likes: likes}, { status: 200 });
  } catch (error) {
    console.error("Error liking meme:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userId = user.id;
    const memeId = req.nextUrl.searchParams.get("memeId");
    if (!memeId) {
      return NextResponse.json({ message: "MemeId not sent" }, { status: 400 });
    }

    const likes = await prisma.likes.count({ where: { memeId } });
    const isLiked = await prisma.likes.findFirst({
      where: {
        userId,
        memeId
    }})

    return NextResponse.json({likes, isLiked}, { status: 200 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 403 });
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userId = user.id;
    const memeId = req.nextUrl.searchParams.get("memeId");
    if (!memeId) {
      return NextResponse.json({ message: "MemeId not sent" }, { status: 400 });
    }

    await prisma.likes.deleteMany({
      where: {
        userId,
        memeId
      }
    });
    const likes = await prisma.likes.count({ where: { memeId } });

    return NextResponse.json({likes}, { status: 200 });
  } catch (error) {
    console.error("Error getting likes:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}
