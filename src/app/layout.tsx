import '@mantine/core/styles.css';
import '@styles/global.scss';

import clsx from 'clsx';

import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';
import { Metadata, Viewport } from 'next';

import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';

import NavigationProgress from '@/components/navigation-progress';
import Navigation from '@/components/navigation/Navigation';

import { routing } from '@/i18n/routing';

import type { ReactNode } from 'react';

const ddincon = localFont({
    src: [
        {
            path: '../assets/fonts/d-dincondensed-webfont.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/d-dincondensed-bold-webfont.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
});

const ddin = localFont({
    src: [
        {
            path: '../assets/fonts/d-din-webfont.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../assets/fonts/d-din-bold-webfont.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
});

const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 10,
    userScalable: true,
};

const metadata: Metadata = {
    title: {
        template: '%s // SpaceX',
        default: 'SpaceX',
    },
};

const generateStaticParams = () => routing.locales.map(locale => ({ locale }));

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const locale = await getLocale();

    setRequestLocale(locale);

    const theme = createTheme({
        primaryColor: 'blue',
        breakpoints: {
            xs: '36rem',
            sm: '48rem',
            md: '64rem',
            lg: '90rem',
            xl: '160rem',
        },
        autoContrast: true,
        activeClassName: 'active',
        fontFamily: ddin.style.fontFamily,
        headings: {
            fontFamily: ddincon.style.fontFamily,
        },
    });

    return (
        <ViewTransitions>
            <html lang={locale} {...mantineHtmlProps} className={clsx('html', ddin.className)}>
                <head>
                    <ColorSchemeScript defaultColorScheme="auto" />
                </head>
                <body className="body">
                    <MantineProvider theme={theme} defaultColorScheme="auto">
                        <NavigationProgress />
                        <NextIntlClientProvider>
                            <main className="main-container">
                                <Navigation />
                                {children}
                            </main>
                        </NextIntlClientProvider>
                    </MantineProvider>
                </body>
            </html>
        </ViewTransitions>
    );
};

export default RootLayout;

export { generateStaticParams, viewport, metadata };
