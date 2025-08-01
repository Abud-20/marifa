import Image from "next/image";
import Link from "next/link";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

const vocabulary = [
  {
    id: 1,
    wordDe: "Apfel",
    wordAr: "تفاح",
    image: "/Apfel.svg",
    pronunciation: "ˈapfəl"
  },
  {
    id: 2,
    wordDe: "Banane",
    wordAr: "موز",
    image: "/Banane.svg",
    pronunciation: "baˈnaːnə"
  },
  {
    id: 3,
    wordDe: "Orange",
    wordAr: "برتقال",
    image: "/Orange.svg",
    pronunciation: "oˈʁaŋʒə"
  },
  {
    id: 4,
    wordDe: "Tomate",
    wordAr: "طماطم",
    image: "/Tomate.svg",
    pronunciation: "toˈmaːtə"
  },
  {
    id: 5,
    wordDe: "Karotte",
    wordAr: "جزر",
    image: "/Karotte.svg",
    pronunciation: "kaˈʁɔtə"
  },
  {
    id: 6,
    wordDe: "Gurke",
    wordAr: "خيار",
    image: "/Gurke.svg",
    pronunciation: "ˈɡʊʁkə"
  },
  {
    id: 7,
    wordDe: "Katze",
    wordAr: "قط",
    image: "/Katze hand.svg",
    pronunciation: "ˈkatsə"
  },
  {
    id: 8,
    wordDe: "Park",
    wordAr: "حديقة",
    image: "/Homepage.svg",
    pronunciation: "paʁk"
  },
  {
    id: 9,
    wordDe: "Bank",
    wordAr: "مقعد",
    image: "/Homepage.svg",
    pronunciation: "baŋk"
  },
  {
    id: 10,
    wordDe: "schwarz",
    wordAr: "أسود",
    image: "/Homepage.svg",
    pronunciation: "ʃvaʁts"
  },
  {
    id: 11,
    wordDe: "weiß",
    wordAr: "أبيض",
    image: "/Homepage.svg",
    pronunciation: "vaɪs"
  },
  {
    id: 12,
    wordDe: "Anna",
    wordAr: "آنا",
    image: "/Homepage.svg",
    pronunciation: "ˈana"
  },
  {
    id: 13,
    wordDe: "Supermarkt",
    wordAr: "سوبر ماركت",
    image: "/Homepage.svg",
    pronunciation: "ˈzuːpɐˌmaʁkt"
  },
  {
    id: 14,
    wordDe: "Kasse",
    wordAr: "صندوق",
    image: "/Homepage.svg",
    pronunciation: "ˈkasə"
  },
  {
    id: 15,
    wordDe: "Wasser",
    wordAr: "ماء",
    image: "/Homepage.svg",
    pronunciation: "ˈvasɐ"
  },
  {
    id: 16,
    wordDe: "Euro",
    wordAr: "يورو",
    image: "/Homepage.svg",
    pronunciation: "ˈɔɪʁo"
  },
  {
    id: 17,
    wordDe: "Tom",
    wordAr: "توم",
    image: "/Homepage.svg",
    pronunciation: "toːm"
  },
  {
    id: 18,
    wordDe: "rot",
    wordAr: "أحمر",
    image: "/Homepage.svg",
    pronunciation: "ʁoːt"
  },
  {
    id: 19,
    wordDe: "Wetter",
    wordAr: "طقس",
    image: "/Homepage.svg",
    pronunciation: "ˈvɛtɐ"
  },
  {
    id: 20,
    wordDe: "kalt",
    wordAr: "بارد",
    image: "/Homepage.svg",
    pronunciation: "kalt"
  },
  {
    id: 21,
    wordDe: "regnet",
    wordAr: "ممطر",
    image: "/Homepage.svg",
    pronunciation: "ˈʁeːɡnət"
  },
  {
    id: 22,
    wordDe: "Mantel",
    wordAr: "معطف",
    image: "/Homepage.svg",
    pronunciation: "ˈmantəl"
  },
  {
    id: 23,
    wordDe: "Regenschirm",
    wordAr: "مظلة",
    image: "/Homepage.svg",
    pronunciation: "ˈʁeːɡənˌʃɪʁm"
  },
  {
    id: 24,
    wordDe: "Schule",
    wordAr: "مدرسة",
    image: "/Homepage.svg",
    pronunciation: "ˈʃuːlə"
  },
  {
    id: 25,
    wordDe: "Freund",
    wordAr: "صديق",
    image: "/Homepage.svg",
    pronunciation: "fʁɔɪnt"
  },
  {
    id: 26,
    wordDe: "Lisa",
    wordAr: "ليزا",
    image: "/Homepage.svg",
    pronunciation: "ˈliːza"
  },
  {
    id: 27,
    wordDe: "Tim",
    wordAr: "تيم",
    image: "/Homepage.svg",
    pronunciation: "tiːm"
  }
];

interface BilderErklarungProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BilderErklarung({ params }: BilderErklarungProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#523529] mb-4">{getTranslation(locale, 'pictures', 'title')}</h1>
          <p className="text-xl text-[#523529]">{getTranslation(locale, 'pictures', 'subtitle')}</p>
        </div>

        {/* Vocabulary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {vocabulary.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-center">
                <Image
                  src={item.image}
                  alt={locale === 'de' ? item.wordDe : item.wordAr}
                  width={120}
                  height={120}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold text-[#7a9d54] mb-2">
                  {locale === 'de' ? item.wordDe : item.wordAr}
                </h3>
                <p className="text-gray-600 mb-2">
                  {locale === 'de' ? item.wordAr : item.wordDe}
                </p>
                <p className="text-sm text-gray-500 font-mono">
                  {item.pronunciation}
                </p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-[#7a9d54] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#5e7d3a] transition">
                  {getTranslation(locale, 'pictures', 'learn')}
                </button>
                <button className="flex-1 bg-[#9db975] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#7a9d54] transition">
                  {getTranslation(locale, 'pictures', 'practice')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <button className="bg-orange-300 text-[#523529] px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition">
            {getTranslation(locale, 'pictures', 'previous')}
          </button>
          <button className="bg-[#7a9d54] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5e7d3a] transition">
            {getTranslation(locale, 'pictures', 'next')}
          </button>
          <Link 
            href={`/${locale}`} 
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
          >
            {getTranslation(locale, 'pictures', 'back')}
          </Link>
        </div>
      </div>
    </div>
  );
}