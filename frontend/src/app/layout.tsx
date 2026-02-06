import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Me-API Playground",
  description: "Explore my profile and projects via this interactive playground.",
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
