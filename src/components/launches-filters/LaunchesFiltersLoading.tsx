import { Group, Skeleton, Stack } from '@mantine/core';

import type { FC } from 'react';

const LaunchesFiltersLoading: FC = () => (
    <Group gap="sm" mt="xl">
        <Stack gap={2}>
            <Skeleton width="30%" height={16} radius="sm" opacity={0.5} mb="xs" />
            <Skeleton width={150} height={42} radius="sm" opacity={0.5} />
        </Stack>
        <Stack gap={2}>
            <Skeleton width="75%" height={16} radius="sm" opacity={0.5} mb="xs" />
            <Skeleton width={150} height={42} radius="sm" opacity={0.5} />
        </Stack>
        <Stack gap={2}>
            <Skeleton width="45%" height={16} radius="sm" opacity={0.5} mb="xs" />
            <Skeleton width={150} height={42} radius="sm" opacity={0.5} />
        </Stack>
    </Group>
);

export default LaunchesFiltersLoading;
