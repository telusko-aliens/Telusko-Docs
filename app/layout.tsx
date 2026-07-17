import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Banner } from 'fumadocs-ui/components/banner';
import { ExternalLink } from 'lucide-react';
const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Telusko Docs',
    template: 'Telusko Docs' // Remove the template pattern
  },
  icons:{
    icon:'/favicon.ico'
  },
  description: 'We Don\'t Teach We Educate',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Banner id="close" variant='rainbow' rainbowColors={[
      'rgba(59, 91, 255, 0.6)',     // primary blue
    'rgba(88, 116, 255, 0.7)', 
    'transparent',   // lighter blue
    'rgba(140, 170, 255, 0.3)',   // soft highlight
    // 'rgba(59, 91, 255, 0.6)',
    'transparent',
    'rgba(88, 116, 255, 0.7)',
    // 'rgba(140, 170, 255, 0.3)',
    'transparent',
  ]} > <a 
    href="https://www.learn.telusko.com/courses/agentic-ai-engineering-with-python" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-2 justify-center no-underline hover:no-underline text-sm sm:text-base md:text-lg"
  >
    Agentic AI Engineering with Python: Live Course 
    <ExternalLink className="w-4 h-4" />
  </a></Banner>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
