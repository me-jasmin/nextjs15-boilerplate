import clsx from 'clsx';

import { Paper, Skeleton, Stack } from '@mantine/core';

import classes from '@/components/info-card/info-card.module.scss';

const InfoCardLoading = () => (
    <Paper className={clsx(classes['stat-loading'])} radius="md" shadow="md" p="xs">
        <Skeleton height={40} circle opacity={0.2} />
        <Stack justify="flex-start" align="flex-start" gap={0}>
            <Skeleton width="75%" height={12} radius="sm" opacity={0.2} mb="xs" />
            <Skeleton width="50%" height={10} radius="sm" opacity={0.2} />
        </Stack>
    </Paper>
);

export default InfoCardLoading;
