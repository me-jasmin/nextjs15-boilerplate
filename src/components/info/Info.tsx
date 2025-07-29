import { use, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { SimpleGrid } from '@mantine/core';

import InfoCard from '@/components/info-card';

import { IconCalendarTime, IconCashBanknote, IconSparkles, IconUfo, IconUniverse, IconUsers, IconWorldUpload } from '@tabler/icons-react';

import type { InfoCardProps } from '@/components/info-card';
import type { AboutTypes } from '@/lib/api';

const infoLayoutSettings = {
    cols: { base: 2, xs: 3, sm: 4 },
    spacing: 'md',
};

const Info = ({ asyncData }: { asyncData: Promise<AboutTypes> }) => {
    const t = useTranslations('about.info');
    const data: AboutTypes = use(asyncData);

    const infoMeta = useMemo(
        () =>
            [
                { value: data.founder, label: t('founder'), icon: <IconUniverse /> },
                { value: data.founded, label: t('founded'), icon: <IconCalendarTime /> },
                { value: `${data.employees / 1000}K`, label: t('employees'), icon: <IconUsers /> },
                { value: `${data.valuation / 1000000000}B`, label: t('valuation'), icon: <IconCashBanknote /> },
                { value: data.test_sites, label: t('testSites'), icon: <IconSparkles /> },
                { value: data.launch_sites, label: t('launchSites'), icon: <IconWorldUpload /> },
                { value: data.vehicles, label: t('vehicles'), icon: <IconUfo /> },
            ] as InfoCardProps[],
        [data.employees, data.founded, data.founder, data.launch_sites, data.test_sites, data.valuation, data.vehicles, t]
    );

    const info = useMemo(() => infoMeta.map(({ value, label, icon }) => <InfoCard key={label} {...{ value, label, icon }} />), [infoMeta]);

    return <SimpleGrid {...infoLayoutSettings}>{info}</SimpleGrid>;
};

export default Info;
export { infoLayoutSettings };
