import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client'; // ✅ Solo client-side imports


export function useAuth() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica la sessione corrente
  useEffect(() => {
    const getSession = async () => {
      try {
        setLoading(true);
        const session = await authClient.getSession();
        setData(session.data);
        setError(null);
      } catch (err) {
        console.error('Errore nel caricamento della sessione:', err);
        setError('Errore nel caricamento della sessione');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, []);

  // Login con provider OAuth
  const signIn = async (provider: 'google' | 'github') => {
    try {
      setError(null);
      await authClient.signIn.social({
        provider,
        callbackURL: '/dashboard', // Redirect dopo login
      });
    } catch (err) {
      console.error(`Errore login ${provider}:`, err);
      setError(`Errore durante il login con ${provider}`);
    }
  };

  // Logout
  const signOut = async () => {
    try {
      setError(null);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setData(null);
            window.location.href = '/'; // Redirect dopo logout
          },
        },
      });
    } catch (err) {
      console.error('Errore logout:', err);
      setError('Errore durante il logout');
    }
  };

  // Refresh della sessione
  const refresh = async () => {
    try {
      setError(null);
      const session = await authClient.getSession();
      setData(session.data);
    } catch (err) {
      console.error('Errore refresh sessione:', err);
      setError('Errore nel refresh della sessione');
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Send magic link using Better Auth
  const sendMagicLink = async (email: string) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authClient.signIn.magicLink({
        email,
        callbackURL: '/dashboard',
      });

      console.log('✅ Magic link sent via Better Auth:', response);
      return response;
    } catch (err) {
      console.error('❌ Errore invio magic link:', err);
      setError('Errore durante l\'invio del magic link');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    // Dati
    user: data?.user || null,
    session: data?.session || null,
    loading,
    error,

    // Stato
    isAuthenticated: !!data?.user,
    isLoading: loading,

    // Azioni
    signIn,
    signOut,
    refresh,
    clearError,
    sendMagicLink,
  };
}