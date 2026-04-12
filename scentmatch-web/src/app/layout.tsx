import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScroll, CustomCursor, Noise, MouseSpotlight } from "@/components/PremiumUI";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "ScentMatch | Digital Sommelier",
  description: "Eliminate the blind-buy gamble.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased bg-background text-foreground min-h-screen selection:bg-foreground selection:text-background relative`}
      >
        <MouseSpotlight />
        <SmoothScroll>
          <CustomCursor />
          <Noise />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
