 "use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Star } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// Google Icon component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function SignUpPage() {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { signIn, loading, error } = useAuth();

  const handleGoogleSignUp = async () => {
    if (!acceptedTerms) {
      alert('Devi accettare i termini per continuare');
      return;
    }
    
    try {
      await signIn('google');
    } catch (err) {
      console.error('Errore Google signup:', err);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">
          <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
            Unisciti alla Crew
          </span>
        </h2>
        <p className="text-zinc-400 text-sm">
          Crea il tuo account in 30 secondi
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Google Sign Up */}
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignUp}
          disabled={!acceptedTerms || loading}
          className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          ) : (
            <GoogleIcon />
          )}
          <span className="text-gray-800 font-medium">
            {loading ? 'Accesso in corso...' : 'Continua con Google'}
          </span>
        </button>
      </div>

      {/* Terms checkbox */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 text-sm text-zinc-300 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input 
              type="checkbox" 
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
              acceptedTerms 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 border-orange-500' 
                : 'border-zinc-400 group-hover:border-orange-400'
            }`}>
              {acceptedTerms && (
                <CheckCircle className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
              )}
            </div>
          </div>
          <span className="leading-relaxed">
            Accetto i{' '}
            <Link href="/terms" className="text-orange-400 hover:text-orange-300 underline">
              Termini
            </Link>{' '}
            e la{' '}
            <Link href="/privacy" className="text-orange-400 hover:text-orange-300 underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Social proof */}
        <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-white text-xs font-medium mb-1">10K+ membri attivi</p>
          <p className="text-zinc-400 text-xs">
            "La community streetwear più autentica"
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center space-y-3 pt-6 border-t border-zinc-800/50">
        <p className="text-zinc-400 text-sm">
          Hai già un account?{' '}
          <Link
            href="/signin"
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200 hover:underline"
          >
            Accedi
          </Link>
        </p>
        
        <p className="text-zinc-500 text-xs">
          Registrazione sicura • OAuth Google
        </p>
      </div>
    </div>
  );
}