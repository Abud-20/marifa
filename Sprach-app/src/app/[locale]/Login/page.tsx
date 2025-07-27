"use client"
import Link from "next/link"
import { useState } from "react"

const translations = {
  de: {
    login: "Anmelden",
    register: "Registrieren",
    email: "E-Mail",
    password: "Passwort",
    name: "Name",
    repeatPassword: "Passwort wiederholen",
    rememberMe: "Angemeldet bleiben",
    noAccount: "Du hast kein Konto?",
    registerHere: "Registrieren",
    hasAccount: "Schon ein Konto?",
    backToLogin: "Zurück zum Login",
    loginButton: "Anmelden",
    registerButton: "Registrieren"
  },
  ar: {
    login: "تسجيل الدخول",
    register: "التسجيل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    name: "الاسم",
    repeatPassword: "تأكيد كلمة المرور",
    rememberMe: "تذكرني",
    noAccount: "ليس لديك حساب؟",
    registerHere: "سجل الآن",
    hasAccount: "لديك حساب بالفعل؟",
    backToLogin: "العودة لتسجيل الدخول",
    loginButton: "تسجيل الدخول",
    registerButton: "التسجيل"
  }
};

export default function Login() {
    const [showRegister, setShowRegister] = useState(false);
    const [lang, setLang] = useState<'de' | 'ar'>('de');
    const t = translations[lang];
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200">
            <div className="[perspective:1200px] w-full max-w-md h-[540px] flex items-center justify-center">
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${showRegister ? 'rotate-y-180' : ''}`}> 
                    {/* Front: Login */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center w-full h-full">
                        <h1 className="text-3xl font-extrabold text-center text-[#7a9d54] mb-6 mt-10">{t.login}</h1>
                        <form className="w-full flex flex-col gap-5">
                            <input
                                type="text"
                                placeholder={t.email}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="password"
                                placeholder={t.password}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="accent-[#7a9d54]" />
                                <label htmlFor="remember" className="text-gray-600 text-sm">{t.rememberMe}</label>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#7a9d54] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#5e7d3a] transition-all text-lg mt-2"
                            >
                                {t.loginButton}
                            </button>
                        </form>
                        <p className="mt-6 text-gray-600 text-sm text-center">
                            {t.noAccount}{' '}
                            <button type="button" onClick={() => setShowRegister(true)} className="text-[#7a9d54] font-semibold hover:underline focus:outline-none">{t.registerHere}</button>
                        </p>
                    </div>
                    {/* Back: Register */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center w-full h-full rotate-y-180">
                        <h1 className="text-3xl font-extrabold text-[#7a9d54] mb-6 text-center">{t.register}</h1>
                        <form className="w-full flex flex-col gap-5">
                            <input
                                type="text"
                                placeholder={t.name}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="email"
                                placeholder={t.email}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="password"
                                placeholder={t.password}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <input
                                type="password"
                                placeholder={t.repeatPassword}
                                className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7a9d54] transition"
                            />
                            <button
                                type="submit"
                                className="bg-[#7a9d54] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#5e7d3a] transition-all text-lg mt-2"
                            >
                                {t.registerButton}
                            </button>
                        </form>
                        <p className="mt-6 text-gray-600 text-sm text-center">
                            {t.hasAccount}{' '}
                            <button type="button" onClick={() => setShowRegister(false)} className="text-[#7a9d54] font-semibold hover:underline focus:outline-none">{t.backToLogin}</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}