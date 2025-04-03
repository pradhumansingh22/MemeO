import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
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
    try {
            const memes = await prisma.meme.findMany({
              include: {
                user: { select: { id: true } },
                tags: { include: { tag: true }, },
                likes: true,
                saves: { where: { userId: user.id }, select: { id: true } }
              },
            });

            const formattedMemes = memes.map((meme) => ({
              id: meme.id,
              userId: meme.userId,
              fileUrl: meme.fileUrl,
              fileType: meme.fileType,
              caption: meme.caption,
              createdAt: meme.createdAt,
              tags: meme.tags.map((tag) => tag.tag.name),
              likes: meme.likes.length,
              user: meme.user,
              isSaved:meme.saves.length > 0
            }));
            return NextResponse.json(
              { success: true, memes: formattedMemes },
              { status: 200 }
            );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }


}