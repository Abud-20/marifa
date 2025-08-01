// app/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'de' | 'ar'>('de')
  const router = useRouter()
  const pathname = usePathname()

  // Set initial language based on current URL
  useEffect(() => {
    try {
      const currentPath = pathname
      console.log('Current path:', currentPath)
      
      if (currentPath.includes('/ar/') || currentPath.includes('/ar')) {
        setLanguage('ar')
        console.log('Setting language to Arabic')
      } else {
        setLanguage('de')
        console.log('Setting language to German')
      }
    } catch (error) {
      console.error('Error detecting language:', error)
      setLanguage('de')
    }
  }, [pathname])

  const toggleLanguage = () => {
    const newLanguage = language === 'de' ? 'ar' : 'de'
    setLanguage(newLanguage)
    
    // Navigate to the same page but with different language
    const pathSegments = pathname.split('/')
    if (pathSegments[1] === 'de' || pathSegments[1] === 'ar') {
      pathSegments[1] = newLanguage
    } else {
      // If no locale in path, add it
      pathSegments.splice(1, 0, newLanguage)
    }
    const newPath = pathSegments.join('/')
    
    console.log('Navigating to:', newPath)
    router.push(newPath)
  }

  return (
    <nav className="fixed top-4 left-0 z-50 ltr" style={{ direction: 'ltr' }}>
      <div className="relative">
        {/* Hamburger Menu Button - Always visible */}
        <div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-orange-600 hover:text-orange-700 focus:outline-none transition-all duration-300 p-2 transform hover:scale-110 active:scale-95  "
          >
            <img
              src="/Katze hand.svg"
              alt="Menu"
              className={`h-20 w-20 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            />
          </button>
        </div>

        {/* Navigation Menu - Appears in place when hamburger is clicked */}
        <div 
          className={`absolute top-full left-0 mt-2  backdrop-blur-sm border-2  border-orange-200 shadow-xl rounded-xl min-w-[200px] transition-all duration-300 ease-in-out transform origin-top-left ${
            isMenuOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`} 
          style={{ direction: 'ltr' }}
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            <Link
              href={`/${language}`}
              className="block px-3 py-2 text-gray-800 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-lg transform hover:translate-x-1 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <hr className="border-orange-200" />
            <Link
              href={`/${language}/Login`}
              className="block px-3 py-2 text-gray-800 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-lg transform hover:translate-x-1 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <hr className="border-orange-200" />
            <Link
              href={`/${language}/Uber-uns`}
              className="block px-3 py-2 text-gray-800 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 rounded-lg transform hover:translate-x-1 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Über uns
            </Link>
            <hr className="border-orange-200 mt-2" />
          
           
            {/* Language Toggle Button - With proper navigation */}
            <button
              onClick={() => {
                console.log('Language button clicked')
                toggleLanguage()
                setIsMenuOpen(false)
              }}
              className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              style={{ direction: 'ltr', textAlign: 'center' }}
            >
              <span className="font-semibold">
                {language === 'de' ? 'العربية' : 'Deutsch'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
