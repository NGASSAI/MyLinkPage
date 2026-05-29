/**
 * Configuration centralisée des thèmes
 * Chaque thème contient les classes Tailwind pour l'arrière-plan, texte, bio, boutons et effets
 */

export const THEMES = {
  minimalist: {
    id: 'minimalist',
    name: 'Minimaliste',
    preview: 'bg-gray-100 border-gray-300',
    bg: 'bg-white',
    text: 'text-slate-900',
    bio: 'text-slate-500',
    button: 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg',
    buttonHover: 'hover:scale-105',
    accent: 'border-slate-200',
  },
  
  'pastel-gradient': {
    id: 'pastel-gradient',
    name: 'Pastel Gradient',
    preview: 'bg-gradient-to-tr from-violet-300 via-pink-200 to-blue-300',
    bg: 'bg-gradient-to-b from-violet-100 via-pink-100 to-blue-100',
    text: 'text-slate-900',
    bio: 'text-slate-600',
    button: 'bg-white text-slate-900 hover:bg-slate-50 shadow-lg hover:shadow-xl',
    buttonHover: 'hover:scale-105',
    accent: 'border-pink-200',
  },

  'neon-cyberpunk': {
    id: 'neon-cyberpunk',
    name: 'Néon Cyberpunk',
    preview: 'bg-black border-cyan-400',
    bg: 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950',
    text: 'text-cyan-300 font-mono',
    bio: 'text-cyan-200/80 font-mono text-xs',
    button: 'bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-950 font-bold font-mono hover:from-cyan-400 hover:to-cyan-300 border-2 border-cyan-300 shadow-lg shadow-cyan-500/50',
    buttonHover: 'hover:shadow-cyan-400/75 hover:scale-105',
    accent: 'border-cyan-500 shadow-lg shadow-cyan-500/20',
  },

  'retro-synthwave': {
    id: 'retro-synthwave',
    name: 'Rétro Synthwave',
    preview: 'bg-gradient-to-br from-fuchsia-600 to-orange-400',
    bg: 'bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900',
    text: 'text-pink-300 italic',
    bio: 'text-orange-300/90 text-sm',
    button: 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white font-bold hover:from-pink-400 hover:via-fuchsia-400 hover:to-purple-400 border border-pink-300/50 shadow-lg shadow-pink-500/50',
    buttonHover: 'hover:shadow-fuchsia-500/75 hover:scale-105',
    accent: 'border-pink-400/50 shadow-lg shadow-fuchsia-500/30',
  },

  'nature-minimal': {
    id: 'nature-minimal',
    name: 'Nature Minimal',
    preview: 'bg-green-100 border-green-400',
    bg: 'bg-gradient-to-b from-green-50 via-amber-50 to-green-50',
    text: 'text-green-900 font-serif',
    bio: 'text-green-700 font-serif text-sm',
    button: 'bg-gradient-to-r from-green-700 to-teal-600 text-white hover:from-green-600 hover:to-teal-500 shadow-md hover:shadow-lg font-serif',
    buttonHover: 'hover:scale-105',
    accent: 'border-green-300',
  },

  'glassmorphism': {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    preview: 'bg-blue-200 border-blue-300',
    bg: 'bg-gradient-to-br from-blue-400/20 via-purple-400/10 to-pink-400/20 backdrop-blur-3xl',
    text: 'text-white drop-shadow-lg',
    bio: 'text-white/80 drop-shadow-md text-sm',
    button: 'bg-white/20 text-white hover:bg-white/30 border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-white/75',
    buttonHover: 'hover:scale-105',
    accent: 'border-white/30 backdrop-blur-md',
  },

  'midnight-professional': {
    id: 'midnight-professional',
    name: 'Midnight Professional',
    preview: 'bg-zinc-900 border-blue-500',
    bg: 'bg-zinc-950',
    text: 'text-zinc-100 tracking-wide',
    bio: 'text-zinc-400 text-sm',
    button: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    buttonHover: 'hover:scale-105',
    accent: 'border-blue-500/50 shadow-lg shadow-blue-500/20',
  },

  'sunset-gradient': {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    preview: 'bg-gradient-to-r from-orange-400 to-red-500',
    bg: 'bg-gradient-to-br from-orange-300 via-red-300 to-pink-400',
    text: 'text-orange-950 font-bold drop-shadow-sm',
    bio: 'text-orange-900/90 drop-shadow-sm text-sm',
    button: 'bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold hover:from-orange-500 hover:to-red-500 shadow-lg shadow-orange-500/50 hover:shadow-orange-600/75',
    buttonHover: 'hover:scale-105',
    accent: 'border-orange-500/50',
  },
};

/**
 * Configuration des polices
 */
export const TYPOGRAPHY_OPTIONS = [
  {
    id: 'sans',
    name: 'Sans-Serif Moderne',
    fontClass: 'font-sans',
    description: 'Inter - Moderne et lisible',
  },
  {
    id: 'serif',
    name: 'Serif Élégante',
    fontClass: 'font-serif',
    description: 'Playfair Display - Sophistiquée',
  },
  {
    id: 'mono',
    name: 'Monospace Tech',
    fontClass: 'font-mono',
    description: 'JetBrains Mono - Technique',
  },
];

/**
 * Configuration des réseaux sociaux avec icônes SVG personnalisées
 * Utilisation des vrais logos officiels des réseaux sociaux
 */
import { 
  WhatsAppIcon, 
  GithubIcon, 
  EmailIcon, 
  PortfolioIcon, 
  FacebookIcon, 
  LinkedinIcon, 
  YoutubeIcon, 
  TiktokIcon 
} from '../components/Icons/SocialIcons';

export const SOCIAL_PLATFORMS = [
  { 
    id: 'whatsapp', 
    name: 'WhatsApp', 
    icon: WhatsAppIcon, 
    color: 'text-green-500 hover:text-green-600',
    placeholder: 'https://wa.me/1234567890',
    validation: {
      regex: /^(https?:\/\/)?(www\.)?(wa\.me\/[0-9]{6,}|api\.whatsapp\.com\/send\?phone=[0-9]{6,})([?&].*)?$/i,
      error: 'URL WhatsApp attendue, par ex. https://wa.me/1234567890'
    }
  },
  { 
    id: 'github', 
    name: 'GitHub', 
    icon: GithubIcon, 
    color: 'text-slate-900 hover:text-slate-700',
    placeholder: 'https://github.com/nom-utilisateur',
    validation: {
      regex: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/i,
      error: 'URL GitHub attendue, par ex. https://github.com/nom-utilisateur'
    }
  },
  { 
    id: 'email', 
    name: 'Email', 
    icon: EmailIcon, 
    color: 'text-red-600 hover:text-red-500',
    placeholder: 'mailto:email@example.com',
    validation: {
      regex: /^(mailto:)?[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
      error: 'Adresse e-mail attendue, par ex. mailto:email@example.com ou email@example.com'
    }
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio', 
    icon: PortfolioIcon, 
    color: 'text-blue-500 hover:text-blue-600',
    placeholder: 'https://mon-portfolio.com',
    validation: {
      regex: /^https?:\/\/.+$/i,
      error: 'URL de portfolio attendue, par ex. https://mon-portfolio.com'
    }
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: FacebookIcon, 
    color: 'text-blue-600 hover:text-blue-700',
    placeholder: 'https://www.facebook.com/nom.utilisateur',
    validation: {
      regex: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.-]+\/?$/i,
      error: 'URL Facebook attendue, par ex. https://www.facebook.com/nom.utilisateur'
    }
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    icon: LinkedinIcon, 
    color: 'text-blue-700 hover:text-blue-800',
    placeholder: 'https://www.linkedin.com/in/nom-utilisateur',
    validation: {
      regex: /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/i,
      error: 'URL LinkedIn attendue, par ex. https://www.linkedin.com/in/nom-utilisateur'
    }
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    icon: YoutubeIcon, 
    color: 'text-red-600 hover:text-red-700',
    placeholder: 'https://www.youtube.com/c/nomchaine',
    validation: {
      regex: /^https?:\/\/(www\.)?(youtube\.com\/(channel|c|user)\/[A-Za-z0-9_-]+|youtu\.be\/[A-Za-z0-9_-]+|youtube\.com\/watch\?v=[A-Za-z0-9_-]+)([?&].*)?$/i,
      error: 'URL YouTube attendue, par ex. https://www.youtube.com/c/nomchaine'
    }
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    icon: TiktokIcon, 
    color: 'text-pink-500 hover:text-pink-600',
    placeholder: 'https://www.tiktok.com/@nomutilisateur',
    validation: {
      regex: /^https?:\/\/(www\.)?tiktok\.com\/@[A-Za-z0-9_.-]+\/?$/i,
      error: 'URL TikTok attendue, par ex. https://www.tiktok.com/@nomutilisateur'
    }
  },
];

export const getSocialPlatform = (id) => SOCIAL_PLATFORMS.find(p => p.id === id);

export const validateSocialUrl = (platformId, url = '') => {
  const platform = getSocialPlatform(platformId);
  if (!platform) return false;
  const trimmed = url.trim();
  if (!trimmed) return true;
  return platform.validation?.regex?.test(trimmed) ?? false;
};

export const getSocialUrlError = (platformId, url = '') => {
  const platform = getSocialPlatform(platformId);
  if (!platform || !url.trim()) return '';
  if (validateSocialUrl(platformId, url)) return '';
  return platform.validation?.error || 'URL invalide pour cette plateforme';
};

export default { THEMES, TYPOGRAPHY_OPTIONS, SOCIAL_PLATFORMS };
