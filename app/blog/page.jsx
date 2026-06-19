import Header from "@/components/header";
import BlogArchiveClient from "./BlogArchiveClient";
import allBlogs from "@/data/blogs";

export const metadata = {
  title: "Official Blog | TechieHelp Institute of AI",
  description: "Read the latest updates, career roadmaps, preparation guides, and insights on Artificial Intelligence, Web Development, Internships, and Placements from TechieHelp Jodhpur.",
  keywords: [
    "TechieHelp Blog",
    "AI roadmap Jodhpur",
    "Internship Jodhpur blog",
    "TechieHelp placement guides",
    "Amit Kumar TechieHelp blog"
  ],
  alternates: {
    canonical: "https://techiehelpinstituteofai.in/blog"
  }
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <BlogArchiveClient blogs={allBlogs} />
    </>
  );
}
