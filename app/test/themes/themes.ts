import { JetBrains_Mono, Libre_Baskerville, Roboto, Playfair_Display, Montserrat, Merriweather, Oswald, Lora } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const oswald = Oswald({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lora = Lora({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const predefinedThemes = {
  default: {
    name: 'Default',
    font: jetBrainsMono,
    colors: {
      primary: '#000000',
      background: '#ffffff',
    },
  },
  serif: {
    name: 'Serif',
    font: libreBaskerville,
    colors: {
      primary: '#333333',
      background: '#f5f5f5',
    },
  },
  neon: {
    name: 'Neon',
    font: oswald,
    colors: {
      primary: '#00ff00',
      background: '#000000',
    },
  },
  pastel: {
    name: 'Pastel',
    font: montserrat,
    colors: {
      primary: '#6b5b95',
      background: '#f0e6ef',
    },
  },
  ocean: {
    name: 'Ocean',
    font: roboto,
    colors: {
      primary: '#ffffff',
      background: '#1e3d59',
    },
  },
  sunset: {
    name: 'Sunset',
    font: playfairDisplay,
    colors: {
      primary: '#ff6b6b',
      background: '#feca57',
    },
  },
  elegant: {
    name: 'Elegant',
    font: lora,
    colors: {
      primary: '#2c3e50',
      background: '#ecf0f1',
    },
  },
  modern: {
    name: 'Modern',
    font: merriweather,
    colors: {
      primary: '#34495e',
      background: '#bdc3c7',
    },
  },
};
