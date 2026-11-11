import type { Metadata } from "next";
import home from "@/content/home.json";
import "./globals.css";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
