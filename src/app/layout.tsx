import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BUSINESS.name} | ${BUSINESS.tagline}`,
  description: `${BUSINESS.name} — phone & laptop repair, swap, and gadget sales in Ikorodu, Lagos. Screen repair, board repair, iPhone unlock, water damage, battery replacement and more.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-text antialiased">
        {children}
      </body>
    </html>
  );
}
