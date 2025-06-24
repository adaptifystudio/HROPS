import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/app/models/Blog";

// ✅ POST: Create blog with base64 thumbnail (safe for Vercel + MongoDB)
export async function POST(req: Request) {
  await dbConnect();

  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const image = formData.get("image") as File;

    // ✅ Validation
    if (!title?.trim() || !description?.trim() || !author?.trim()) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Convert uploaded image to base64 and store in 'thumbnail'
    let thumbnail = "";
    if (image && image.size > 0) {
      const buffer = Buffer.from(await image.arrayBuffer());
      thumbnail = `data:${image.type};base64,${buffer.toString("base64")}`;
    }

    // ✅ Save blog to MongoDB
    const blog = await Blog.create({
      title,
      description,
      content,
      author,
      thumbnail, // stored as base64 string
      createdAt: new Date(),
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (err: any) {
    console.error("❌ POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create blog" },
      { status: 500 }
    );
  }
}

// ✅ GET: Fetch all blogs
export async function GET() {
  await dbConnect();

  try {
    const blogs = await Blog.find().lean();
    return NextResponse.json(blogs);
  } catch (err) {
    console.error("❌ GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
