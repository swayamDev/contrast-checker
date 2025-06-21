import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Color Contrast Checker – Free WCAG 2.1 AA/AAA Compliance Tool",
  description:
    "Test your color contrast ratios online to meet WCAG 2.1 AA and AAA standards. Instantly check text readability, accessibility, and color compliance.",
  keywords:
    "color contrast checker, accessibility checker, WCAG 2.1, contrast ratio tool, color accessibility, a11y, color readability, online contrast tool",
  authors: [
    { name: "Swayam Swarup Panda", url: "https://swayam-nine.vercel.app/" },
  ],
  creator: "Swayam Swarup Panda",
  publisher: "Contrast Studio",
  category: "accessibility",
  metadataBase: new URL("https://contrast.swayam.dev"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Color Contrast Checker – Free WCAG 2.1 AA/AAA Tool",
    description:
      "Check if your text and background colors pass WCAG standards. Ensure accessible web design with our free contrast checker.",
    url: "https://contrast.swayam.dev",
    siteName: "Contrast Studio",
    type: "website",
    images: [
      {
        url: "https://contrast.swayam.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Color Contrast Checker by Contrast Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Contrast Checker – Free WCAG 2.1 AA/AAA Tool",
    description:
      "Test your color combinations for accessibility with our free online contrast checker. Built for designers and developers.",
    creator: "@Swayam_Dev",
    images: ["https://contrast.swayam.dev/og-image.png"],
  },
  generator: "Next.js 15, Tailwind CSS, ChatGPT SEO Optimized",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ✅ Correct usage for theme color (must be outside metadata)
export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#0f172a" }, // slate-900
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://contrast.swayam.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Color Contrast Checker",
              url: "https://contrast.swayam.dev",
              applicationCategory: "Accessibility Tool",
              description:
                "Test your color contrast ratios online to meet WCAG 2.1 standards. Free, fast, and accessible.",
              author: {
                "@type": "Person",
                name: "Swayam Swarup Panda",
                url: "https://swayam-nine.vercel.app/",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-white text-black dark:bg-slate-900 dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
