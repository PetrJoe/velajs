import type { Metadata } from "next";
import "@/frontend/styles/globals.css";

export const metadata: Metadata = {
  title: "vorajs",
  description: "Django-inspired fullstack development for Next.js."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
