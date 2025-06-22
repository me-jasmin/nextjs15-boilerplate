import { notFound } from 'next/navigation';
import { hasLocale, Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import MainLayout from '@/components/layouts/MainLayout.layout';

import { rockets } from '@/lib/api';
import apiClient from '@/lib/api/client';

import { routing } from '@/i18n/routing';

import type { RocketTypes } from '@/lib/api';
import type { ReactNode } from 'react';

const generateStaticParams = async () => {
    const data: RocketTypes[] = await apiClient({ query: rockets, key: 'rockets' });
    const ids = data.map(rocket => rocket.id);

    return routing.locales.flatMap(locale => {
        return ids.map(id => ({ locale, id }));
    });
};

const Layout = async ({ modal, children, params }: { modal: ReactNode; children: ReactNode; params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) notFound();

    setRequestLocale(locale);

    return (
        <MainLayout fullScreeen noPadding>
            {modal}
            {children}
        </MainLayout>
    );
};

export default Layout;
export { generateStaticParams };
