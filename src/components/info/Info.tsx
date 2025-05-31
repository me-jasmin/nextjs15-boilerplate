import { use, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { SimpleGrid } from '@mantine/core';

import InfoCard from '@/components/info-card';

import type { InfoCardProps } from '@/components/info-card';
import type { CompanyInfo } from '@/lib/api/companyInfo.graphql';

export const infoLayout = {
    cols: { base: 2, sm: 3, md: 6, lg: 4 },
    spacing: { base: 'md' },
};

const Info = ({ asyncData }: { asyncData: Promise<CompanyInfo> }) => {
    const t = useTranslations('about');
    const data: CompanyInfo = use(asyncData);

    const infoMeta = useMemo(
        () =>
            [
                { value: data.founder, label: 'Founder', icon: 'universe' },
                { value: data.founded, label: t('founded'), icon: 'calendar-time' },
                { value: `${data.employees / 1000}K`, label: t('employees'), icon: 'users' },
                { value: `${data.valuation / 1000000000}B`, label: t('valuation'), icon: 'cash-banknote' },
                { value: data.test_sites, label: 'Test Sites', icon: 'sparkles' },
                { value: data.launch_sites, label: 'Launch Sites', icon: 'world-upload' },
                { value: data.vehicles, label: 'Vehicles', icon: 'ufo' },
            ] as InfoCardProps[],
        [data.employees, data.founded, data.founder, data.launch_sites, data.test_sites, data.valuation, data.vehicles, t]
    );

    const info = useMemo(() => infoMeta.map(({ value, label, icon }) => <InfoCard key={label} {...{ value, label, icon }} />), [infoMeta]);

    return <SimpleGrid {...infoLayout}>{info}</SimpleGrid>;
};

export default Info;
