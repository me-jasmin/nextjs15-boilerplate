import { Suspense, use } from 'react';

import { setRequestLocale } from 'next-intl/server';

import LaunchStats from '@/components/launch-stats';

import { launch } from '@/lib/api';
import apiClient from '@/lib/api/client';

import type { LaunchTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';

const Launch: FC<{ params: Promise<{ locale: Locale; id: string }> }> = ({ params }) => {
    const { id, locale } = use(params);
    const data: Promise<LaunchTypes> = apiClient({ query: launch, variables: { launchId: id }, key: 'launch' });

    setRequestLocale(locale);

    return (
        <Suspense fallback={null}>
            <LaunchStats locale={locale} asyncData={data} />;
        </Suspense>
    );
};

export default Launch;
