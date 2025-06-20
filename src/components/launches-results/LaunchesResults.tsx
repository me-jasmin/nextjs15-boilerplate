'use client';

import { use, useMemo, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { SimpleGrid } from '@mantine/core';

import LaunchCard from '@/components/launch-card';

import type { LaunchTypes } from '@/lib/api';
import type { FC } from 'react';

const launchesResultsLayoutSettings = {
    cols: { base: 1, sm: 2, lg: 3 },
    spacing: 'lg',
};

const LaunchesResults: FC<{ asyncData: Promise<LaunchTypes[]> }> = ({ asyncData }) => {
    const data: LaunchTypes[] = use(asyncData);
    const container = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    gsap.registerPlugin(useGSAP);

    useGSAP(
        () => {
            tl.current = gsap.timeline().from('[data-animated]', {
                opacity: 0,
                stagger: 0.1,
                y: 20,
                duration: 0.3,
                ease: 'power4.inOut',
            });
        },
        { scope: container }
    );

    const launchs = useMemo(() => data.map((launch: LaunchTypes) => <LaunchCard data-animated key={launch.launch_date_utc} {...launch} />), [data]);

    return (
        <SimpleGrid {...launchesResultsLayoutSettings} ref={container}>
            {launchs}
        </SimpleGrid>
    );
};

export default LaunchesResults;
export { launchesResultsLayoutSettings };
