import { Suspense, use } from 'react';

import { setRequestLocale } from 'next-intl/server';

import RocketSlider from '@/components/rocket-slider';

import { rockets } from '@/lib/api';
import apiClient from '@/lib/api/client/apiClient';

import type { RocketTypes } from '@/lib/api';
import type { Locale } from 'next-intl';

const Rockets = ({ params }: { params: Promise<{ locale: Locale; id: string }> }) => {
    const { locale, id } = use(params);
    // const t = useTranslations('rockets');
    const data: Promise<RocketTypes[]> = apiClient({ query: rockets, key: 'rockets' });

    console.log('Rockets data:', id);

    setRequestLocale(locale);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <RocketSlider asyncData={data} locale={locale} id={id}></RocketSlider>
            </Suspense>
        </>
    );
};

export default Rockets;
