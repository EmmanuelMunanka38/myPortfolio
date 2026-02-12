import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/Components/Header/navbar";
import AnalyticsTracker from "@/Components/AnalyticsTracker";
import { AuthProvider } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Emmanuel Munanka Portfolio",
  description: "Full-Stack Architect & CEO at Cosmic - Building innovative web solutions with modern technologies",
  keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Web Development", "Emmanuel Munanka"],
  authors: [{ name: "Emmanuel Munanka" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emmanuelmunanka.dev",
    title: "Emmanuel Munanka Portfolio",
    description: "Full-Stack Architect & CEO at Cosmic - Building innovative web solutions",
    siteName: "Emmanuel Munanka Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Munanka Portfolio",
    description: "Full-Stack Architect & CEO at Cosmic - Building innovative web solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AnalyticsTracker />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
