import { notFound } from 'next/navigation';
import { hasLocale, Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import MainLayout from '@/components/layouts/MainLayout.layout';

import { routing } from '@/i18n/routing';

import type { ReactNode } from 'react';

const Layout = async ({ children, params }: { children: ReactNode; params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) notFound();

    setRequestLocale(locale);

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
