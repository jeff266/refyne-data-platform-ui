import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { C, F } from "@/lib/design-tokens";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

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
        <body className={plusJakarta.className} style={{
          background: C.bg,
          color: C.text,
          fontFamily: F.sans,
          margin: 0,
          padding: 0,
        }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
