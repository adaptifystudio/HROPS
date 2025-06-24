import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";

export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  content?: string;
  author: string;
  authorImage?: string;
  thumbnail?: string;
  createdAt: Date;
  toc?: string[]; // ✅ simplified TOC: just titles
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: false },
    author: { type: String, required: true },
    authorImage: { type: String },
    thumbnail: { type: String },
    createdAt: { type: Date, default: Date.now },
    toc: [{ type: String }], // ✅ no href, just plain strings
  },
  { timestamps: true }
);

// ✅ Auto-generate slug from title
BlogSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
