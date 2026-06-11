import type { Metadata } from "next";
import { Suez_One, Assistant, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const suezOne = Suez_One({
  variable: "--font-suez",
  weight: "400",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  weight: ["300", "400", "600", "700"],
  subsets: ["hebrew", "latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://plumer.vercel.app";
const SITE_NAME = "שלומי אינסטלציה";
const SITE_DESC = "אינסטלטור מוסמך ומנוסה. זמין 24/7 לכל תקלה. סתימות, נזילות, דודי שמש ועוד. מגיע מהר, עובד בנקייה, מחיר שקוף.";

export const metadata: Metadata = {
  title: `${SITE_NAME} | אינסטלטור מוסמך זמין 24/7`,
  description: SITE_DESC,
  keywords: "אינסטלטור, אינסטלציה, סתימות, נזילות, דוד שמש, תל אביב",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | אינסטלטור מוסמך זמין 24/7`,
    description: SITE_DESC,
    locale: "he_IL",
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 728,
        height: 724,
        alt: SITE_NAME,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${suezOne.variable} ${assistant.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
