// shared/SocialProviders.tsx
import React from 'react';

// Provider icons
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="fill-current">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" fill="#5865F2"/>
  </svg>
);

interface SocialProvidersProps {
  onProviderClick: (provider: string) => void;
  disabled?: boolean;
}

export const SocialProviders: React.FC<SocialProvidersProps> = ({ 
  onProviderClick, 
  disabled = false 
}) => {
  const providers = [
    { name: 'Google', icon: <GoogleIcon /> },
    { name: 'Discord', icon: <DiscordIcon /> }
  ];

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => onProviderClick(provider.name.toLowerCase())}
          disabled={disabled}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-zinc-800/30 hover:bg-zinc-800/50 border border-zinc-700/30 hover:border-zinc-600/50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{provider.icon}</span>
          <span className="text-white font-medium text-sm">
            {provider.name}
          </span>
        </button>
      ))}
    </div>
  );
};

// Magic Link Form Component
interface MagicLinkFormProps {
  buttonText: string;
  onSubmit: (email: string) => void;
  isLoading?: boolean;
}

export const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  buttonText,
  onSubmit,
  isLoading = false
}) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading) {
      onSubmit(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white placeholder-zinc-400 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"
          placeholder="email@esempio.com"
          required
          disabled={isLoading}
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading || !email}
        className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Invio...
          </span>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
};

// Divider Component
export const AuthDivider: React.FC<{ text?: string }> = ({ 
  text = "oppure" 
}) => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-zinc-700/50"></div>
    </div>
    <div className="relative flex justify-center">
      <span className="bg-zinc-900/40 px-4 text-zinc-400 text-sm">
        {text}
      </span>
    </div>
  </div>
);