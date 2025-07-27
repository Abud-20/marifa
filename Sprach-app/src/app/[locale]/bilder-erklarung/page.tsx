"use client"
import { useState } from "react";

const translations = {
  de: {
    title: "Bilder-Erklärung",
    description: "Hier kannst du Bilder sehen und ihre Bedeutung lernen. Klicke auf ein Bild, um mehr zu erfahren.",
    welcome: "Willkommen zur Bilder-Erklärung",
    learn: "Lerne neue Wörter",
    practice: "Übe das Gelernte",
    vocabulary: "Wortschatz",
    pronunciation: "Aussprache",
    meaning: "Bedeutung",
    example: "Beispiel",
    back: "Zurück",
    next: "Weiter",
    start: "Beginnen",
    finish: "Beenden"
  },
  ar: {
    title: "شرح الصور",
    description: "هنا يمكنك رؤية الصور وتعلم معانيها. انقر على صورة لمعرفة المزيد.",
    welcome: "مرحباً بك في شرح الصور",
    learn: "تعلم كلمات جديدة",
    practice: "تدرب على ما تعلمته",
    vocabulary: "المفردات",
    pronunciation: "النطق",
    meaning: "المعنى",
    example: "مثال",
    back: "السابق",
    next: "التالي",
    start: "ابدأ",
    finish: "انهاء"
  }
};

export default function BilderErklarung(){
    const [lang, setLang] = useState<'de' | 'ar'>('de');
    const t = translations[lang];
    
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-200">
            <h1 className="text-4xl font-bold text-[#523529] mb-8">{t.title}</h1>
            <p className="text-xl text-[#523529] max-w-2xl text-center mb-8">{t.description}</p>
            
            <div className="flex gap-4 mb-8">
                <button 
                    onClick={() => setLang('de')} 
                    className={`px-4 py-2 rounded-lg font-bold ${lang === 'de' ? 'bg-[#7a9d54] text-white' : 'bg-white text-[#7a9d54] border-2 border-[#7a9d54]'}`}
                >
                    Deutsch
                </button>
                <button 
                    onClick={() => setLang('ar')} 
                    className={`px-4 py-2 rounded-lg font-bold ${lang === 'ar' ? 'bg-[#7a9d54] text-white' : 'bg-white text-[#7a9d54] border-2 border-[#7a9d54]'}`}
                >
                    العربية
                </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="font-bold text-[#7a9d54] mb-2">{t.vocabulary}</h3>
                    <p className="text-sm text-gray-600">{t.learn}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="font-bold text-[#7a9d54] mb-2">{t.pronunciation}</h3>
                    <p className="text-sm text-gray-600">{t.practice}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="font-bold text-[#7a9d54] mb-2">{t.meaning}</h3>
                    <p className="text-sm text-gray-600">{t.example}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="font-bold text-[#7a9d54] mb-2">{t.practice}</h3>
                    <p className="text-sm text-gray-600">{t.learn}</p>
                </div>
            </div>
        </div>
    )
}