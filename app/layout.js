import './globals.css';
import { Space_Grotesk, Inter, Space_Mono } from 'next/font/google';

const disp = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-disp',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Manisha Singh — Product Designer × AI Creative',
  description:
    'Manisha Singh — Product Designer × AI Creative. I design digital experiences that feel as good as they function, combining UX thinking, visual design, AI and emerging technology.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#08090B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${disp.variable} ${body.variable} ${mono.variable}`}>
      <body className="native">{children}</body>
    </html>
  );
}
