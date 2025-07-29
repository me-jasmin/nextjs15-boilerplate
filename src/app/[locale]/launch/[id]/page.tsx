import { getTranslations } from 'next-intl/server';

import { launches } from '@/lib/api';
import apiClient from '@/lib/api/client';

import { routing } from '@/i18n/routing';

import type { LaunchTypes } from '@/lib/api';
import type { Locale } from 'next-intl';

const generateStaticParams = async () => {
    const data: LaunchTypes[] = await apiClient({ query: launches, key: 'launchesPast' });
    const ids = data.map(launch => launch.id);

    return routing.locales.flatMap(locale => ids.map(id => ({ locale, id })));
};

const generateMetadata = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'launches.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
};

export { default } from '@/components/pages/launch';

export { generateStaticParams, generateMetadata };
