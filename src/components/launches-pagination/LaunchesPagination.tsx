'use client';

// import { Link } from 'next-view-transitions';
import { redirect, RedirectType } from 'next/navigation';

import { Pagination } from '@mantine/core';

import type { Locale } from 'next-intl';

type LaunchesPaginationProps = {
    totalPages: number;
    currentPage: number;
    locale: Locale;
    limit: number;
    sort: string;
    order: string;
};

const LaunchesPagination = ({ totalPages, currentPage, locale, limit, sort, order }: LaunchesPaginationProps) => {
    return (
        <Pagination
            mt="xl"
            size="md"
            total={totalPages}
            value={currentPage}
            onChange={page => redirect(`/${locale}/launches/${limit}/${(page - 1) * limit}/${sort}/${order}`, RedirectType.push)}
        />
    );

    /*   return (
        <Pagination
            mt="xl"
            size="md"
            total={totalPages}
            value={currentPage}
            getItemProps={page => ({
                component: Link,
                href: `/${locale}/launches/${limit}/${(page - 1) * limit}/${sort}/${order}`,
            })}
        />
    ); */
};

export default LaunchesPagination;
export type { LaunchesPaginationProps };
