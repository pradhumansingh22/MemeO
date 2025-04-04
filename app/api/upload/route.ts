import {prisma} from "@/app/lib/prisma";
import { supabase } from "@/app/lib/utils/supabaseClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;
    const tagsString = formData.get("tags") as string;

    if (!file || !userId || !caption || !tagsString) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let tags: string[];
    try {
      tags = JSON.parse(tagsString);
      if (!Array.isArray(tags)) throw new Error();
    } catch {
      return NextResponse.json(
        { error: "Tags must be an array" },
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("memes")
      .upload(fileName, file, { contentType: file.type });

    if (error) throw error;

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/memes/${fileName}`;
    const fileType = file.type.startsWith("image") ? "IMAGE" : "VIDEO";

    const tagRecords = await Promise.all(
      tags.map(async (tagName) => {
        return await prisma.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
        });
      })
    );

    const meme = await prisma.meme.create({
      data: {
        userId,
        fileUrl,
        fileType,
        caption,
        tags: {
          create: tagRecords.map((tag) => ({ tagId: tag.id })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json({ success: true, meme }, { status: 200 });
  } catch (error) {
    console.error("Error uploading meme:", error);
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}
