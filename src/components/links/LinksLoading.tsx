import { Group, Skeleton } from '@mantine/core';

const LinksLoading = () => (
    <Group gap="xs">
        <Skeleton width="110px" height={36} radius="sm" opacity={0.5} mb="md" />
    </Group>
);

export default LinksLoading;
