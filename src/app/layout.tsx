import type { Metadata } from "next";
import { Hind_Siliguri, Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const englishFont = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
  preload: true
});

const banglaFont = Hind_Siliguri({
  variable: "--font-bangla-siliguri",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true
});

export const metadata: Metadata = {
  title: {
    default: "BanglaPoster | AI Political Poster Maker & Designer",
    template: "%s | BanglaPoster"
  },
  description: "Create professional ready-to-print Bangladeshi political posters, victory day banners, and campaign templates instantly with custom leader photos and Bangla typography.",
  keywords: [
    "political poster maker",
    "bangla poster design",
    "ai poster generator",
    "election banner maker",
    "bangladesh political graphics",
    "বিজয় দিবস পোস্টার",
    "রাজনৈতিক পোস্টার ডিজাইন"
  ],
  authors: [{ name: "Hridoy Chowdhury" }],
  creator: "Hridoy Chowdhury",
  publisher: "BanglaPoster",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://banglaposter.infozia.site",
    title: "BanglaPoster - AI Political Poster Maker",
    description: "Generate stunning political and commemorative posters in seconds with automated layouts and custom Bangla text.",
    siteName: "BanglaPoster",
  },
  twitter: {
    card: "summary_large_image",
    title: "BanglaPoster - AI Political Poster Maker",
    description: "Instant political poster creation platform tailored for Bangladesh.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${englishFont.variable} ${banglaFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">

        <Navbar />

        <main className="grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}