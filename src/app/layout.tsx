import type { Metadata } from "next";
import { Suez_One, Assistant, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: "שלומי אינסטלציה | אינסטלטור מוסמך זמין 24/7",
  description: "אינסטלטור מוסמך ומנוסה. זמין 24/7 לכל תקלה. סתימות, נזילות, דודי שמש ועוד. מגיע מהר, עובד בנקייה, מחיר שקוף.",
  keywords: "אינסטלטור, אינסטלציה, סתימות, נזילות, דוד שמש, תל אביב",
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
      </body>
    </html>
  );
}
