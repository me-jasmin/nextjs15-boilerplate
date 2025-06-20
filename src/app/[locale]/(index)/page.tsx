import { getTranslations } from 'next-intl/server';

import type { Locale } from 'next-intl';

const generateMetadata = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
};

export { default } from '@/components/pages/about';

export { generateMetadata };
