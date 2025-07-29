import { getDirection } from "@/lib/utils";
import { Locale } from "@/lib/types";
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from './Navbar/page';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <Navbar />
          {children}
      </body>
    </html>
  );
}