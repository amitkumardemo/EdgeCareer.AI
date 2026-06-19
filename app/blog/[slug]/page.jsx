import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/header";
import allBlogs from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, Sparkles, User, ChevronRight, Award } from "lucide-react";

// Statically generate params for all 105 blogs
export async function generateStaticParams() {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((b) => b.slug === slug);

  if (!blog) return {};

  return {
    title: `${blog.title} | TechieHelp Institute of AI`,
    description: blog.description,
    alternates: {
      canonical: `https://techiehelpinstituteofai.in/blog/${blog.slug}`
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://techiehelpinstituteofai.in/blog/${blog.slug}`,
      type: "article",
      publishedTime: blog.publishedAt,
      authors: ["Amit Kumar"],
      images: [
        {
          url: blog.image,
          alt: blog.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = allBlogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  // Get related blogs in the same category (excluding current)
  const relatedBlogs = allBlogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 4);

  // Markdown renderer helper
  const renderMarkdown = (content) => {
    return content.split("\n").map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-3" />;

      // Headings
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl font-black text-blue-950 dark:text-white mt-8 mb-4 leading-tight">
            {trimmed.substring(2)}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-blue-950 dark:text-white mt-6 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">
            {trimmed.substring(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-blue-950 dark:text-white mt-5 mb-2">
            {trimmed.substring(4)}
          </h3>
        );
      }

      // List Items
      if (trimmed.startsWith("- ")) {
        return (
          <li key={index} className="ml-6 list-disc text-slate-650 dark:text-slate-350 text-sm md:text-base leading-relaxed my-1.5">
            {parseInlineMarkdown(trimmed.substring(2))}
          </li>
        );
      }

      // Default Paragraph
      return (
        <p key={index} className="text-sm md:text-base text-slate-650 dark:text-slate-350 leading-relaxed my-3">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  const parseInlineMarkdown = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-extrabold text-blue-950 dark:text-white">
            {part.substring(2, part.length - 2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Structured schemas
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": `https://techiehelpinstituteofai.in${blog.image}`,
    "datePublished": blog.publishedAt,
    "author": {
      "@type": "Person",
      "name": "Amit Kumar",
      "jobTitle": "Founder & CEO, TechieHelp Institute of AI",
      "url": "https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TechieHelp Institute of AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://techiehelpinstituteofai.in/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://techiehelpinstituteofai.in/blog/${blog.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://techiehelpinstituteofai.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://techiehelpinstituteofai.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://techiehelpinstituteofai.in/blog/${blog.slug}`
      }
    ]
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 md:pt-36 pb-20 transition-colors duration-300">
        
        {/* JSON-LD Schema Scripts */}
        <Script
          id={`blog-schema-${blog.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <Script
          id={`breadcrumb-schema-${blog.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Breadcrumb component */}
          <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#0F4CBA] dark:hover:text-blue-400">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-[#0F4CBA] dark:hover:text-blue-400">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-700 dark:text-slate-200 truncate max-w-xs">{blog.title}</span>
          </nav>

          {/* Go Back Link */}
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-[#0F4CBA] dark:hover:text-blue-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Content Area */}
            <main className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-250/20 dark:border-slate-850 shadow-sm">
              {/* Category & Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900 text-xs font-extrabold tracking-wider text-cyan-800 dark:text-cyan-400 uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{blog.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white leading-tight mb-6">
                {blog.title}
              </h1>

              {/* Stats & Author metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800 mb-8">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100">
                    <Image
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-850 dark:text-slate-200">{blog.author.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-450">{blog.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.publishedAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Article Featured Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-8 shadow-inner border border-slate-200/50 dark:border-slate-800">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Content Render */}
              <article className="prose dark:prose-invert max-w-none text-slate-750 dark:text-slate-300">
                {renderMarkdown(blog.content)}
              </article>

              {/* Author Callout Box */}
              <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-slate-200 dark:border-slate-750 bg-slate-100 shrink-0">
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="text-sm font-extrabold text-blue-950 dark:text-white">Written by {blog.author.name}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Amit Kumar is the Founder & CEO of TechieHelp Institute of AI. He is dedicated to mentoring tech students, designing ATS resume builders, launching placement tools, and organizing summer training and internships across Rajasthan.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/amit-kumar-founder-of-techiehelp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#0F4CBA] dark:text-blue-400 hover:underline"
                  >
                    <span>Connect on LinkedIn</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </main>

            {/* Sidebar Columns */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Placement Banner CTA */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0F4CBA] to-[#0a3582] text-white border border-[#0d44a7] shadow-xl text-left space-y-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold leading-snug">Boost Your Tech Career in Jodhpur</h3>
                  <p className="text-xs text-blue-100 leading-relaxed font-normal">
                    Secure industry-approved certifications and work on live workspace projects under expert mentors. Cohorts filling fast.
                  </p>
                </div>
                <Link href="/sign-up" className="block text-center w-full py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0F4CBA] font-extrabold text-xs tracking-wide uppercase transition-all shadow-md active:scale-98">
                  Apply for Internship
                </Link>
              </div>

              {/* Related Articles List */}
              {relatedBlogs.length > 0 && (
                <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 shadow-sm text-left">
                  <h3 className="text-base font-extrabold text-blue-950 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((rBlog) => (
                      <Link key={rBlog.slug} href={`/blog/${rBlog.slug}`} className="group block space-y-1">
                        <span className="text-[9px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest leading-none">
                          {rBlog.category}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0F4CBA] dark:group-hover:text-blue-400 transition-colors leading-snug">
                          {rBlog.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                          {rBlog.publishedAt}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </aside>
          </div>

        </div>
      </div>
    </>
  );
}
