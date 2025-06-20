'use client';

import { SimpleGrid } from '@mantine/core';

import { LaunchCardLoading } from '@/components/launch-card';
import { launchesResultsLayoutSettings } from '@/components/launches-results';

import type { FC } from 'react';

const LaunchesResultsLoading: FC = () => {
    const items = Array.from({ length: 8 }, (_, index) => <LaunchCardLoading key={`${index}-skeleton-launch-card-loading`} />);

    return <SimpleGrid {...launchesResultsLayoutSettings}>{items}</SimpleGrid>;
};

export default LaunchesResultsLoading;
