import './globals.css';
import { Instrument_Sans } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';

const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Manisha Singh — UI/UX & Digital Product Designer',
  description:
    'Manisha Singh is a UI/UX and digital product designer crafting responsive, accessible web and mobile experiences.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

// Applies a saved light/dark choice before first paint to avoid a flash.
const themeScript = `try{var s=localStorage.getItem("ms-theme");if(s)document.documentElement.dataset.theme=s}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="shell">
          <Sidebar />
          <main id="app">{children}</main>
        </div>
        <ThemeToggle />
      </body>
    </html>
  );
}
