import { Group, Skeleton } from '@mantine/core';

const LaunchesPaginationLoading = () => (
    <Group gap="xs" mt="xl">
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Group gap={2}>
            <Skeleton width={5} height={5} radius="xl" opacity={0.5} />
            <Skeleton width={5} height={5} radius="xl" opacity={0.5} />
            <Skeleton width={5} height={5} radius="xl" opacity={0.5} />
        </Group>
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
        <Skeleton width={32} height={32} radius="sm" opacity={0.5} />
    </Group>
);

export default LaunchesPaginationLoading;
