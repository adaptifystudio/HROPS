import dbConnect from "@/lib/mongodb";
import BlogModel from "@/app/models/Blog";
import { notFound } from "next/navigation";
import { BlogContentWithToc } from "./BlogContentWithToc";

export async function generateStaticParams() {
  return []; 
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPage({ params }: PageProps) {
  await dbConnect();

  const blog = await BlogModel.findById(params.slug).lean();
  if (!blog) return notFound();

  return <BlogContentWithToc blog={JSON.parse(JSON.stringify(blog))} />;
}
