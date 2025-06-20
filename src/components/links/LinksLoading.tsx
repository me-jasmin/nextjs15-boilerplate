import { Group, Skeleton } from '@mantine/core';

import type { FC } from 'react';

const LinksLoading: FC = () => (
    <Group gap="xs">
        <Skeleton width="110px" height={36} radius="sm" opacity={0.5} mb="md" />
    </Group>
);

export default LinksLoading;
