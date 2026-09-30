import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Brief · Arbete med överblick', description: 'Projekt, arbetsorder och dagbok för ditt team.' };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="sv"><body>{children}</body></html>; }
