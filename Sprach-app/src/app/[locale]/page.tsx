import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

interface HomeProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/Homepage.svg"
        alt="HomePage"
        fill
        className="absolute inset-0 w-full h-full object-cover -z-10"
        priority
        sizes="100vw"
      />
      <div className={`flex pb-5 bg-orange-300 gap-4 rounded-lg ${locale === 'ar' ? 'justify-end' : 'justify-start'}`}>
        <Image
          src="/Maarifa logo.svg"
          alt="Logo"
          width={140}
          height={140}
          className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-35"
        />
      </div>
      <div className="flex flex-col items-center gap-4 mt-8">
        <Image
          src="/Maarifa.gif"
          alt="Animation"
          width={160}
          height={160}
          className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-44 cursor-pointer"
        />
        <Link
          href={`/${locale}/memory-spiel`}
          className="bg-[#9db975] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 rounded border-2 border-[#7a9d54] shadow-xl transition-all duration-300 hover:bg-[#7a9d54] hover:scale-105 hover:shadow-2xl flex items-center justify-center animate-linkAppear"
        >
          {getTranslation(locale, 'home', 'memory')}
        </Link>
        
        <Link
          href={`/${locale}/bilder-erklarung`}
          className="bg-[#9db975] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 rounded border-2 border-[#7a9d54] shadow-xl transition-all duration-300 hover:bg-[#7a9d54] hover:scale-105 hover:shadow-2xl flex items-center justify-center animate-linkAppear"
        >
          {getTranslation(locale, 'home', 'bilder')}
        </Link>

        <Link
          href={`/${locale}/geschichten`}
          className="bg-[#9db975] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 rounded border-2 border-[#7a9d54] shadow-xl transition-all duration-300 hover:bg-[#7a9d54] hover:scale-105 hover:shadow-2xl flex items-center justify-center animate-linkAppear"
        >
          {getTranslation(locale, 'home', 'stories')}
        </Link>
      </div>
    </div>
  );
}
