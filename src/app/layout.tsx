import type { Metadata } from 'next';
import { Poppins, DM_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'HopeBegins',
  description: 'A platform for hope and prayer.',
};

import EngagementPopout from '@/components/layout/EngagementPopout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable}`}>
       <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FBGY484963"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FBGY484963');
          `}
        </Script>
      </head>
      <body className={dmSans.className} suppressHydrationWarning>
        <Providers>
          {children}
          <EngagementPopout />
        </Providers>
      </body>
    </html>
  );
}
