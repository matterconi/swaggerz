"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Star, Mail, AlertTriangle, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Turnstile } from '@marsidev/react-turnstile';
import TurnstileBox from '@/components/TurnstileBox';

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
  const searchParams = useSearchParams();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoadingMagicLink, setIsLoadingMagicLink] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [turnstileRef, setTurnstileRef] = useState<any>(null);
  const [magicLinkError, setMagicLinkError] = useState<string | null>(null);
  const { signIn, sendMagicLink, error, clearError } = useAuth();

  // ✅ Gestione errori dai magic link falliti
  useEffect(() => {
    const errorFromUrl = searchParams.get('error');
    const errorType = searchParams.get('error_type');
    
    if (errorFromUrl && (errorType === 'magic_link_failed' || errorType === 'session_missing')) {
      setMagicLinkError(errorFromUrl);
      
      // Pulisci l'URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      newUrl.searchParams.delete('error_type');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

  const handleGoogleSignUp = async () => {
    if (!acceptedTerms) {
      alert('Devi accettare i termini per continuare');
      return;
    }

    if (!turnstileToken) {
      alert('Completa la verifica di sicurezza');
      return;
    }

    setIsLoadingGoogle(true);
    try {
      await signIn('google');
    } catch (err) {
      console.error('Errore Google signup:', err);
      setTurnstileToken('');
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleMagicLinkSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert('Devi accettare i termini per continuare');
      return;
    }

    if (!email || !turnstileToken) return;

    setIsLoadingMagicLink(true);
    setMagicLinkSent(false);
    setMagicLinkError(null); // Pulisci errori precedenti
    clearError();

    try {
      await sendMagicLink(email, 'sign-up');
      setMagicLinkSent(true);
      console.log('✅ Magic link inviato!');
    } catch (err) {
      console.error('❌ Errore:', err);
      setTurnstileToken('');
    } finally {
      setIsLoadingMagicLink(false);
    }
  };

  const dismissMagicLinkError = () => {
    setMagicLinkError(null);
  };

  const handleTurnstileClick = () => {
    if (!isVerifying && !turnstileToken && turnstileRef?.execute) {
      setIsVerifying(true);
      turnstileRef.execute();
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

      {/* ✅ Banner errore magic link fallito */}
      {magicLinkError && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-200 text-sm">{magicLinkError}</p>
            <p className="text-red-300 text-xs mt-1">
              Riprova inserendo la tua email qui sotto.
            </p>
          </div>
          <button
            onClick={dismissMagicLinkError}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error Message (errori generali) */}
      {error && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Magic Link Success Message */}
      {magicLinkSent && (
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-300">
              Link magico inviato!
            </h3>
          </div>
          <div className="text-blue-200 space-y-3">
            <p>Ho inviato un link magico a <strong>{email}</strong></p>
            <div className="text-sm bg-blue-800/30 p-4 rounded-lg space-y-3">
              <p className="font-semibold">📬 Prossimi passi:</p>
              <ol className="list-decimal list-inside space-y-2 leading-relaxed">
                <li><strong>Controlla la tua email</strong> - Il link arriva in pochi secondi</li>
                <li><strong>Clicca &quot;Accedi alla Crew&quot;</strong> - Ti porterà direttamente alla dashboard</li>
                <li><strong>Se non vedi l&apos;email</strong> - Controlla la cartella spam</li>
              </ol>
              <div className="mt-3 p-3 bg-blue-900/40 rounded-lg">
                <p className="text-xs text-blue-100">
                  💡 <strong>Tip:</strong> Il link è valido per 15 minuti. Non condividerlo con nessuno!
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setMagicLinkSent(false);
              setEmail('');
            }}
            className="text-sm text-blue-400 hover:text-blue-300 underline"
          >
            Invia un altro link
          </button>
        </div>
      )}

      {/* Magic Link Form */}
      {!magicLinkSent && (
        <form onSubmit={handleMagicLinkSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email per Magic Link
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@email.com"
              required
              className="w-full px-4 py-4 bg-zinc-800/50 border border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-zinc-400 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={isLoadingMagicLink || !email || !acceptedTerms || !turnstileToken}
            className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoadingMagicLink ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Mail className="w-5 h-5" />
            )}
            <span>
              {isLoadingMagicLink ? 'Invio in corso...' : 'Continua con Magic Link'}
            </span>
          </button>
        </form>
      )}

      {/* Divider */}
      {!magicLinkSent && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="text-zinc-500 text-sm">oppure</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>
      )}

      {/* Google Sign Up */}
      {!magicLinkSent && (
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignUp}
            disabled={!acceptedTerms || !turnstileToken || isLoadingGoogle}
            className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            {isLoadingGoogle ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
              <GoogleIcon />
            )}
            <span className="text-gray-800 font-medium">
              {isLoadingGoogle ? 'Accesso in corso...' : 'Continua con Google'}
            </span>
          </button>
        </div>
      )}

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

        {/* Turnstile - widget nascosto + UI personalizzata */}
        <div className="flex justify-center py-2">
          {/* Turnstile ufficiale nascosto */}
          <div className="hidden">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setIsVerifying(false);
              }}
              onError={() => {
                setTurnstileToken('');
                setIsVerifying(false);
              }}
              onExpire={() => {
                setTurnstileToken('');
                setIsVerifying(false);
              }}
              onLoad={() => {
                setIsVerifying(false); // Widget pronto, ma non ancora avviato
              }}
              ref={setTurnstileRef}
              options={{
                theme: 'dark',
                appearance: 'execute'
              }}
            />
          </div>

          {/* UI personalizzata che riflette lo stato */}
          <TurnstileBox
            isVerified={!!turnstileToken}
            isLoading={isVerifying}
            onClick={handleTurnstileClick}
          />
        </div>

        {/* Social proof */}
        <div className="bg-zinc-800/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-white text-xs font-medium mb-1">10K+ membri attivi</p>
          <p className="text-zinc-400 text-xs">
            &quot;La community streetwear più autentica&quot;
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
          Registrazione sicura • Magic Link • OAuth Google
        </p>
      </div>
    </div>
  );
}