import dbConnect from "@/lib/mongodb";
import BlogModel from "@/app/models/Blog";
import { notFound } from "next/navigation";
import { BlogContentWithToc } from "./BlogContentWithToc";

export default async function BlogPage(props: any) {
  const { slug } = props.params;

  await dbConnect();
  const blog = await BlogModel.findById(slug).lean();

  if (!blog) return notFound();

  return <BlogContentWithToc blog={JSON.parse(JSON.stringify(blog))} />;
}
