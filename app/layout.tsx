import type { Metadata } from "next";
import { Gowun_Batang, Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
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

const uhbeeKeongKeong = localFont({
  src: [
    {
      path: "../font/UhBeeKeongKeong/UhBee KeongKeong.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/UhBeeKeongKeong/UhBee KeongKeong Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-uhbee-keongkeong",
  display: "swap",
});

export const metadata: Metadata = {
  title: "정상민 ♥︎ 장혜림",
  description: "Mobile-first wedding invitation web app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${serif.variable} ${sans.variable} ${uhbeeNamsoyoung.variable} ${uhbeeKeongKeong.variable}`}
      >
        <Script id="scroll-to-top-on-refresh" strategy="afterInteractive">
          {`
            try {
              if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
              const scrollTop = () => window.scrollTo(0, 0);
              window.addEventListener('load', scrollTop, { once: true });
              window.addEventListener('pageshow', scrollTop);

              window.addEventListener('keydown', (event) => {
                if (event.key === 'F12') {
                  event.preventDefault();
                  alert('개발자 도구 사용할 수 없습니다');
                }
              });
            } catch (e) {}
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
