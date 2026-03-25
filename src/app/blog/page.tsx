import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights — Software, SaaS & Digital Growth in Lebanon",
  description:
    "Practical articles on software development, SaaS products, AI, and digital transformation for Lebanese and MENA businesses. By Nexio Labs.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Nexio Labs Insights — Software & SaaS in Lebanon",
    description:
      "Articles on software development, SaaS, AI, and digital transformation for Lebanese and MENA businesses.",
    url: "https://nexiolabs.co/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-midnight pt-32 pb-4xl">
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-4xl">
          <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
            INSIGHTS
          </p>
          <h1 className="font-display text-h1 text-white mb-l">
            From Lebanon&apos;s Digital Agency
          </h1>
          <p className="font-body text-body-lg text-slate-light max-w-2xl">
            Practical writing on software development, SaaS, AI, and digital
            transformation for businesses in Lebanon and the MENA region.
          </p>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-l">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-midnight-deep border border-white/10 rounded-panel p-xl hover:border-blue/40 transition-all duration-hover"
            >
              <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
                {post.category}
              </p>
              <h2 className="font-display text-h3 text-white mb-m group-hover:text-blue transition-colors duration-hover leading-snug">
                {post.title}
              </h2>
              <p className="font-body text-caption text-slate-light mb-l line-clamp-3">
                {post.excerpt}
              </p>
              <p className="font-mono text-caption text-slate">
                {post.readTime} min read
              </p>
            </Link>
          ))}
        </div>

        {/* Back to site */}
        <div className="mt-4xl pt-xl border-t border-white/10">
          <Link
            href="/"
            className="font-body text-sm text-slate-light hover:text-white transition-colors duration-hover"
          >
            ← Back to Nexio Labs
          </Link>
        </div>
      </div>
    </main>
  );
}
