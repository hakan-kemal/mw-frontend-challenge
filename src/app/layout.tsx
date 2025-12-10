import type { Metadata } from 'next';
import Providers from '@/app/providers';
import Header from '@/components/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'MyWheels - De beste af-en-toe auto',
  description:
    "Met MyWheels is een auto huren nog nooit zo voordelig geweest. Onze deelauto's vind je op loopafstand, wel zo makkelijk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-green-50 min-h-screen text-gray-800">
        <Providers>
          <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
            <Header />
            <main className="flex flex-col gap-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
