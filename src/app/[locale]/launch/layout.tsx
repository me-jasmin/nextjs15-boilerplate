import { notFound } from 'next/navigation';
import { hasLocale, Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import MainLayout from '@/components/layouts';

import { routing } from '@/i18n/routing';

import type { ReactNode } from 'react';

const Layout = async ({ children, modal, params }: { children: ReactNode; modal: ReactNode; params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) notFound();

    setRequestLocale(locale);

    return (
        <MainLayout background="launches">
            {children}
            {modal}
        </MainLayout>
    );
};

export default Layout;
