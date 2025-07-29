import { use, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { SimpleGrid } from '@mantine/core';

import InfoCard from '@/components/info-card';

import { IconBrandSpeedtest, IconCalendarShare, IconRulerMeasure, IconWeight } from '@tabler/icons-react';

import type { InfoCardProps } from '@/components/info-card';
import type { RoadsterTypes } from '@/lib/api';
import type { FC } from 'react';

const roadsterStatsLayoutSettings = {
    cols: { base: 2, xs: 3, sm: 4 },
    spacing: 'md',
};

const RoadsterStats: FC<{ asyncData: Promise<RoadsterTypes> }> = ({ asyncData }) => {
    const t = useTranslations('roadster.stats');
    const data: RoadsterTypes = use(asyncData);

    const roadsterStatsMeta = useMemo(
        () =>
            [
                {
                    value: new Date(data.launch_date_utc).toLocaleDateString(),
                    label: t('launchDate'),
                    icon: <IconCalendarShare />,
                },
                { value: (data.period_days / 365).toFixed(2), label: t('yearsInSpace'), icon: <IconCalendarShare /> },
                { value: `${(data.earth_distance_km / 1000000).toFixed(2)}M km/h`, label: t('distanceFromEarth'), icon: <IconRulerMeasure /> },
                { value: `${(data.mars_distance_km / 1000000).toFixed(2)}M km/h`, label: t('distanceFromMars'), icon: <IconRulerMeasure /> },
                { value: `${data.speed_kph.toFixed(2)}km/h`, label: t('currentSpeed'), icon: <IconBrandSpeedtest /> },
                { value: `${data.launch_mass_kg}kg`, label: t('mass'), icon: <IconWeight /> },
            ] as InfoCardProps[],
        [data.earth_distance_km, data.launch_date_utc, data.launch_mass_kg, data.mars_distance_km, data.period_days, data.speed_kph, t]
    );

    const roadsterStats = useMemo(() => roadsterStatsMeta.map(({ value, label, icon }) => <InfoCard key={label} {...{ value, label, icon }} />), [roadsterStatsMeta]);

    return <SimpleGrid {...roadsterStatsLayoutSettings}>{roadsterStats}</SimpleGrid>;
};

export default RoadsterStats;
export { roadsterStatsLayoutSettings };
