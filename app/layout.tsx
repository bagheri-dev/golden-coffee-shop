import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const danaRegular = localFont({
  src: "./fonts/Dana/woff2/DanaFaNum-Regular.woff2",
  variable: "--font-Dana-FaNum",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Golden Coffee",
  description: "Golden Coffee E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${danaRegular.variable} antialiased bg-gray-100 dark:bg-zinc-800`}
      >
        {children}
      </body>
    </html>
  );
}