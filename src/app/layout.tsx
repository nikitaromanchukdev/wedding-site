import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import { meta } from "@/resources";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const comorant = Cormorant_Garamond({
  variable: "--font-comorant",
  subsets: ["cyrillic-ext", "latin-ext"],
});

const ss3 = Source_Sans_3({
  variable: "--font-ss3",
  subsets: ["cyrillic", "latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0c0b0a",
};

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
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
      className={`${inter.variable} ${comorant.variable} ${ss3.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-snow">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
