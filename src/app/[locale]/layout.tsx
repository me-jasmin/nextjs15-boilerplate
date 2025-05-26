import { ReactNode } from 'react';

import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { ColorSchemeScript, createTheme, MantineColorsTuple, mantineHtmlProps, MantineProvider } from '@mantine/core';

import SpaceXNav from '@/components/SpaceXNav';

import { routing } from '@/i18n/routing';



type Props = {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const myColor: MantineColorsTuple = [
        '#effde7',
        '#e1f8d4',
        '#c3efab',
        '#a2e67e',
        '#87de58',
        '#75d93f',
        '#6bd731',
        '#59be23',
        '#4da91b',
        '#3d920d',
    ];

    const theme = createTheme({
        primaryColor: 'myColor',
        autoContrast: true,
        activeClassName: '',
        colors: {
            myColor,
        },
    });

    return (
        <html lang={locale} {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
            </head>
            <body className="body">
                <NextIntlClientProvider>
                    <MantineProvider theme={theme} defaultColorScheme="auto">
                        <SpaceXNav />
                        {children}
                    </MantineProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
