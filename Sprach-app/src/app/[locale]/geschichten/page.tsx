import Link from "next/link";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

const stories = [
  {
    id: 1,
    titleDe: "Anna und die Katze",
    titleAr: "آنا والقط",
    level: "easy",
    descriptionDe: "Eine süße Geschichte über Anna und ihre Katze Max im Park.",
    descriptionAr: "قصة جميلة عن آنا وقطها ماكس في الحديقة."
  },
  {
    id: 2,
    titleDe: "Anna und das rote Fahrrad",
    titleAr: "آنا والدراجة الحمراء",
    level: "medium",
    descriptionDe: "Eine inspirierende Geschichte über Anna, die hart arbeitet, um sich ihren Traum zu erfüllen.",
    descriptionAr: "قصة ملهمة عن آنا التي تعمل بجد لتحقيق حلمها."
  },
  {
    id: 3,
    titleDe: "Die Farben des Regenbogens",
    titleAr: "ألوان قوس قزح",
    level: "hard",
    descriptionDe: "Eine magische Geschichte über die Schönheit der Farben.",
    descriptionAr: "قصة سحرية عن جمال الألوان."
  }
];

interface GeschichtenProps {
  params: Promise<{ locale: Locale }>;
}

export default async function Geschichten({ params }: GeschichtenProps) {
  const { locale } = await params;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-blue-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'easy': return getTranslation(locale, 'stories', 'easy');
      case 'medium': return getTranslation(locale, 'stories', 'medium');
      case 'hard': return getTranslation(locale, 'stories', 'hard');
      default: return '';
    }
  };

  const getStoryLink = (story: any) => {
    if (story.level === 'easy') {
      return `/${locale}/geschichten/einfach`;
    } else if (story.level === 'medium') {
      return `/${locale}/geschichten/mittel`;
    } else if (story.level === 'hard') {
      return `/${locale}/geschichten/schwer`;
    } else {
      return `/${locale}/geschichten/${story.id}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#523529] mb-4">{getTranslation(locale, 'stories', 'title')}</h1>
          <p className="text-xl text-[#523529] max-w-2xl mx-auto">{getTranslation(locale, 'stories', 'subtitle')}</p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#7a9d54]">
                  {locale === 'de' ? story.titleDe : story.titleAr}
                </h3>
                <span className={`px-2 py-1 rounded-full text-white text-xs font-bold ${getLevelColor(story.level)}`}>
                  {getLevelText(story.level)}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                {locale === 'de' ? story.descriptionDe : story.descriptionAr}
              </p>
              
              <div className="flex gap-2">
                <Link 
                  href={getStoryLink(story)}
                  className="flex-1 bg-[#7a9d54] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#5e7d3a] transition text-center"
                >
                  {getTranslation(locale, 'stories', 'readStory')}
                </Link>
                <button className="flex-1 bg-[#9db975] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#7a9d54] transition">
                  {getTranslation(locale, 'stories', 'listenStory')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link 
            href={`/${locale}`} 
            className="inline-block bg-[#7a9d54] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5e7d3a] transition"
          >
            {getTranslation(locale, 'stories', 'back')}
          </Link>
        </div>
      </div>
    </div>
  );
} 