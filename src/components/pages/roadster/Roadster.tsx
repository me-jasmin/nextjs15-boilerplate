import { Suspense, use } from 'react';

import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Divider, Space, Title } from '@mantine/core';

import Details, { DetailsLoading } from '@/components/details';
import Links, { LinksLoading } from '@/components/links';
import RoadsterStats from '@/components/roadster-stats/RoadsterStats';
import RoadsterStatsLoading from '@/components/roadster-stats/RoadsterStatsLoading';

import { roadster } from '@/lib/api';
import apiClient from '@/lib/api/client/apiClient';

import type { RoadsterTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';

const Roadster: FC<{ params: Promise<{ locale: Locale }> }> = ({ params }) => {
    const t = useTranslations('roadster.titles');
    const { locale } = use(params);
    const data: Promise<RoadsterTypes> = apiClient({ query: roadster, key: 'roadster' });

    setRequestLocale(locale);

    return (
        <>
            <Title order={1} mb="md">
                {t('intro')}
            </Title>
            <Suspense fallback={<DetailsLoading />}>
                <Details asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={3} mb="md">
                {t('stats')}
            </Title>
            <Suspense fallback={<RoadsterStatsLoading />}>
                <RoadsterStats asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={3} mb="md">
                {t('readMore')}
            </Title>
            <Suspense fallback={<LinksLoading />}>
                <Links asyncData={data} />
            </Suspense>
        </>
    );
};

export default Roadster;
