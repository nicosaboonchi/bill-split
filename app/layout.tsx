import type { Metadata } from "next";
import { Playfair_Display, Courier_Prime } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const ibmMono = Courier_Prime({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "The Tab — Bill Splitter",
  description: "Split bills with friends easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${ibmMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
