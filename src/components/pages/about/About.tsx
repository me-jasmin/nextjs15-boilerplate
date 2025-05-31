import { Suspense, use } from 'react';

import clsx from 'clsx';

import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Divider, Space, Title } from '@mantine/core';

import Info, { InfoLoading } from '@/components/info';
import Intro, { IntroLoading } from '@/components/intro';
import Management, { ManagementLoading } from '@/components/management';
import Social, { SocialLoading } from '@/components/social';

import { companyInfo } from '@/lib/api/companyInfo.graphql';
import getData from '@/lib/getData';

import type { CompanyInfo } from '@/lib/api/companyInfo.graphql';
import type { Locale } from 'next-intl';

type AboutProps = {
    params: Promise<{ locale: Locale }>;
};

const About = ({ params }: AboutProps) => {
    const { locale } = use(params);

    const t = useTranslations('about');
    const data: Promise<CompanyInfo> = getData({ query: companyInfo, key: 'company' });

    setRequestLocale(locale);

    return (
        <>
            <Title order={1} mb="md">
                {t('title')}
            </Title>
            <Suspense fallback={<IntroLoading />}>
                <Intro asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={2} fw={600} mb="md">
                Management
            </Title>
            <Suspense fallback={<ManagementLoading />}>
                <Management asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={3} fw={600} mb="md">
                Info
            </Title>
            <Suspense fallback={<InfoLoading />}>
                <Info asyncData={data} />
            </Suspense>
            <Space h="xl" />
            <Divider my="xs" opacity={0.3} />
            <Space h="xl" />
            <Title order={3} fw={600} mb="md">
                Social
            </Title>
            <Suspense fallback={<SocialLoading />}>
                <Social asyncData={data} />
            </Suspense>
        </>
    );
};

export default About;
