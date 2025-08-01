"use client"
import { useState, useEffect } from "react";
import { Locale } from "@/lib/types";
import { getTranslation } from "@/lib/i18n/translations";

interface LoginProps {
  params: Promise<{ locale: Locale }>;
}

interface FormData {
  email: string;
  password: string;
  name?: string;
  repeatPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
  repeatPassword?: string;
}

export default function Login({ params }: LoginProps) {
  const [showRegister, setShowRegister] = useState(false);
  const [locale, setLocale] = useState<Locale>('de');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    repeatPassword: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
  }, [params]);

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = getTranslation(locale, 'login', 'emailRequired') || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = getTranslation(locale, 'login', 'emailInvalid') || 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = getTranslation(locale, 'login', 'passwordRequired') || 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = getTranslation(locale, 'login', 'passwordTooShort') || 'Password must be at least 6 characters';
    }
    
    // Registration specific validations
    if (showRegister) {
      if (!formData.name) {
        newErrors.name = getTranslation(locale, 'login', 'nameRequired') || 'Name is required';
      }
      
      if (!formData.repeatPassword) {
        newErrors.repeatPassword = getTranslation(locale, 'login', 'repeatPasswordRequired') || 'Please repeat your password';
      } else if (formData.password !== formData.repeatPassword) {
        newErrors.repeatPassword = getTranslation(locale, 'login', 'passwordsDontMatch') || 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically make an API call
      console.log('Form submitted:', { ...formData, rememberMe });
      
      // Show success message or redirect
      alert(showRegister ? 'Registration successful!' : 'Login successful!');
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between login and register
  const toggleForm = () => {
    setShowRegister(!showRegister);
    setFormData({ email: '', password: '', name: '', repeatPassword: '' });
    setErrors({});
    setShowPassword(false);
    setShowRepeatPassword(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-200 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-amber-300/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-300/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-orange-400/20 rounded-full animate-spin"></div>
      </div>

      <div className="[perspective:1200px] w-full max-w-md h-[600px] flex items-center justify-center relative z-10">
        <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${showRegister ? 'rotate-y-180' : ''}`}> 
          {/* Front: Login */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center w-full h-full border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                {getTranslation(locale, 'login', 'login')}
              </h1>
              <p className="text-gray-600 text-sm">
                {getTranslation(locale, 'login', 'welcomeBack') || 'Welcome back!'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={getTranslation(locale, 'login', 'email')}
                  className={`w-full border-2 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-500 hover:border-orange-300'
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={getTranslation(locale, 'login', 'password')}
                  className={`w-full border-2 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-500 hover:border-orange-300'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 accent-orange-500 rounded focus:ring-2 focus:ring-orange-500"
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-gray-600 text-sm cursor-pointer">
                  {getTranslation(locale, 'login', 'rememberMe')}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 rounded-lg shadow-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 text-lg mt-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {getTranslation(locale, 'login', 'loading') || 'Loading...'}
                  </>
                ) : (
                  <>
                    🔐 {getTranslation(locale, 'login', 'loginButton')}
                  </>
                )}
              </button>
            </form>

            {/* Switch to Register */}
            <p className="mt-6 text-gray-600 text-sm text-center">
              {getTranslation(locale, 'login', 'noAccount')}{' '}
              <button 
                type="button" 
                onClick={toggleForm} 
                className="text-orange-600 font-semibold hover:text-orange-700 hover:underline focus:outline-none transition-colors"
                disabled={isLoading}
              >
                {getTranslation(locale, 'login', 'registerHere')}
              </button>
            </p>
          </div>

          {/* Back: Register */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-8 py-10 flex flex-col items-center w-full h-full rotate-y-180 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                {getTranslation(locale, 'login', 'register')}
              </h1>
              <p className="text-gray-600 text-sm">
                {getTranslation(locale, 'login', 'createAccount') || 'Create your account'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={getTranslation(locale, 'login', 'name')}
                  className={`w-full border-2 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.name 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-500 hover:border-orange-300'
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  👤
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={getTranslation(locale, 'login', 'email')}
                  className={`w-full border-2 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-500 hover:border-orange-300'
                  }`}
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder={getTranslation(locale, 'login', 'password')}
                  className={`w-full border-2 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-500 hover:border-orange-300'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Repeat Password Input */}
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  value={formData.repeatPassword}
                  onChange={(e) => handleInputChange('repeatPassword', e.target.value)}
                  placeholder={getTranslation(locale, 'login', 'repeatPassword')}
                  className={`w-full border-2 rounded-lg p-4 pr-12 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.repeatPassword 
                      ? 'border-red-300 focus:ring-red-500 bg-red-50' 
                      : 'border-gray-200 focus:ring-orange-500 hover:border-orange-300'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showRepeatPassword ? '👁️' : '🙈'}
                </button>
                {errors.repeatPassword && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.repeatPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-4 rounded-lg shadow-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-300 text-lg mt-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {getTranslation(locale, 'login', 'loading') || 'Loading...'}
                  </>
                ) : (
                  <>
                    ✨ {getTranslation(locale, 'login', 'registerButton')}
                  </>
                )}
              </button>
            </form>

            {/* Switch to Login */}
            <p className="mt-6 text-gray-600 text-sm text-center">
              {getTranslation(locale, 'login', 'hasAccount')}{' '}
              <button 
                type="button" 
                onClick={toggleForm} 
                className="text-orange-600 font-semibold hover:text-orange-700 hover:underline focus:outline-none transition-colors"
                disabled={isLoading}
              >
                {getTranslation(locale, 'login', 'backToLogin')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}