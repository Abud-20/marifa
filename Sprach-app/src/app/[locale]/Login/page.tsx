"use client"
import { useState, useEffect } from "react";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

interface LoginProps {
  params: Promise<{ locale: Locale }>;
}

export default function Login({ params }: LoginProps) {
    const [showRegister, setShowRegister] = useState(false);
  const [locale, setLocale] = useState<Locale>('de');
  
  useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200">
            <div className="[perspective:1200px] w-full max-w-md h-[540px] flex items-center justify-center">
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${showRegister ? 'rotate-y-180' : ''}`}> 
                    {/* Front: Login */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center w-full h-full">
            <h1 className="text-3xl font-extrabold text-center text-[#7a9d54] mb-6 mt-10">{getTranslation(locale, 'login', 'login')}</h1>
                        <form className="w-full flex flex-col gap-5">
                            <input
                                type="text"
                placeholder={getTranslation(locale, 'login', 'email')}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="password"
                placeholder={getTranslation(locale, 'login', 'password')}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="accent-[#7a9d54]" />
                <label htmlFor="remember" className="text-gray-600 text-sm">{getTranslation(locale, 'login', 'rememberMe')}</label>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#7a9d54] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#5e7d3a] transition-all text-lg mt-2"
                            >
                {getTranslation(locale, 'login', 'loginButton')}
                            </button>
                        </form>
                        <p className="mt-6 text-gray-600 text-sm text-center">
              {getTranslation(locale, 'login', 'noAccount')}{' '}
              <button type="button" onClick={() => setShowRegister(true)} className="text-[#7a9d54] font-semibold hover:underline focus:outline-none">{getTranslation(locale, 'login', 'registerHere')}</button>
                        </p>
                    </div>
                    {/* Back: Register */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center w-full h-full rotate-y-180">
            <h1 className="text-3xl font-extrabold text-[#7a9d54] mb-6 text-center">{getTranslation(locale, 'login', 'register')}</h1>
                        <form className="w-full flex flex-col gap-5">
                            <input
                                type="text"
                placeholder={getTranslation(locale, 'login', 'name')}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="email"
                placeholder={getTranslation(locale, 'login', 'email')}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="password"
                placeholder={getTranslation(locale, 'login', 'password')}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="password"
                placeholder={getTranslation(locale, 'login', 'repeatPassword')}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <button
                                type="submit"
                                className="bg-[#7a9d54] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#5e7d3a] transition-all text-lg mt-2"
                            >
                {getTranslation(locale, 'login', 'registerButton')}
                            </button>
                        </form>
                        <p className="mt-6 text-gray-600 text-sm text-center">
              {getTranslation(locale, 'login', 'hasAccount')}{' '}
              <button type="button" onClick={() => setShowRegister(false)} className="text-[#7a9d54] font-semibold hover:underline focus:outline-none">{getTranslation(locale, 'login', 'backToLogin')}</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
  );
}