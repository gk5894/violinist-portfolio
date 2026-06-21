import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Marina Alba — Violinist',
  description: 'Award-winning violinist Marina Alba. Performances, gallery, press, and contact.',
  openGraph: {
    title: 'Marina Alba — Violinist',
    description: 'Award-winning violinist Marina Alba.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-charcoal text-off-white antialiased">{children}</body>
    </html>
  );
}
