'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const error = searchParams.get('error');
      
      // Se c'è un errore, reindirizza alla pagina di registrazione con il messaggio
      if (error) {
        let errorMessage = '';
        
        switch (error) {
          case 'INVALID_TOKEN':
            errorMessage = 'Il link è scaduto o non valido. Richiedi un nuovo magic link.';
            break;
          case 'TOKEN_EXPIRED':
            errorMessage = 'Il link è scaduto. I magic link sono validi per 15 minuti.';
            break;
          case 'VERIFICATION_FAILED':
            errorMessage = 'Errore durante la verifica. Riprova più tardi.';
            break;
          default:
            errorMessage = 'Si è verificato un errore durante l\'accesso.';
        }
        
        // Reindirizza alla registrazione con messaggio di errore
        const signUpUrl = new URL('/sign-up', window.location.origin);
        signUpUrl.searchParams.set('error', errorMessage);
        signUpUrl.searchParams.set('error_type', 'magic_link_failed');
        
        router.replace(signUpUrl.toString());
        return;
      }
      
      // Aspetta che il loading finisca
      if (loading) return;
      
      // Se l'utente è autenticato, vai alla dashboard
      if (user) {
        router.replace('/dashboard');
        return;
      }
      
      // Se non è autenticato e non ci sono errori, potrebbe essere un problema
      // Reindirizza alla registrazione
      router.replace('/sign-up?error=Sessione non trovata. Riprova ad accedere.&error_type=session_missing');
    };

    handleCallback();
  }, [user, loading, searchParams, router]);

  // Loading state con design coerente
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h1 className="text-2xl font-bold text-white">Verifica in corso...</h1>
        <p className="text-zinc-400">Stiamo completando il tuo accesso</p>
      </div>
    </div>
  );
}