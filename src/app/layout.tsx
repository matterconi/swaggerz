// app/layout.tsx
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swaggerz Collective - Streetwear Autentico",
  description: "Abbigliamento che unisce cultura della strada e arte contemporanea. Espressione autentica per chi vive la città.",
  keywords: ["streetwear", "moda urbana", "limited edition", "street culture", "Milano"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        {/* Preload Cloudflare Turnstile script */}
        <link
          rel="preload"
          href="https://challenges.cloudflare.com/turnstile/v0/api.js"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${jost.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}