import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

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
      const tags = req.nextUrl.searchParams.getAll("tags");
      if (!tags.length) {
        return NextResponse.json(
          { error: "No tags provided" },
          { status: 400 }
        );
      }
    const relatedMemes = await prisma.meme.findMany({
      where: {
        tags: {
          some: {
            tag: {
              name: {
                in: tags,
              },
            },
          },
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        likes: true,
        user: true,
      },
    });

    const searchedMemes = relatedMemes.map((meme) => ({
      id: meme.id,
      userId: meme.userId,
      fileUrl: meme.fileUrl,
      fileType: meme.fileType,
      caption: meme.caption,
      createdAt: meme.createdAt,
      tags: meme.tags.map((tag) => tag.tag.name),
      likes: meme.likes.length,
      user: meme.user,
    }));

    return NextResponse.json(
      { success: true, searchedMemes: searchedMemes },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching memes:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}
