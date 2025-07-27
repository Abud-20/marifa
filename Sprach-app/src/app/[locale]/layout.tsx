import "./globals.css";
import Navbar from "./Navbar/page";
import { getDirection } from "@/lib/utils";
import { Locale } from "@/lib/types";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}