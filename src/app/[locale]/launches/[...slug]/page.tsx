import { LIMITS, ORDERS, SORTS, TOTAL_LAUNCHES } from '@components/pages/launches/Launches';

import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import type { Locale } from 'next-intl';

const generateStaticParams = () =>
    routing.locales.flatMap(locale =>
        LIMITS.flatMap(limit => {
            const totalPages = Math.ceil(TOTAL_LAUNCHES / limit);

            return Array.from({ length: totalPages }, (_, page) => page * limit).flatMap(offset =>
                SORTS.flatMap(sort =>
                    ORDERS.map(order => ({
                        locale,
                        slug: [String(limit), String(offset), sort, order],
                    }))
                )
            );
        })
    );

const generateMetadata = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'launches.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
};

export { default } from '@/components/pages/launches';

export { generateStaticParams, generateMetadata };
