import { Suspense, use, useMemo } from 'react';

import { redirect, RedirectType } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Title } from '@mantine/core';

import LaunchesFilters, { LaunchesFiltersLoading } from '@/components/launches-filters';
import LaunchesPagination, { LaunchesPaginationLoading } from '@/components/launches-pagination';
import LaunchesResults, { LaunchesResultsLoading } from '@/components/launches-results';

import { launches } from '@/lib/api';
import apiClient from '@/lib/api/client';

import type { LaunchTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';

const TOTAL_LAUNCHES = 190;
const LIMITS = [10, 20, 50];
const SORTS = ['launch_year', 'launch_success', 'launch_site'];
const ORDERS = ['asc', 'desc'];
const DEFAULT_SLUGS = ['10', '0', 'launch_year', 'desc'];

const Launches: FC<{ params: Promise<{ locale: Locale; slug: string[] }> }> = ({ params }) => {
    const t = useTranslations('launches');
    const { locale, slug } = use(params);

    const hasAllSlugs = slug && slug.length === 4;
    const isMissingSlugsValues = slug.some((value: string | undefined) => value === 'undefined' || value === undefined);

    if (!hasAllSlugs) {
        redirect(`/${locale}/launches/${DEFAULT_SLUGS.join('/')}`, RedirectType.push);
    } else if (hasAllSlugs && isMissingSlugsValues) {
        const updatedSlugsWithValues = slug.map((value: string, index: number) => {
            if (value === 'undefined' || value === undefined) {
                return DEFAULT_SLUGS[index];
            } else {
                return value;
            }
        });

        redirect(`/${locale}/launches/${updatedSlugsWithValues.join('/')}`, RedirectType.push);
    }

    const slugs: { limit: number; offset: number; sort: string; order: string } = useMemo(
        () => ({
            limit: parseInt(slug[0] || DEFAULT_SLUGS[0]),
            offset: parseInt(slug[1] || DEFAULT_SLUGS[1]),
            sort: slug[2] || DEFAULT_SLUGS[2],
            order: slug[3] || DEFAULT_SLUGS[3],
        }),
        [slug]
    );

    const { limit, offset, sort, order } = slugs;

    const data: Promise<LaunchTypes[]> = apiClient({
        query: launches,
        variables: { limit, offset, sort, order },
        key: 'launchesPast',
    });

    setRequestLocale(locale);

    return (
        <>
            <Title order={1} mb="lg">
                {t('title')}
            </Title>
            <Suspense fallback={<LaunchesFiltersLoading />}>
                <LaunchesFilters defaultValues={{ limit, offset, sort, order }} />
            </Suspense>
            <Suspense fallback={<LaunchesResultsLoading />}>
                <LaunchesResults asyncData={data} />
            </Suspense>
            <Suspense fallback={<LaunchesPaginationLoading />}>
                <LaunchesPagination
                    totalPages={Math.ceil(TOTAL_LAUNCHES / limit)}
                    currentPage={Math.floor(offset / limit) + 1}
                    limit={limit}
                    sort={sort}
                    order={order}
                />
            </Suspense>
        </>
    );
};

export default Launches;
export { TOTAL_LAUNCHES, LIMITS, SORTS, ORDERS, DEFAULT_SLUGS };
