import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import { Toaster } from "@/components/ui/sonner";

// Load Inter font with multiple weights
const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

// Domain name for the site (use env variable if available, otherwise use Vercel preview URL)
const SITE_URL =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "https://znode-rewards.vercel.app";

export const metadata: Metadata = {
  title: "Znode Rewards - Claim Your Airdrop",
  description: "Claim your Znode airdrop rewards across Ethereum, Arbitrum, Optimism, and Base chains. Connect your wallet and get 500-5000 $RIZ tokens for free.",
  keywords: ["znode", "airdrop", "claim", "rewards", "ethereum", "arbitrum", "optimism", "base", "web3", "crypto"],
  authors: [{ name: "Znode Team" }],
  creator: "Znode",
  publisher: "Znode",
  openGraph: {
    title: "Znode Rewards - Claim Your Airdrop",
    description: "Claim your Znode airdrop rewards across multiple chains and get 500-5000 $RIZ tokens.",
    url: SITE_URL,
    siteName: "Znode Rewards",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Znode Airdrop",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Znode Rewards - Claim Your Airdrop",
    description: "Claim your Znode airdrop rewards across multiple chains and get 500-5000 $RIZ tokens.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0e0e15] text-white min-h-screen flex flex-col`}>
        <ClientBody>
          {children}
          <Toaster />
        </ClientBody>
      </body>
    </html>
  );
}
