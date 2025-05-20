import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import "../globals.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MainNavigation from "@/components/MainNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Index' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    messages = (await import(`../../../messages/en.json`)).default;
  }
  
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <MainNavigation />
            <div style={{ padding: '0 1rem' }}>
              <LanguageSwitcher />
              <main style={{ flex: 1 }}>
                {children}
              </main>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
