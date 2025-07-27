'use client';
import { useState } from 'react';
import Image from 'next/image';

const translations = {
  de: {
    title: "Memory-Spiel",
    moves: "Züge",
    reset: "Zurücksetzen",
    congratulations: "Glückwunsch!",
    gameComplete: "Spiel beendet!",
    playAgain: "Nochmal spielen",
    score: "Punktzahl",
    time: "Zeit",
    bestScore: "Beste Punktzahl",
    newGame: "Neues Spiel",
    instructions: "Finde alle Paare!",
    level: "Level",
    easy: "Einfach",
    medium: "Mittel",
    hard: "Schwer"
  },
  ar: {
    title: "لعبة الذاكرة",
    moves: "عدد المحاولات",
    reset: "إعادة البدء",
    congratulations: "تهانينا!",
    gameComplete: "انتهت اللعبة!",
    playAgain: "العب مرة أخرى",
    score: "النقاط",
    time: "الوقت",
    bestScore: "أفضل نتيجة",
    newGame: "لعبة جديدة",
    instructions: "اعثر على جميع الأزواج!",
    level: "المستوى",
    easy: "سهل",
    medium: "متوسط",
    hard: "صعب"
  }
};

export default function MemoryGame() {
  const [lang, setLang] = useState<'de' | 'ar'>('de');
  const t = translations[lang];
  
  // Bildpfade statt Emojis
  const images = [
    '/Ananas.svg',
    '/Aubergine.svg',
    '/Banane.svg',
    '/Apfel.svg',
    '/Gurke.svg',
    '/Orange.svg',
    '/Zitrone.svg',
    '/Tomate.svg',
  ];
  const [cards, setCards] = useState(
    [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((img, idx) => ({ id: idx, img, flipped: false, matched: false }))
  );
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleClick = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);
    setFlipped([...flipped, index]);
    if (flipped.length === 1) {
      setMoves(moves + 1);
      setTimeout(() => {
        const [firstIndex] = flipped;
        const newCards = [...cards];

        if (cards[firstIndex].img === newCards[index].img) {
          newCards[firstIndex].matched = true;
          newCards[index].matched = true;
        } else {
          newCards[firstIndex].flipped = false;
          newCards[index].flipped = false;
        }

        setCards(newCards);
        setFlipped([]);
      }, 1000);
    }
  };

  const reset = () => {
    setCards([...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((img, idx) => ({ id: idx, img, flipped: false, matched: false }))
    );
    setFlipped([]);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-blue-500 to-purple-600 min-h-screen p-2 sm:p-4 pt-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">{t.title}</h1>
      <p className="text-white mb-2 text-center">{t.instructions}</p>
      <p className="text-white mb-6 text-center">{t.moves}: {moves}</p>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full max-w-[98vw] px-0">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`
              w-26 h-27
              sm:w-30 sm:h-30
              md:w-32 md:h-32
              lg:w-36 lg:h-36
              xl:w-44 xl:h-44
              2xl:w-47 2xl:h-47
              flex items-center justify-center rounded-lg cursor-pointer text-3xl mb-2
              ${card.flipped || card.matched ? 'bg-white' : 'bg-black/30 hover:bg-black/50'}
            `}
          >
            {(card.flipped || card.matched) ? (
              <Image
                src={card.img}
                alt=""
                width={128}
                height={128}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 object-contain"
                unoptimized
              />
            ) : (
              <span className="text-4xl sm:text-6xl text-white select-none">?</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={reset} className="px-4 py-2 bg-white text-purple-600 rounded-md font-bold text-base sm:text-lg">
          {t.reset}
        </button>
        <button 
          onClick={() => setLang(lang === 'de' ? 'ar' : 'de')} 
          className="px-4 py-2 bg-white text-purple-600 rounded-md font-bold text-base sm:text-lg"
        >
          {lang === 'de' ? 'العربية' : 'Deutsch'}
        </button>
      </div>
    </div>
  );
}
