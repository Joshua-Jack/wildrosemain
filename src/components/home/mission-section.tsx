import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function MissionSection() {
  const file = await fs.readFile(
    path.join(process.cwd(), "content", "story.mdx"),
    "utf8"
  );
  const { content } = matter(file);
  return (
    <section id="story" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <MDXRemote source={content} />
      </div>
    </section>
  );
}
