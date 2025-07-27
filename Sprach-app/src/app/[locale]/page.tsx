"use client"
import Link from "next/link";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "./layout";

const translations = {
  de: {
    hello: "Hallo",
    memory: "Memory Spiel",
    bilder: "Bilder Erklärung",
    stories: "Geschichten",
    welcome: "Willkommen bei Maarifa",
    learnGerman: "Lerne Deutsch",
    learnArabic: "تعلم العربية",
    startLearning: "Beginne zu lernen",
    explore: "Entdecke unsere Lernspiele"
  },
  ar: {
    hello: "مرحباً",
    memory: "لعبة الذاكرة",
    bilder: "شرح الصور",
    stories: "قصص",
    welcome: "مرحباً بك في معرفة",
    learnGerman: "تعلم الألمانية",
    learnArabic: "تعلم العربية",
    startLearning: "ابدأ التعلم",
    explore: "اكتشف ألعابنا التعليمية"
  }
};

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations];
  const [showText, setShowText] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleGifClick = () => {
    setShowText(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setShowText(false);
    }, 3000);
  };

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
      <div className={`flex pb-5 bg-orange-300 gap-4 rounded-lg ${lang === 'ar' ? 'justify-end' : 'justify-start'}`}>
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
          onClick={handleGifClick}
        />
        {showText && (
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white drop-shadow-lg animate-fadeInScale">
            {t.hello}
          </div>
        )}
        <Link
          href="/memory-spiel"
          className="bg-[#9db975] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 rounded border-2 border-[#7a9d54] shadow-xl transition-all duration-300 hover:bg-[#7a9d54] hover:scale-105 hover:shadow-2xl flex items-center justify-center animate-linkAppear"
        >
          {t.memory}
        </Link>
        
        <Link
          href="/bilder-erklarung"
          className="bg-[#9db975] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 rounded border-2 border-[#7a9d54] shadow-xl transition-all duration-300 hover:bg-[#7a9d54] hover:scale-105 hover:shadow-2xl flex items-center justify-center animate-linkAppear"
        >
          {t.bilder}
        </Link>

        <Link
          href="/geschichten"
          className="bg-[#9db975] text-lg sm:text-xl md:text-2xl lg:text-3xl text-white px-3 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 rounded border-2 border-[#7a9d54] shadow-xl transition-all duration-300 hover:bg-[#7a9d54] hover:scale-105 hover:shadow-2xl flex items-center justify-center animate-linkAppear"
        >
          {t.stories}
        </Link>
      </div>
    </div>
  );
}
