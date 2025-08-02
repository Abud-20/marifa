'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTranslations } from '@/lib/i18n/translations';
import { Locale } from '@/lib/types';

type MemoryGameProps = {
  params: Promise<{ locale: Locale }>;
};

export default function MemoryGame({ params }: MemoryGameProps) {
  const [locale, setLocale] = useState<Locale>('de');
  const [isClient, setIsClient] = useState(false);
  const t = getTranslations(locale, 'memory') as Record<string, string>;
  
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
  
  // Timer states
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);
  
  // Countdown timer states
  const [countdownTime, setCountdownTime] = useState(60); // 60 seconds = 1 minute
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGameActive) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive]);

  // Countdown timer effect
  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    
    if (isCountdownActive && countdownTime > 0) {
      countdownInterval = setInterval(() => {
        setCountdownTime(prev => {
          if (prev <= 1) {
            setIsCountdownActive(false);
            setIsGameActive(false);
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [isCountdownActive, countdownTime]);

  // Check if game is complete
  useEffect(() => {
    const allMatched = cards.every(card => card.matched);
    if (allMatched && isGameActive && elapsedTime > 0) {
      setIsGameActive(false);
      setIsCountdownActive(false);
      // Update best time
      if (!bestTime || elapsedTime < bestTime) {
        setBestTime(elapsedTime);
        localStorage.setItem('memoryBestTime', elapsedTime.toString());
      }
    }
  }, [cards, isGameActive, elapsedTime, bestTime]);

  // Load best time from localStorage and initialize locale
  useEffect(() => {
    const initLocale = async () => {
      const { locale: paramLocale } = await params;
      setLocale(paramLocale);
    };
    initLocale();
    setIsClient(true);
    
    const savedBestTime = localStorage.getItem('memoryBestTime');
    if (savedBestTime) {
      setBestTime(parseInt(savedBestTime));
    }
  }, [params]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClick = (index: number) => {
    if (flipped.length === 2 || cards[index].flipped || cards[index].matched || gameOver) return;

    // Start timer on first click
    if (!isGameActive) {
      setElapsedTime(0);
      setIsGameActive(true);
      setIsCountdownActive(true);
      setCountdownTime(60);
      setGameOver(false);
    }

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
    setIsGameActive(false);
    setElapsedTime(0);
    setIsCountdownActive(false);
    setCountdownTime(60);
    setGameOver(false);
  };

  // Check if game is won
  const isGameWon = cards.every(card => card.matched) && isGameActive && elapsedTime > 0;

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center min-h-screen p-2 sm:p-4 pt-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 animate-gradient-xy">
        {/* Floating Bubbles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float-1"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/15 rounded-full animate-float-2"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/8 rounded-full animate-float-3"></div>
        <div className="absolute bottom-10 right-1/3 w-12 h-12 bg-white/12 rounded-full animate-float-4"></div>
        <div className="absolute top-1/3 left-1/2 w-18 h-18 bg-white/10 rounded-full animate-float-5"></div>
        
        {/* Moving Waves */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/20 to-transparent animate-wave-1"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/15 to-transparent animate-wave-2"></div>
        
        {/* Rotating Elements */}
        <div className="absolute top-1/4 right-10 w-8 h-8 border-2 border-white/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-10 w-6 h-6 border-2 border-white/15 rounded-full animate-spin-reverse"></div>
      </div>

      {/* Countdown Timer - Top Right */}
      {isCountdownActive && (
        <div className="absolute top-7 right-2 z-20">
          <div className={`
            px-3 py-1 rounded-full font-bold text-2xl shadow-2xl border-2 backdrop-blur-sm
            ${countdownTime > 30 
              ? 'bg-green-500/90 text-white border-green-400' 
              : countdownTime > 10 
                ? 'bg-yellow-500/90 text-white border-yellow-400' 
                : 'bg-red-500/90 text-white border-red-400 animate-pulse'
            }
          `}>
            ⏰ {formatCountdown(countdownTime)}
          </div>
        </div>
      )}

      {/* Game Over Message */}
      {gameOver && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 rounded-2xl p-8 text-center shadow-2xl border-2 border-red-500 max-w-md mx-4">
            <div className="text-6xl mb-4">😢</div>
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              {locale === 'de' ? 'Zeit ist um!' : 'انتهى الوقت!'}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {locale === 'de' 
                ? 'Die Zeit ist abgelaufen. Versuche es nochmal!' 
                : 'انتهى الوقت. حاول مرة أخرى!'
              }
            </p>
            <button 
              onClick={reset}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {locale === 'de' ? 'Neues Spiel' : 'لعبة جديدة'}
            </button>
          </div>
        </div>
      )}

      {/* Game Won Message */}
      {isGameWon && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/95 rounded-2xl p-8 text-center shadow-2xl border-2 border-green-500 max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              {locale === 'de' ? 'Gewonnen!' : 'فزت!'}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {locale === 'de' 
                ? `Du hast alle Karten in ${formatTime(elapsedTime)} gefunden!` 
                : `لقد وجدت جميع البطاقات في ${formatTime(elapsedTime)}!`
              }
            </p>
            {(!bestTime || elapsedTime < bestTime) && (
              <p className="text-lg text-yellow-600 font-bold mb-6">
                {locale === 'de' ? '🏆 Neue Bestzeit!' : '🏆 وقت جديد أفضل!'}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <button 
                onClick={reset}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {locale === 'de' ? 'Neues Spiel' : 'لعبة جديدة'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center drop-shadow-lg">{t.title}</h1>
        <p className="text-white mb-2 text-center drop-shadow-md">{t.instructions}</p>
        
        {/* Timer and Stats Display */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-white drop-shadow-md">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span className="font-bold">⏱️ {t.moves}: {moves}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
            <span className="font-bold">🕐 {locale === 'de' ? 'Zeit' : 'الوقت'}: {formatTime(elapsedTime)}</span>
          </div>
          {bestTime && (
            <div className="bg-yellow-500/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-300/50">
              <span className="font-bold">🏆 {locale === 'de' ? 'Beste Zeit' : 'أفضل وقت'}: {formatTime(bestTime)}</span>
            </div>
          )}
        </div>
      
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
                backdrop-blur-sm border border-white/20 shadow-lg
                transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                ${card.flipped || card.matched ? 'bg-white/90' : 'bg-black/30 hover:bg-black/50'}
                ${gameOver ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            {(card.flipped || card.matched) ? (
              <Image
                src={card.img}
                alt=""
                width={128}
                height={128}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 object-contain transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            ) : (
                <span className="text-4xl sm:text-6xl text-white select-none drop-shadow-lg">?</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
          <button 
            onClick={reset} 
            className="px-4 py-2 bg-white/90 backdrop-blur-sm text-purple-600 rounded-md font-bold text-base sm:text-lg shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
          {t.reset}
        </button>
        <button 
          onClick={() => setLocale(locale === 'de' ? 'ar' : 'de')} 
            className="px-4 py-2 bg-white/90 backdrop-blur-sm text-purple-600 rounded-md font-bold text-base sm:text-lg shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          {locale === 'de' ? 'العربية' : 'Deutsch'}
        </button>
      </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(90deg); }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-90deg); }
        }
        
        @keyframes float-5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(270deg); }
        }
        
        @keyframes wave-1 {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes wave-2 {
          0%, 100% { transform: translateX(100%); }
          50% { transform: translateX(-100%); }
        }
        
        .animate-gradient-xy {
          background-size: 400% 400%;
          animation: gradient-xy 15s ease infinite;
        }
        
        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 8s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite;
        }
        
        .animate-float-4 {
          animation: float-4 5s ease-in-out infinite;
        }
        
        .animate-float-5 {
          animation: float-5 9s ease-in-out infinite;
        }
        
        .animate-wave-1 {
          animation: wave-1 20s linear infinite;
        }
        
        .animate-wave-2 {
          animation: wave-2 25s linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin 8s linear infinite reverse;
        }
      `}</style>
    </div>
  );
}