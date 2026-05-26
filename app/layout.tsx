import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refyne Data Platform",
  description: "Internal ops dashboard for Refyne Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#0a1628] text-gray-100 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
