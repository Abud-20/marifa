'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/lib/types';
import { getTranslation, getTranslationObject } from '@/lib/i18n/translations';

interface SchwerProps {
  params: Promise<{ locale: Locale }>;
}

export default function Schwer({ params }: SchwerProps) {
  const [locale, setLocale] = useState<Locale>('de');
  const [currentStory, setCurrentStory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);

  // Story keys for translation (hard level)
  const storyKeys = ['stimmeMeer'];

  const getCurrentStoryData = () => {
    const storyKey = storyKeys[currentStory];
    const title = getTranslationObject(locale, 'stories', `stories.${storyKey}.title`) as unknown as string;
    const paragraphs = getTranslationObject(locale, 'stories', `stories.${storyKey}.paragraphs`) as unknown as string[];
    const questions = getTranslationObject(locale, 'stories', `stories.${storyKey}.questions`) as unknown as any[];
    
    return {
      title: title || 'Story Title',
      paragraphs: paragraphs || [],
      questions: questions || []
    };
  };

  const currentStoryData = getCurrentStoryData();

  // Reading progress simulation
  useEffect(() => {
    if (isReading && readingProgress < 100) {
      const timer = setTimeout(() => {
        setReadingProgress(prev => Math.min(prev + 2, 100));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [readingProgress, isReading]);

  const startReading = () => {
    setIsReading(true);
    setReadingProgress(0);
  };

  const handleAnswer = (selectedAnswerIndex: number) => {
    if (!currentStoryData.questions || currentStoryData.questions.length === 0) return;
    
    const currentQ = currentStoryData.questions[currentQuestion];
    const correct = selectedAnswerIndex === currentQ.correct;
    
    setSelectedAnswer(selectedAnswerIndex);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }

    // Auto-advance after 2 seconds
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < currentStoryData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const nextStory = () => {
    if (currentStory < storyKeys.length - 1) {
      setCurrentStory(currentStory + 1);
      setCurrentQuestion(0);
      setScore(0);
      setShowResults(false);
      setShowTest(false);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsReading(false);
      setReadingProgress(0);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setShowTest(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  // Don't render if no story data
  if (!currentStoryData.title || !currentStoryData.paragraphs || !currentStoryData.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-[#523529]">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-200 p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-300/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-amber-400/20 rounded-full animate-spin"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#523529] mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
            {getTranslation(locale, 'stories', 'hardStories')}
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setLocale('de')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                locale === 'de' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg' 
                  : 'bg-white/80 backdrop-blur-sm text-[#523529] hover:bg-white hover:shadow-md'
              }`}
            >
              🇩🇪 Deutsch
            </button>
            <button
              onClick={() => setLocale('ar')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                locale === 'ar' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg' 
                  : 'bg-white/80 backdrop-blur-sm text-[#523529] hover:bg-white hover:shadow-md'
              }`}
            >
              🇸🇦 العربية
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex justify-center gap-3 mb-6">
            {storyKeys.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentStory 
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 shadow-lg scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Book Layout */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20" style={{ minHeight: '700px' }}>
          <div className="p-8">
            {/* Story Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                {currentStoryData.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Reading Progress */}
            {isReading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{getTranslation(locale, 'stories', 'readingProgress') || 'Reading Progress'}</span>
                  <span>{readingProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {/* Story Content */}
            <div className="space-y-6 text-lg leading-relaxed mb-8 max-h-96 overflow-y-auto pr-4 custom-scrollbar">
              {currentStoryData.paragraphs.map((paragraph: string, index: number) => (
                <p 
                  key={index} 
                  className="text-[#523529] text-justify transition-all duration-500 hover:bg-amber-50/50 p-2 rounded-lg"
                  onMouseEnter={() => !isReading && startReading()}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Test Section */}
            <div className="border-t-2 border-gradient-to-r from-amber-200 to-yellow-200 pt-8">
              {!showTest ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowTest(true)}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    🧠 {getTranslation(locale, 'stories', 'startTest')}
                  </button>
                </div>
              ) : (
                <div>
                  {!showResults ? (
                    <div>
                      <h3 className="text-2xl font-bold text-[#523529] mb-6 text-center bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        📝 {getTranslation(locale, 'stories', 'test')}
                      </h3>
                      
                      {/* Feedback Message */}
                      {showFeedback && (
                        <div className={`text-center mb-6 p-6 rounded-xl font-bold text-xl border-2 transition-all duration-500 transform scale-105 ${
                          isCorrect 
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-lg' 
                            : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-400 shadow-lg'
                        }`}>
                          {isCorrect 
                            ? `🎉 ${getTranslation(locale, 'stories', 'correct')}`
                            : `💡 ${getTranslation(locale, 'stories', 'wrong')}`
                          }
                        </div>
                      )}
                      
                      <div className="mb-8">
                        <p className="text-xl text-[#523529] mb-6 font-semibold bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                          {currentStoryData.questions[currentQuestion].question}
                        </p>
                        
                        <div className="space-y-4">
                          {currentStoryData.questions[currentQuestion].options.map((option: string, index: number) => {
                            const currentQ = currentStoryData.questions[currentQuestion];
                            const isSelected = selectedAnswer === index;
                            const isCorrectAnswer = index === currentQ.correct;
                            
                            let buttonClass = "w-full text-left p-5 rounded-xl transition-all duration-300 border-2 font-medium text-lg transform hover:scale-102";
                            
                            if (showFeedback) {
                              if (isSelected && isCorrectAnswer) {
                                buttonClass += " bg-gradient-to-r from-green-200 to-emerald-200 text-green-800 border-green-400 shadow-lg";
                              } else if (isSelected && !isCorrectAnswer) {
                                buttonClass += " bg-gradient-to-r from-red-200 to-pink-200 text-red-800 border-red-400 shadow-lg";
                              } else if (isCorrectAnswer) {
                                buttonClass += " bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300";
                              } else {
                                buttonClass += " bg-gray-100 text-gray-500 border-gray-200";
                              }
                            } else {
                              buttonClass += " bg-white hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-gray-200 hover:border-amber-300 hover:shadow-md";
                            }
                            
                            return (
                              <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                disabled={showFeedback}
                                className={buttonClass}
                              >
                                <span className="inline-block w-8 h-8 bg-amber-100 text-amber-600 rounded-full text-center font-bold mr-3">
                                  {String.fromCharCode(97 + index)}
                                </span>
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="text-center text-gray-600 mb-6 bg-amber-50 p-4 rounded-lg">
                        <span className="font-semibold">
                          {getTranslation(locale, 'stories', 'question')} {currentQuestion + 1} / {currentStoryData.questions.length}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Results */
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-[#523529] mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                        🏆 {getTranslation(locale, 'stories', 'testResult')}
                      </h3>
                      
                      <div className="text-5xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent mb-6">
                        {score} / {currentStoryData.questions.length}
                      </div>
                      
                      <p className="text-xl text-[#523529] mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl">
                        {score === currentStoryData.questions.length 
                          ? `🎉 ${getTranslation(locale, 'stories', 'perfect')}`
                          : `👍 ${getTranslation(locale, 'stories', 'goodJob')}`
                        }
                      </p>

                      <div className="flex justify-center gap-6">
                        <button
                          onClick={resetTest}
                          className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          🔄 {getTranslation(locale, 'stories', 'tryAgain')}
                        </button>
                        {currentStory < storyKeys.length - 1 && (
                          <button
                            onClick={nextStory}
                            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            ➡️ {getTranslation(locale, 'stories', 'nextStory')}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Link 
            href={`/${locale}/geschichten`} 
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🏠 {getTranslation(locale, 'stories', 'backToStories')}
          </Link>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #eab308);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #ca8a04);
        }
      `}</style>
    </div>
  );
}
