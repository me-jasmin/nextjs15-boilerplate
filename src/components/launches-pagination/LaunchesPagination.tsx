'use client';

import { redirect, RedirectType } from 'next/navigation';
import { useLocale } from 'next-intl';

import { Pagination } from '@mantine/core';

import type { FC } from 'react';

type LaunchesPaginationProps = {
    totalPages: number;
    currentPage: number;
    limit: number;
    sort: string;
    order: string;
};

const LaunchesPagination: FC<LaunchesPaginationProps> = ({ totalPages, currentPage, limit, sort, order }) => {
    const locale = useLocale();

    return (
        <Pagination
            mt="xl"
            size="md"
            total={totalPages}
            value={currentPage}
            onChange={page => redirect(`/${locale}/launches/${limit}/${(page - 1) * limit}/${sort}/${order}`, RedirectType.push)}
            getControlProps={control => ({
                'aria-label': control === 'first' ? 'First pages' : control === 'next' ? 'Next page' : control === 'previous' ? 'Previous page' : 'Last page',
            })}
            getItemProps={page => ({ 'aria-label': `Page ${page}` })}
        />
    );
};

export default LaunchesPagination;
export type { LaunchesPaginationProps };
