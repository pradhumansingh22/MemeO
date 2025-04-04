import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/app/lib/prisma";

export async function GET(req:NextRequest) {
    const session = await getServerSession();
    
     if (!session || !session.user?.email) {
       return NextResponse.json(
         { message: "Unauthenticated" },
         { status: 403 }
       );
     }

     const user = await prisma.user.findFirst({
       where: { email: session.user.email },
     });

     if (!user) {
       return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const memeId = req.nextUrl.searchParams.get("id");
  if (!memeId) {
    return NextResponse.json({ message: "memeId not fount" }, { status: 403 });
    }
    
  try {
     const meme = await prisma.meme.findFirst({
       where: {
         id: memeId,
       },
       include: {
         user: { select: { id: true } },
         tags: { include: { tag: true } },
         likes: true,
       },
     });

     const formattedMeme = {
       memeId,
       fileUrl: meme?.fileUrl,
       fileType: meme?.fileType,
       caption: meme?.caption,
       createdAt: meme?.createdAt,
       tags: meme?.tags.map((tag) => tag.tag.name), 
       likes: meme?.likes.length,
       user: meme?.user,
     };

    return NextResponse.json({success:true, meme:formattedMeme}, {status:200})
  } catch (error) {
     return NextResponse.json({ error: error }, { status: 500 });
  }
 
}