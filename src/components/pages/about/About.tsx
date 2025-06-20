import { Suspense, use } from 'react';

import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Divider, Space, Title } from '@mantine/core';

import Info, { InfoLoading } from '@/components/info';
import Intro, { IntroLoading } from '@/components/intro';
import Management, { ManagementLoading } from '@/components/management';
import Social, { SocialLoading } from '@/components/social';

import { about } from '@/lib/api';
import apiClient from '@/lib/api/client/apiClient';

import type { AboutTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';

const About: FC<{ params: Promise<{ locale: Locale }> }> = ({ params }) => {
    const t = useTranslations('about.titles');
    const { locale } = use(params);
    const data: Promise<AboutTypes> = apiClient({ query: about, key: 'company' });

    setRequestLocale(locale);

    return (
        <>
            <Title order={1} mb="md">
                {t('intro')}
            </Title>
            <Suspense fallback={<IntroLoading />}>
                <Intro asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={2} fw={600} mb="md">
                {t('management')}
            </Title>
            <Suspense fallback={<ManagementLoading />}>
                <Management asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={3} fw={600} mb="md">
                {t('info')}
            </Title>
            <Suspense fallback={<InfoLoading />}>
                <Info asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={3} fw={600} mb="md">
                {t('social')}
            </Title>
            <Suspense fallback={<SocialLoading />}>
                <Social asyncData={data} />
            </Suspense>
        </>
    );
};

export default About;
