import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb";
import Blog from "@/app/models/Blog"

export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find().sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}
