import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Providers/providers";
import { Toaster } from 'react-hot-toast';

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
        className={`font-Dana antialiased bg-gray-100 dark:bg-zinc-800`}
      >
        <Provider>
          <Toaster position="top-left" reverseOrder={false} />
          {children}
        </Provider>
      </body>
    </html>
  );
}