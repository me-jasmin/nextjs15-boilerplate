import { Skeleton } from '@mantine/core';

import type { FC } from 'react';

const DetailsLoading: FC = () => (
    <>
        <Skeleton width="100%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="90%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="85%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="80%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="85%" height={10} radius="sm" opacity={0.5} mb="xs" />
    </>
);

export default DetailsLoading;
