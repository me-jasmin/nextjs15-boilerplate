import { SimpleGrid } from '@mantine/core';

import { InfoCardLoading } from '@/components/info-card';
import { roadsterStatsLayoutSettings } from '@/components/roadster-stats/RoadsterStats';

import type { FC } from 'react';

const RoadsterStatsLoading: FC = () => (
    <SimpleGrid {...roadsterStatsLayoutSettings}>
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
    </SimpleGrid>
);

export default RoadsterStatsLoading;
