import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unified Labour Access",
  description:
    "Labour technology platform for compliance, worker access, and public-sector modernization.",
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
