'use client';

import { useEffect } from 'react';

import { NavigationProgress as NavigationProgressMantine, nprogress } from '@mantine/nprogress';

import { usePathname } from 'next/navigation';

import type { FC } from 'react';

import classes from '@components/navigation-progress/navigation-progress.module.scss';

const NavigationProgress: FC = () => {
    const pathname = usePathname();

    useEffect(() => {
        nprogress.complete();

        return () => nprogress.start();
    }, [pathname]);

    return <NavigationProgressMantine className={classes['navigation-progress']} withinPortal={false} size={2} aria-label="navigation progress bar" />;
};

export default NavigationProgress;
