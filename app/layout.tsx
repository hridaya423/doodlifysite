import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doodlify",
  description: "Express your creativity with our intuitive doodling extension",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
