"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

interface UberUnsProps {
  params: Promise<{ locale: Locale }>;
}

export default function UberUns({ params }: UberUnsProps) {
  const [locale, setLocale] = useState<Locale>('de');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
    // Trigger animation after component mounts
    setTimeout(() => setIsVisible(true), 100);
  }, [params]);

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-purple-300/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-blue-400/20 rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section - Moved 3 lines down and made more visible */}
          <div className={`text-center mb-16 pt-24 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-7xl md:text-9xl font-black text-blue-800 mb-8 drop-shadow-2xl">
              Über uns
            </h1>
            <div className="w-32 h-3 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full shadow-xl"></div>
          </div>

          {/* Main Content Card */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
              {/* Profile Image Placeholder */}
              <div className="w-60 h-100 md:w-70 md:h-111 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-white overflow-hidden">
                <Image 
                  src="/abud.jpg" 
                  alt="Abdulrahman" 
                  width={300} 
                  height={300} 
                  className="rounded-full w-full h-full object-cover" 
                />
              </div>
              
              {/* Introduction Text */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hallo, ich bin Abdulrahman! 👋
                </h2>
                
                <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
                  <p className="transform hover:scale-105 transition-transform duration-300">
                    <span className="text-blue-600 font-semibold">Hallo ich bin Abdulrahman</span> und ich freue mich, dass Sie hier sind.
                  </p>
                  
                  <p className="transform hover:scale-105 transition-transform duration-300">
                    Ich programmiere sehr gerne und meine <span className="text-purple-600 font-semibold">Leidenschaft liegt besonders in der Webentwicklung</span> sowie der Erstellung innovativer Apps, die das Leben der Menschen einfacher machen.
                  </p>
                  
                  <p className="transform hover:scale-105 transition-transform duration-300">
                    Dies ist die erste Webseite, die ich erstellt habe, und ich hoffe, dass sie Ihnen gefällt.
                  </p>
                </div>
              </div>
            </div>

            {/* Skills & Interests Section */}
            <div className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Programming */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold mb-2">Programmierung</h3>
                <p className="text-blue-100">Leidenschaft für das Erstellen von Code und innovativen Lösungen</p>
              </div>

              {/* Web Development */}
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-xl font-bold mb-2">Webentwicklung</h3>
                <p className="text-indigo-100">Moderne und benutzerfreundliche Webanwendungen</p>
              </div>

              {/* App Development */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-2">App-Entwicklung</h3>
                <p className="text-purple-100">Innovative Apps, die das Leben einfacher machen</p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className={`bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-200/50 transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                🎯 Meine Mission
              </h3>
              <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
                "Ich möchte durch innovative Technologie das Leben der Menschen verbessern und 
                <span className="text-blue-600 font-semibold"> benutzerfreundliche Lösungen</span> schaffen, 
                die wirklich einen Unterschied machen."
              </p>
            </div>

            {/* Contact/Connect Section */}
            <div className={`text-center mt-12 transition-all duration-1000 delay-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Lassen Sie uns in Kontakt bleiben! 🤝
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  📧 Kontakt
                </button>
                <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  💼 Portfolio
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  🚀 Projekte
                </button>
              </div>
            </div>
          </div>

          {/* Footer Quote */}
          <div className={`text-center mt-12 transition-all duration-1000 delay-1200 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <blockquote className="text-xl md:text-2xl text-gray-600 italic">
              "Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. 
              <br className="hidden md:block" />
              Die zweitbeste Zeit ist jetzt." 🌱
            </blockquote>
            <p className="text-gray-500 mt-4">- Chinesisches Sprichwort</p>
          </div>
        </div>
      </div>
    </div>
  );
}