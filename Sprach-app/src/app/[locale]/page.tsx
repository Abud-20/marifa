"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

interface HomeProps {
  params: Promise<{ locale: Locale }>;
}

export default function Home({ params }: HomeProps) {
  const [locale, setLocale] = useState<Locale>('de');
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const initLocale = async () => {
      const { locale: paramLocale } = await params;
      setLocale(paramLocale);
    };
    initLocale();
    setIsClient(true);
    setTimeout(() => setIsVisible(true), 100);
    
    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [params]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale === 'de' ? 'de-DE' : 'ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Safe translation function with fallbacks
  const getSafeTranslation = (key: string) => {
    try {
      return getTranslation(locale, 'home', key) || getFallbackTranslation(key);
    } catch (error) {
      return getFallbackTranslation(key);
    }
  };

  const getFallbackTranslation = (key: string) => {
    const fallbacks: Record<string, Record<string, string>> = {
      memory: { de: 'Memory Spiel', ar: 'لعبة الذاكرة' },
      bilder: { de: 'Bilder Erklärung', ar: 'شرح الصور' },
      stories: { de: 'Geschichten', ar: 'القصص' }
    };
    return fallbacks[key]?.[locale] || key;
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f46e5] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-[#523529]">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src="/Homepage.svg"
        alt="HomePage"
        fill
        className="absolute inset-0 w-full h-full object-cover -z-10"
        priority
        sizes="100vw"
      />
      {/* Header with Logo and Language Switcher */}
      <header className="relative z-10">
        <div className="flex justify-center items-center p-4 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-lg border-b-2 border-orange-300">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <Image
              src="/Maarifa logo.svg"
              alt="Logo"
              width={60}
              height={60}
              className="w-16 h-16 md:w-28 md:h-28"
            />
            <div className="block">
              <h1 className="text-lg md:text-2xl font-bold text-gray-800">
                {locale === 'de' ? 'Marifa' : 'معرفة'}
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                {locale === 'de' ? 'Sprachlern-App' : 'تطبيق تعلم اللغة'}
              </p>
            </div>
          </div>

          {/* Language Switcher and Time */}
          <div className="absolute right-4 flex items-center gap-2 md:gap-4">
            {/* Time Display */}
            <div className="block text-right">
              <div className="text-sm md:text-lg font-bold text-gray-800">{formatTime(currentTime)}</div>
              <div className="text-xs md:text-sm text-gray-600 hidden sm:block">{formatDate(currentTime)}</div>
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === 'de' ? 'ar' : 'de')}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-2 md:px-4 py-1 md:py-2 rounded-full font-semibold hover:from-orange-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg text-xs md:text-sm"
            >
              {locale === 'de' ? 'العربية' : 'Deutsch'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4">
        {/* Welcome Section */}
        <div className={`text-center mb-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-5xl bg-white/ backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-1 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-3xl text-gray-800 drop-shadow-lg max-w-2xl mx-auto font-bold text-gray-800 mb-4 drop-shadow-2xl">
            {locale === 'de' ? 'Willkommen bei Marifa!' : 'مرحباً بكم في معرفة!'}
          </h2>
          <p className="text-lg md:text-xl bg-white/30 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-1 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-3xl text-gray-800 drop-shadow-lg max-w-2xl mx-auto">
            {locale === 'de' 
              ? 'Entdecke die faszinierende Welt des Sprachenlernens mit interaktiven Spielen, spannenden Geschichten und innovativen Lernmethoden' 
              : 'اكتشف عالم تعلم اللغات المذهل من خلال الألعاب التفاعلية والقصص المثيرة وطرق التعلم المبتكرة'
            }
          </p>
        </div>

        {/* Animated Logo */}
        <div className={`mb-8 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <Image
            src="/Maarifa.gif"
            alt="Animation"
            width={200}
            height={200}
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
          />
        </div>

        {/* Navigation Cards */}
        <div className={`grid gap-6 w-full max-w-4xl transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Memory Game Card */}
          <Link
            href={`/${locale}/memory-spiel`}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                🧠
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {getSafeTranslation('memory')}
                </h3>
                <p className="text-gray-600">
                  {locale === 'de' 
                    ? 'Verbessere dein Gedächtnis und lerne spielerisch neue Wörter mit unserem interaktiven Memory-Spiel' 
                    : 'حسّن ذاكرتك وتعلم كلمات جديدة بطريقة ممتعة مع لعبة الذاكرة التفاعلية'
                  }
                </p>
              </div>
              <div className="text-2xl text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                →
              </div>
            </div>
          </Link>

          {/* Vocabulary Card */}
          <Link
            href={`/${locale}/bilder-erklarung`}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {getSafeTranslation('bilder')}
                </h3>
                <p className="text-gray-600">
                  {locale === 'de' 
                    ? 'Erweitere deinen Wortschatz mit visuellen Lernmethoden, Bildern und detaillierten Erklärungen' 
                    : 'وسّع مفرداتك من خلال طرق التعلم البصرية والصور والشروحات التفصيلية'
                  }
                </p>
              </div>
              <div className="text-2xl text-gray-400 group-hover:text-amber-500 transition-colors duration-300">
                →
              </div>
            </div>
          </Link>

          {/* Stories Card */}
          <Link
            href={`/${locale}/geschichten`}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                📖
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {getSafeTranslation('stories')}
                </h3>
                <p className="text-gray-600">
                  {locale === 'de' 
                    ? 'Tauche ein in fesselnde Geschichten mit verschiedenen Schwierigkeitsgraden und interaktiven Tests' 
                    : 'انغمس في قصص مثيرة بمستويات صعوبة مختلفة واختبارات تفاعلية'
                  }
                </p>
              </div>
              <div className="text-2xl text-gray-400 group-hover:text-yellow-500 transition-colors duration-300">
                →
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className={`mt-12 text-center transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link
            href={`/${locale}/Uber-uns`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 text-lg"
          >
            <span>{locale === 'de' ? 'Über uns' : 'من نحن'}</span>
            <span>•</span>
            <span>{locale === 'de' ? 'Entwickelt mit ❤️ von Abdulrahman' : 'طور بواسطة عبدالرحمن ❤️'}</span>
          </Link>
        </div>
      </main>

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}