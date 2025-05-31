import { ReactNode } from 'react';

import { notFound } from 'next/navigation';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider } from '@mantine/core';

import Navigation from '@/components/navigation/Navigation';

import { routing } from '@/i18n/routing';

type Props = {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
};

const generateStaticParams = () => routing.locales.map(locale => ({ locale }));

const LocaleLayout = async ({ children, params }: Props) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const theme = createTheme({
        primaryColor: 'blue',
        breakpoints: {
            xs: '24em',
            sm: '36em',
            md: '48em',
            lg: '62em',
            xl: '75em',
        },
        autoContrast: true,
        activeClassName: 'active',
        fontFamily: 'd-dinregular',
        headings: {
            fontFamily: 'd-dindin-bold',
        },
    });

    return (
        <html lang={locale} {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript defaultColorScheme="auto" />
            </head>
            <body className="body">
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <NextIntlClientProvider>
                        <main className="main-container">
                            <Navigation />
                            {children}
                        </main>
                    </NextIntlClientProvider>
                </MantineProvider>
            </body>
        </html>
    );
};

export default LocaleLayout;
export { generateStaticParams };
