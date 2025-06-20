'use client';

import { useForm } from '@mantine/form';

import { redirect, RedirectType } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Group, Select } from '@mantine/core';

import type { ComboboxData } from '@mantine/core';
import type { FC } from 'react';

type LaunchesFiltersProps = {
    order: string;
    limit: number;
    offset: number;
    sort: string;
};

type FilterMeta = {
    key: string;
    label: string;
    data: ComboboxData;
};

const LaunchesFilters: FC<{ defaultValues: LaunchesFiltersProps }> = ({ defaultValues }) => {
    const t = useTranslations('launches.filters');
    const locale = useLocale();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            limit: defaultValues.limit.toString(),
            sort: defaultValues.sort.toString(),
            order: defaultValues.order.toString(),
        },

        onValuesChange: ({ limit, sort, order }) => {
            redirect(`/${locale}/launches/${limit}/${defaultValues.offset}/${sort}/${order}`, RedirectType.push);
        },
    });

    const filtersMeta: FilterMeta[] = [
        {
            key: 'sort',
            label: 'Sort by:',
            data: [
                { value: 'launch_year', label: t('launchYear') },
                { value: 'launch_success', label: t('launchSuccess') },
                { value: 'launch_site', label: t('launchSite') },
            ],
        },
        {
            key: 'limit',
            label: `${t('launchesPerPage')}:`,
            data: ['10', '20', '50'],
        },
        {
            key: 'order',
            label: `${t('orderBy')}:`,
            data: [
                { value: 'asc', label: t('acending') },
                { value: 'desc', label: t('descending') },
            ],
        },
    ];

    const filters = filtersMeta.map(({ key, label, data }: FilterMeta) => (
        <Select
            size="md"
            label={label}
            pointer={true}
            clearable={false}
            withAsterisk={false}
            allowDeselect={false}
            withCheckIcon={false}
            style={{ width: '150px' }}
            data={data}
            key={form.key(key)}
            {...form.getInputProps(key)}
            comboboxProps={{
                withinPortal: true,
                position: 'bottom-end',
                withArrow: true,
                transitionProps: { transition: 'skew-up', duration: 100, exitDuration: 0 },
            }}
        />
    ));

    return (
        <Group gap="sm" component="form" mb="lg" align="flex-end">
            {filters}
        </Group>
    );
};

export default LaunchesFilters;
export type { LaunchesFiltersProps };
