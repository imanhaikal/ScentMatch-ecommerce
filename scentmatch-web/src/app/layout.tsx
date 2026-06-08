import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { SmoothScroll, Noise, MouseSpotlight } from "@/components/PremiumUI";
import { CartDrawer } from "@/components/CartDrawer";
import { PromoBanner } from "@/components/PromoBanner";
import { SupportChatbot } from "@/components/SupportChatbot";
import { AnalyticsPageViewTracker } from "@/components/AnalyticsPageViewTracker";

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

const gaMeasurementId = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_GA_ID)?.trim();
const hasGoogleAnalyticsId =
  Boolean(gaMeasurementId) && gaMeasurementId !== "G-XXXXXXXXXX";
const activeGaMeasurementId = hasGoogleAnalyticsId ? gaMeasurementId : undefined;

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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MouseSpotlight />
        <SmoothScroll>
          <Noise />
          <PromoBanner />
          <CartDrawer />
          <SupportChatbot />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </SmoothScroll>

        {activeGaMeasurementId ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${activeGaMeasurementId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${activeGaMeasurementId}', {
                    send_page_view: false,
                  });
                `,
              }}
            />
          </>
        ) : null}
        {activeGaMeasurementId ? (
          <Suspense fallback={null}>
            <AnalyticsPageViewTracker measurementId={activeGaMeasurementId} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
