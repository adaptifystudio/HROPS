import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

// ✅ GET blog by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();

  try {
    const blog = await Blog.findById(context.params.id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET blog error:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// ✅ DELETE blog by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();

  try {
    const deleted = await Blog.findByIdAndDelete(context.params.id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE blog error:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

// ✅ PUT blog by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnect();

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const file = formData.get("image") as File | null;

    const tocRaw = formData.get("toc") as string;
    let toc: string[] = [];
    try {
      toc = JSON.parse(tocRaw);
    } catch (err) {
      console.warn("Invalid TOC JSON:", tocRaw);
    }

    let imageBase64 = undefined;

    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());
      imageBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
    }

    const updated = await Blog.findByIdAndUpdate(
      context.params.id,
      {
        title,
        author,
        description,
        content,
        toc,
        ...(imageBase64 && { imageBase64 }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT blog error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}
