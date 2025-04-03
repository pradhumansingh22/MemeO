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
      return NextResponse.json(
        { message: "memeId not found" },
        { status: 400 }
      );
    }

    const savedMeme = await prisma.saves.create({
      data: {
        userId: userId,
        memeId: memeId,
      },
    });

    return NextResponse.json(
      { success:true, savedMemeId: savedMeme.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving meme:", error);
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

    const savedMemes = await prisma.saves.findMany({
      where: { userId },
      include: {
        meme: {
          include: {
            tags: {
              include: {
                tag: true, 
              },
            },
            likes: true,
            user: true,
          },
        },
      },
    });

    const formattedMemes = savedMemes.map((savedMeme) => ({
      id: savedMeme.meme.id, 
      userId: savedMeme.meme.userId,
      fileUrl: savedMeme.meme.fileUrl,
      fileType: savedMeme.meme.fileType,
      caption: savedMeme.meme.caption,
      createdAt: savedMeme.meme.createdAt,
      tags: savedMeme.meme.tags.map((tag) => tag.tag.name), 
      likes: savedMeme.meme.likes.length, 
      user: savedMeme.meme.user, 
    }));
    return NextResponse.json({ success: true, savedMemes: formattedMemes }, { status: 200 });

  } catch (error) {
    console.error("Error fetching saved memes:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req:NextRequest) {
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

    const memeId  = req.nextUrl.searchParams.get("memeId");
    if (!memeId) {
      return NextResponse.json(
        { message: "memeId not found" },
        { status: 400 }
      );
    }

    await prisma.saves.deleteMany({
      where: {
        memeId: memeId,
        userId: userId
      }
    });

    return NextResponse.json({ Success: true , message:"Meme unsaved"}, { status: 200 });


  } catch (error) {
    console.error("Error saving meme:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}
