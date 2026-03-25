import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts, getPostBySlug, type ContentBlock } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://nexiolabs.co/blog/${post.slug}`,
      type: "article",
    },
  };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="font-display text-h2 text-white mt-3xl mb-l"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="font-display text-h3 text-white mt-2xl mb-m"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p
          key={i}
          className="font-body text-body text-slate-light mb-l leading-relaxed"
        >
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-l space-y-s pl-m">
          {block.items.map((item, j) => (
            <li
              key={j}
              className="font-body text-body text-slate-light flex gap-m"
            >
              <span className="text-blue mt-1 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "cta":
      return (
        <div key={i} className="mt-3xl pt-xl border-t border-white/10">
          <a
            href={block.href}
            className="inline-flex items-center gap-s font-body text-sm font-semibold text-white bg-blue hover:bg-blue-dark px-xl py-m rounded-button transition-colors duration-hover"
          >
            {block.text} →
          </a>
        </div>
      );
  }
}

const BASE_URL = "https://nexiolabs.co";

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE_URL}/blog/${post.slug}`,
    inLanguage: "en",
    keywords: [post.category, "Nexio Labs", "Lebanon", "MENA", "software development"],
    author: {
      "@type": "Organization",
      name: "Nexio Labs",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Nexio Labs",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo/nexio-monogram-blue-512.png`,
      },
    },
    isPartOf: {
      "@type": "Blog",
      name: "Nexio Labs Insights",
      url: `${BASE_URL}/blog`,
    },
  };

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-midnight pt-32 pb-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        {/* Back */}
        <Link
          href="/blog"
          className="font-body text-sm text-slate-light hover:text-white transition-colors duration-hover mb-2xl inline-block"
        >
          ← All articles
        </Link>

        {/* Article header */}
        <header className="mb-3xl">
          <p className="font-mono text-label uppercase text-blue tracking-[0.14em] mb-m">
            {post.category}
          </p>
          <h1 className="font-display text-h1 text-white mb-l leading-tight">
            {post.title}
          </h1>
          <p className="font-body text-body-lg text-slate-light mb-xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-l font-mono text-caption text-slate border-t border-white/10 pt-l">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
            <span>·</span>
            <span>Nexio Labs</span>
          </div>
        </header>

        {/* Article body */}
        <article>
          {post.content.map((block, i) => renderBlock(block, i))}
        </article>

        {/* Footer */}
        <div className="mt-4xl pt-xl border-t border-white/10 flex flex-col gap-m">
          <p className="font-body text-caption text-slate-light">
            Written by the team at{" "}
            <a
              href="https://nexiolabs.co"
              className="text-blue hover:underline"
            >
              Nexio Labs
            </a>{" "}
            — a software development agency based in Lebanon.
          </p>
          <Link
            href="/blog"
            className="font-body text-sm text-slate-light hover:text-white transition-colors duration-hover"
          >
            ← More articles
          </Link>
        </div>
      </div>
    </main>
  );
}
