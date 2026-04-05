import type { Metadata } from "next";
import { Gowun_Batang, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const serif = Gowun_Batang({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  weight: ["400", "700"],
});

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
});

const uhbeeNamsoyoung = localFont({
  src: [
    {
      path: "../font/UhBeenamsoyoung/UhBee namsoyoung.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/UhBeenamsoyoung/UhBee namsoyoung Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-uhbee-namsoyoung",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Garden Wedding Invitation",
  description: "Mobile-first wedding invitation web app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${serif.variable} ${sans.variable} ${uhbeeNamsoyoung.variable}`}>{children}</body>
    </html>
  );
}
