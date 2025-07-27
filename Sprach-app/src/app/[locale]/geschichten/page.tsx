"use client"
import { useState } from "react";
import { useLanguage } from "../layout";

const translations = {
    de: {
        title: "Geschichten – Niveau A1",
        testTitle: "✨ Kleiner Test",
        back: "Zurück",
        next: "Weiter",
        page: "Seite",
        correct: "Richtig!",
        wrong: "Leider falsch.",
        language: "Sprache",
        lang_de: "Deutsch",
        lang_ar: "Arabisch"
    },
    ar: {
        title: "قصص – المستوى A1",
        testTitle: "✨ اختبار صغير",
        back: "السابق",
        next: "التالي",
        page: "صفحة",
        correct: "صحيح!",
        wrong: "للأسف خطأ.",
        language: "اللغة",
        lang_de: "الألمانية",
        lang_ar: "العربية"
    }
};

export default function Geschichten() {
    const { lang } = useLanguage();
    const stories = [ 
        {
            title: {
                de: "🌙 Sterntaler 1",
                ar: "🌙 ستيرنتالر 1"
            },
            text: {
                de: `In einer Nacht, in der der Himmel so dunkel war wie gepresste Schwarzkirschen, fiel ein Sterntaler vom Firmament herunter. Es landete leise im Gras eines stillen Dorfgartens.
Dort spielte Lina, 7 Jahre alt, mit einem leeren Marmeladenglas. Sie seufzte:
„Ich wünschte, ich könnte die Sterne einfangen und jedem Menschen ein kleines Glück schenken.“

Das Sterntaler hörte sie. Es glühte warm, flog in das Glas und wurde zu drei funkelnden Sternen.
„Wähle weise“, flüsterte es. „Ein Stern für dich, ein Stern für eine Fremde, ein Stern für die Welt.“

Lina dachte kurz nach, dann tat sie, was ihr Herz sagte:
• Den ersten Stern gab sie einem hungrigen Kätzchen.
• Den zweiten schickte sie mit einem geheimen Wort in die Nacht: „Mitgefühl“.
• Den dritten hielt sie im Glas und legte ihn auf das Fensterbrett – damit nie wieder jemand im Dunkeln allein ist.

Am nächsten Morgen war das Glas leer, aber im Garten wuchsen überall blaue Glühwürmchen, die das Wort „Mitgefühl“ leise summten.`,
                ar: `في ليلة كان فيها السماء مظلمة مثل الكرز الأسود المضغوط، سقط نجم من السماء. هبط بهدوء على عشب حديقة قرية هادئة.
هناك كانت تلعب لينا، 7 سنوات، بمرطبان مربى فارغ. تنهدت:
"أتمنى لو أستطيع أن أمسك النجوم وأمنح كل إنسان سعادة صغيرة."

سمعها النجم. توهج دافئًا، وطار إلى المرطبان وأصبح ثلاثة نجوم متلألئة.
"اختاري بحكمة"، همس. "نجمة لكِ، نجمة لغريبة، نجمة للعالم."

فكرت لينا قليلاً، ثم فعلت ما قاله قلبها:
• أعطت النجمة الأولى لقطة جائعة.
• أرسلت الثانية بكلمة سرية إلى الليل: "تعاطف".
• احتفظت بالثالثة في المرطبان ووضعتها على حافة النافذة – حتى لا يبقى أحد في الظلام وحده.

في الصباح التالي كان المرطبان فارغًا، لكن في الحديقة نمت يرقات زرقاء تهمس بكلمة "تعاطف" بهدوء.`
            },
            test: [
                {
                    question: {
                        de: "Was war Linas erster Sternen-Wunsch?",
                        ar: "ما كانت أول أمنية لينا مع النجوم؟"
                    },
                    options: [
                        { text: { de: "Eis essen gehen", ar: "الذهاب لتناول الآيس كريم" }, correct: false },
                        { text: { de: "Die Sterne einfangen, um anderen Glück zu bringen", ar: "إمساك النجوم لإسعاد الآخرين" }, correct: true },
                        { text: { de: "Ein neues Fahrrad", ar: "دراجة جديدة" }, correct: false }
                    ]
                },
                {
                    question: {
                        de: "Welches geheime Wort schickte Lina in die Welt?",
                        ar: "ما هي الكلمة السرية التي أرسلتها لينا إلى العالم؟"
                    },
                    options: [
                        { text: { de: "Mitgefühl", ar: "تعاطف" }, correct: true },
                        { text: { de: "Superstar", ar: "نجم خارق" }, correct: false },
                        { text: { de: "Schokolade", ar: "شوكولاتة" }, correct: false }
                    ]
                },
                {
                    question: {
                        de: "Was blieb am Ende im Garten zurück?",
                        ar: "ماذا بقي في الحديقة في النهاية؟"
                    },
                    options: [
                        { text: { de: "Blaue Glühwürmchen", ar: "يرقات زرقاء" }, correct: true },
                        { text: { de: "Ein leeres Marmeladenglas", ar: "مرطبان مربى فارغ" }, correct: false },
                        { text: { de: "Beides", ar: "كلاهما" }, correct: false }
                    ]
                }
            ]
        },
        {
            title: {
                de: "📘 Geschichte: Der Regenbogenfuchs und die verlorene Farbe 2",
                ar: "📘 قصة: ثعلب قوس قزح واللون المفقود 2"
            },
            text: {
                de: `Tief im Silberwald lebte ein Fuchs namens Lumo, dessen Fell alle Regenbogenfarben schimmerte – bis auf eine: Grün fehlte ganz.
Eines Morgens fand er einen kleinen Jungen, der weinte, weil seine Malbox nur noch grau produzierte. „Ohne Grün kann ich die Wiesen nicht malen!“

Lumo schnupperte. Der Duft von frisch geschnittenem Gras kam aus einer verdunkelten Höhle. Dort saß ein alter Farbgeist, der sich einsam fühlte und deshalb alle Grüntöne eingesperrt hatte.

Statt zu kämpfen, fragte Lumo sanft:
„Würdest du uns ein Stück deiner Einsamkeit abgeben, wenn wir dir einen Freund schenken?“

Der Geist zögerte – doch der Junge reichte ihm eine selbstgemalte Karte mit einer grünen Wiese und einem Fuchs.
Die erste echte Freundschafts-Farbe war entstanden. Der Geist weinte türkisfarbene Tränen, die Grün in den Wald zurückbrachten – und Luminos Fell wurde smaragd-bunt.

Seitdem trägt der Regenbogenfuchs alle Farben – und niemals wieder Grau.
`,
                ar: `في أعماق غابة الفضة عاش ثعلب اسمه لومو، كان فراؤه يلمع بكل ألوان قوس قزح – ما عدا لون واحد: الأخضر كان مفقودًا تمامًا.
في صباح أحد الأيام وجد صبيًا صغيرًا يبكي لأن علبة ألوانه لم تعد تنتج إلا الرمادي. "بدون الأخضر لا أستطيع رسم المروج!"

شم لومو الهواء. جاء عطر العشب المقطوع حديثًا من كهف مظلم. هناك جلس روح الألوان العجوز، كان يشعر بالوحدة ولهذا حبس كل درجات اللون الأخضر.

بدلاً من القتال، سأل لومو بلطف:
"هل تعطينا جزءًا من وحدتك إذا قدمنا لك صديقًا؟"

تردد الروح – لكن الصبي أعطاه بطاقة رسمها بنفسه عليها مرج أخضر وثعلب.
هكذا وُلد أول لون صداقة حقيقي. بكى الروح دموعًا فيروزية أعادت الأخضر إلى الغابة – وأصبح فراء لومو ملونًا بالزمرد.

منذ ذلك الحين يحمل ثعلب قوس قزح كل الألوان – ولم يعد هناك رمادي أبدًا.`
            },
            test: [
                {
                    question: {
                        de: "Welche Farbe fehlte im Fell von Lumo?",
                        ar: "ما هو اللون الذي كان مفقودًا في فراء لومو؟"
                    },
                    options: [
                        { text: { de: "Rot", ar: "أحمر" }, correct: false },
                        { text: { de: "Grün", ar: "أخضر" }, correct: true },
                        { text: { de: "Blau", ar: "أزرق" }, correct: false }
                    ]
                },
                {
                    question: {
                        de: "Wer hatte alle Grüntöne eingesperrt?",
                        ar: "من الذي حبس كل درجات اللون الأخضر؟"
                    },
                    options: [
                        { text: { de: "Der Farbgeist", ar: "روح الألوان" }, correct: true },
                        { text: { de: "Der Junge", ar: "الصبي" }, correct: false },
                        { text: { de: "Der Fuchs", ar: "الثعلب" }, correct: false }
                    ]
                },
                {
                    question: {
                        de: "Was bewirkte die Karte des Jungen?",
                        ar: "ماذا فعلت بطاقة الصبي؟"
                    },
                    options: [
                        { text: { de: "Sie wurde zur neuen Freundschaft", ar: "أصبحت صداقة جديدة" }, correct: true },
                        { text: { de: "Sie löste einen Kampf aus", ar: "تسببت في قتال" }, correct: false },
                        { text: { de: "Sie verfärbte sich rosa", ar: "تغير لونها إلى الوردي" }, correct: false }
                    ]
                }
            ]
        },
    ];

    const [page, setPage] = useState(0);
    const [answers, setAnswers] = useState<(boolean|null)[]>(stories[page].test ? Array(stories[page].test.length).fill(null) : []);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<'left'|'right'>('right');

    // Wenn die Seite wechselt, Antworten zurücksetzen
    const handlePageChange = (newPage: number) => {
        setDirection(newPage > page ? 'right' : 'left');
        setAnimating(true);
        setTimeout(() => {
            setPage(newPage);
            setAnswers(stories[newPage].test ? Array(stories[newPage].test.length).fill(null) : []);
            setAnimating(false);
        }, 350); // Animationsdauer
    };

    const handleAnswer = (qIdx: number, isCorrect: boolean) => {
        setAnswers(prev => prev.map((a, i) => i === qIdx ? isCorrect : a));
    };

    // RTL für Arabisch
    const isRTL = lang === 'ar';

    return (
        <div className={`min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 flex flex-col items-center py-10 px-2 sm:px-4${isRTL ? ' rtl' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <h1 className="text-4xl font-bold text-[#523529] mb-10">{translations[lang].title}</h1>
            <div className="relative w-full max-w-4xl flex flex-col items-center">
                {/* Animierter Seiten-Container */}
                <div
                    className={`bg-white rounded-3xl shadow-2xl border border-orange-200 px-8 sm:px-16 py-14 w-full min-h-[600px] flex flex-col items-center relative transition-all duration-500
                        ${animating ? (direction === 'right' ? 'opacity-0 -translate-x-32' : 'opacity-0 translate-x-32') : 'opacity-100 translate-x-0'}
                    `}
                    style={{willChange: 'opacity, transform'}}
                >
                    <h2 className="text-3xl font-semibold text-[#523529] mb-8 text-center">{stories[page].title[lang]}</h2>
                    <pre className="whitespace-pre-wrap text-[#523529] text-lg sm:text-xl text-center mb-8 max-w-3xl">{stories[page].text[lang]}</pre>
                    {stories[page].test && (
                        <div className="w-full max-w-2xl mt-8">
                            <h3 className="text-2xl font-bold text-orange-600 mb-6 text-center">{translations[lang].testTitle}</h3>
                            <div className="space-y-8">
                                {stories[page].test.map((q, qIdx) => (
                                    <div key={qIdx} className="bg-orange-50 rounded-xl p-6 mb-2">
                                        <div className="mb-4 font-semibold text-[#523529] text-lg">{qIdx+1}. {q.question[lang]}</div>
                                        <div className="flex flex-col gap-3">
                                            {q.options.map((opt, oIdx) => (
                                                <button
                                                    key={oIdx}
                                                    className={`px-5 py-3 rounded border text-left text-base transition-all
                                                        ${answers[qIdx] === null ? 'bg-white border-orange-200 hover:bg-orange-100' : opt.correct ? (answers[qIdx] === true && 'bg-green-200 border-green-400') : (answers[qIdx] === false && 'bg-red-200 border-red-400')}
                                                    `}
                                                    disabled={answers[qIdx] !== null}
                                                    onClick={() => handleAnswer(qIdx, opt.correct)}
                                                >
                                                    {opt.text[lang]}
                                                </button>
                                            ))}
                                        </div>
                                        {answers[qIdx] !== null && (
                                            <div className={`mt-3 font-bold text-lg ${answers[qIdx] ? translations[lang].correct : translations[lang].wrong}`}>{answers[qIdx] ? translations[lang].correct : translations[lang].wrong}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {/* Navigation Buttons */}
                <div className="flex gap-6 mt-10">
                    <button
                        className="px-6 py-3 bg-orange-200 text-[#523529] rounded-xl font-bold shadow hover:bg-orange-300 disabled:opacity-50 text-lg"
                        onClick={() => handlePageChange(Math.max(0, page - 1))}
                        disabled={page === 0 || animating}
                    >
                        {translations[lang].back}
                    </button>
                    <span className="self-center text-[#523529] font-semibold text-lg">{translations[lang].page} {page+1} / {stories.length}</span>
                    <button
                        className="px-6 py-3 bg-orange-200 text-[#523529] rounded-xl font-bold shadow hover:bg-orange-300 disabled:opacity-50 text-lg"
                        onClick={() => handlePageChange(Math.min(stories.length - 1, page + 1))}
                        disabled={
                            page === stories.length - 1 ||
                            animating ||
                            (stories[page].test && answers.some(a => a === null))
                        }
                    >
                        {translations[lang].next}
                    </button>
                </div>
            </div>
        </div>
    );
}