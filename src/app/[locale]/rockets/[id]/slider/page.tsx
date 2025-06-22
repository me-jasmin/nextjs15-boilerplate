import { use } from 'react';

import { getTranslations, setRequestLocale } from 'next-intl/server';

import RocketSlider from '@/components/rocket-slider';

import { rockets } from '@/lib/api';
import apiClient from '@/lib/api/client';

import type { Locale } from 'next-intl';

const generateMetadata = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'rockets.meta' });

    return {
        title: t('title'),
        description: t('description'),
    };
};

const Rockets: FC<{ params: Promise<{ locale: Locale; id: string }> }> = ({ params }) => {
    const { locale, id } = use(params);
    const data: RocketTypes[] = use(apiClient({ query: rockets, key: 'rockets' }));
    console.log('Rockets data:', data);
    setRequestLocale(locale);

    return <RocketSlider data={data} locale={locale} id={id}></RocketSlider>;
};

export default Rockets;

export { generateMetadata };
