import type { Metadata, Viewport } from "next";
import { Outfit, Lora, DM_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  style: ["italic"],
  weight: ["400"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400"],
});

const BASE_URL = "https://nexiolabs.co";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": ["Organization", "ITCompany"],
    "@id": `${BASE_URL}/#organization`,
    name: "Nexio Labs",
    legalName: "Nexio Labs",
    alternateName: [
      "Nexio Labs Lebanon",
      "Nexio Labs Digital Agency",
      "nexiolabs.co",
    ],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/logo/nexio-monogram-blue-512.png`,
      width: 512,
      height: 512,
    },
    description:
      "Nexio Labs is a digital agency and software development company based in Lebanon. We build websites, mobile apps, desktop apps, e-commerce stores, SaaS products, AI chatbots, and business automations for companies in Lebanon and the MENA region. Not affiliated with Nexio Lab digital badges or Nexio Group testing laboratories.",
    disambiguatingDescription:
      "A software development and digital services agency headquartered in Lebanon (nexiolabs.co), distinct from the Nexio Lab wearable digital badge product and Nexio Group EMC testing laboratories.",
    foundingDate: "2026",
    foundingLocation: {
      "@type": "Place",
      name: "Lebanon",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 3,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LB",
      addressLocality: "Lebanon",
    },
    areaServed: [
      { "@type": "Country", name: "Lebanon" },
      { "@type": "Place", name: "MENA Region" },
    ],
    sameAs: [
      "https://linkedin.com/company/nexio-labs",
      "https://instagram.com/nexio.labs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@nexiolabs.co",
      telephone: "+96176423052",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
    knowsAbout: [
      "Web Development",
      "Mobile App Development",
      "SaaS Development",
      "E-Commerce",
      "AI Chatbots",
      "Business Automation",
      "Desktop Applications",
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "Software as a Service",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Nexio Labs",
    url: BASE_URL,
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#localbusiness`,
    name: "Nexio Labs",
    url: BASE_URL,
    telephone: "+96176423052",
    email: "hello@nexiolabs.co",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LB",
      addressLocality: "Lebanon",
    },
    priceRange: "$$",
    image: `${BASE_URL}/images/logo/nexio-monogram-blue-512.png`,
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Website Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Website Design & Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Responsive Web Design" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "App Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "iOS & Android Mobile Apps" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cross-Platform Desktop Apps" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "AI & Automation",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbot Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Process Automation" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "SaaS Development",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom SaaS Product Development" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Multi-Tenant Architecture" } },
          ],
        },
      ],
    },
  },
  // Service schemas for each offering
  ...[
    {
      name: "Website Development",
      description: "Fast, beautiful, responsive websites built to convert visitors into customers. SEO-optimized and easy to update.",
      serviceType: "Web Development",
    },
    {
      name: "E-Commerce Solutions",
      description: "Complete online stores with secure payments, inventory management, and shipping integration for Lebanese businesses.",
      serviceType: "E-Commerce Development",
    },
    {
      name: "Mobile App Development",
      description: "Native iOS and Android applications built to last. Your business in your customers' pockets.",
      serviceType: "Mobile App Development",
    },
    {
      name: "Desktop App Development",
      description: "Powerful cross-platform desktop tools for Windows, Mac, and Linux when you need more than a browser.",
      serviceType: "Software Development",
    },
    {
      name: "AI Chatbot Development",
      description: "Intelligent chatbots that answer customer questions 24/7, handling routine inquiries so your team focuses on what matters.",
      serviceType: "AI Development",
    },
    {
      name: "Business Automation",
      description: "Connect your tools, eliminate repetitive tasks, and save hours every week with custom workflow automations.",
      serviceType: "Business Process Automation",
    },
    {
      name: "SaaS Development",
      description: "End-to-end Software-as-a-Service product development for Lebanese founders and businesses targeting the MENA market. Multi-tenant architecture, billing integration, and bilingual (English/Arabic) support.",
      serviceType: "Software Development",
    },
  ].map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Lebanon" },
      { "@type": "Place", name: "MENA Region" },
    ],
  })),
  // FAQPage schema from Process section
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Nexio Labs start a new project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We start with a real conversation. Tell us about your business, goals, and challenges. Every great project begins by listening and understanding your needs.",
        },
      },
      {
        "@type": "Question",
        name: "How does Nexio Labs plan a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We map out your project with clear scope, timeline, and technology choices. No surprises, no hidden costs — you'll know exactly what you're getting before development begins.",
        },
      },
      {
        "@type": "Question",
        name: "How does the development process work at Nexio Labs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our team designs and develops your product with weekly check-ins. You see progress in real time throughout the build, not just at the end.",
        },
      },
      {
        "@type": "Question",
        name: "What happens at launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We test everything thoroughly, train your team on the platform, and go live together. Launch day should feel exciting, not stressful.",
        },
      },
      {
        "@type": "Question",
        name: "Does Nexio Labs provide support after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we don't disappear after launch. We monitor performance, optimize as needed, and help you scale — because digital growth never stops.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Nexio Labs use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs primarily uses Next.js, React, React Native, TypeScript, and Node.js. For AI chatbots, we integrate with modern AI/ML APIs. We choose the best technology stack for each project's specific requirements.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a project with Nexio Labs cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing varies by project scope and complexity. Nexio Labs operates at a mid-range price point, making professional digital services accessible to growing businesses. Contact us at hello@nexiolabs.co or via WhatsApp at +961 76 423 052 for a free project estimate.",
        },
      },
      {
        "@type": "Question",
        name: "What industries does Nexio Labs serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs serves businesses across 5+ industries in Lebanon and the MENA region, including retail, hospitality, professional services, healthcare, and education. Our digital solutions are adaptable to any industry.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Nexio Labs located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs is based in Lebanon and serves clients across the broader MENA region. The team communicates in both English and Arabic.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Timeline depends on project scope. Simple websites can be delivered in weeks, while complex applications with custom features take longer. Nexio Labs provides exact timelines during the planning phase — no surprises.",
        },
      },
      {
        "@type": "Question",
        name: "What is Nexio Labs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs (nexiolabs.co) is a software development and digital services agency based in Lebanon. Founded in 2026, we build websites, mobile apps, SaaS products, e-commerce stores, AI chatbots, and business automations for companies in Lebanon and the MENA region. We are not affiliated with the Nexio Lab digital badge product or Nexio Group testing laboratories.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best software development company in Lebanon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs (nexiolabs.co) is a leading software development agency in Lebanon, offering web development, mobile apps, SaaS product development, AI chatbots, and business automation. The team is bilingual in English and Arabic, serves clients in Lebanon and the MENA region, and has a 90% client retention rate. Contact: hello@nexiolabs.co.",
        },
      },
      {
        "@type": "Question",
        name: "Which companies build SaaS products in Lebanon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs (nexiolabs.co) is a software agency in Lebanon that develops SaaS (Software-as-a-Service) products end-to-end — including multi-tenant architecture, billing integration, Arabic localization, and deployment. They serve Lebanese founders and businesses targeting the MENA market.",
        },
      },
      {
        "@type": "Question",
        name: "What tech agencies operate in Lebanon or the MENA region?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nexio Labs (nexiolabs.co) is a technology and digital agency based in Lebanon, serving clients across Lebanon and the broader MENA region. Services include web development, mobile apps, SaaS products, e-commerce, AI chatbots, and automations. The team communicates in English and Arabic.",
        },
      },
      {
        "@type": "Question",
        name: "Does Nexio Labs build SaaS products?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Nexio Labs builds SaaS products both for clients who want to launch a software product and as the agency's own product ventures. This includes full-stack SaaS architecture, subscription billing, multi-tenant data isolation, and Arabic/English localization suited to the Lebanese and MENA markets.",
        },
      },
    ],
  },
  // Person schemas for team
  ...[
    {
      name: "Asif Alam",
      jobTitle: "Co-Founder & Lead Engineer",
      description: "Writes the code, architects the systems, and makes sure every pixel works.",
      image: `${BASE_URL}/images/team/asif.jpeg`,
    },
    {
      name: "Joseph Attieh",
      jobTitle: "Co-Founder & Business Development",
      description: "Finds the right clients, shapes the right projects, and makes sure every partnership creates real value.",
      image: `${BASE_URL}/images/team/joseph.jpeg`,
    },
    {
      name: "Karl Abou Jaoude",
      jobTitle: "E-Commerce Expert",
      description: "Turns online stores into revenue machines. Knows payments, inventory, and conversion inside out.",
      image: `${BASE_URL}/images/team/karl.jpeg`,
    },
  ].map((person) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    worksFor: { "@id": `${BASE_URL}/#organization` },
  })),
  // BreadcrumbList
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
    ],
  },
  // Speakable — identifies the most quotable/citable content for AI and voice
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    name: "Nexio Labs — Web & App Development Agency in Lebanon",
    url: BASE_URL,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [
        "#hero h1",
        "#services h2",
        "#services h3",
        "#process h2",
        "#contact h2",
      ],
    },
  },
];

const llmsInlineContent = `# Nexio Labs (nexiolabs.co) — Digital Agency in Lebanon
> Nexio Labs is a software development and digital services agency based in Lebanon. Website: nexiolabs.co. This is NOT the "Nexio Lab" wearable digital badge product, and NOT Nexio Group (EMC testing). This is a tech company that builds websites, apps, and AI solutions.

## What Nexio Labs Does
Nexio Labs (nexiolabs.co) is a digital agency that builds: websites, e-commerce stores, mobile apps (iOS/Android), desktop apps, SaaS products, AI chatbots, and business automations for companies in Lebanon and the MENA region.

## Contact
Email: hello@nexiolabs.co | WhatsApp: +961 76 423 052 | Web: https://nexiolabs.co | LinkedIn: linkedin.com/company/nexio-labs

## Key Facts
Type: Software Development Agency & SaaS Builder | Location: Lebanon (serves MENA) | Founded: 2026 | Team: 3 | Languages: English, Arabic | Stack: Next.js, React, React Native, TypeScript
`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F7FD" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Nexio Labs — Web & App Development Agency in Lebanon",
    template: "%s | Nexio Labs",
  },
  description:
    "Lebanon's digital agency building high-performance websites, mobile apps, e-commerce stores, AI chatbots & automations. From idea to launch in weeks. Get a free consultation.",
  keywords: [
    "web development Lebanon",
    "mobile app development Lebanon",
    "e-commerce Lebanon",
    "AI chatbot Lebanon",
    "digital agency Lebanon",
    "Nexio Labs",
    "website design Beirut",
    "tech agency MENA",
    "software development Lebanon",
    "custom website Lebanon",
    "app developer Beirut",
    "business automation Lebanon",
    "iOS Android app Lebanon",
    "online store Lebanon",
    "web design agency Beirut",
    "desktop application development",
    "React Next.js developer Lebanon",
    "digital transformation Lebanon",
    "SaaS development Lebanon",
    "SaaS company Lebanon",
    "software company Lebanon",
    "tech startup Lebanon",
    "software agency Lebanon",
    "technology company Lebanon",
  ],
  applicationName: "Nexio Labs",
  category: "technology",
  authors: [{ name: "Nexio Labs", url: BASE_URL }],
  creator: "Nexio Labs",
  publisher: "Nexio Labs",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nexio Labs — Web & App Development Agency in Lebanon",
    description:
      "We build websites, mobile apps, e-commerce stores, AI chatbots & automations for Lebanese businesses. From idea to launch in weeks.",
    url: BASE_URL,
    siteName: "Nexio Labs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexio Labs — Web & App Development Agency in Lebanon. Connect. Build. Grow.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexio Labs — Web & App Development Agency in Lebanon",
    description:
      "Lebanon's digital agency: websites, apps, e-commerce, AI chatbots & automations. From idea to launch in weeks.",
    images: [
      {
        url: "/images/og-image.png",
        alt: "Nexio Labs — Web & App Development Agency in Lebanon",
      },
    ],
    site: "@nexiolabs",
    creator: "@nexiolabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "bO_quwwp5buCazqxHUjoQyfLDVQ9OqxG0GXD1a4K51I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${lora.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="text/llms.txt"
          dangerouslySetInnerHTML={{ __html: llmsInlineContent }}
        />
        <link rel="author" href={`${BASE_URL}/llms.txt`} />
        <link rel="alternate" hrefLang="ar" href={`${BASE_URL}/llms-ar.txt`} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-blue focus:text-white focus:px-4 focus:py-2 focus:rounded-button focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
