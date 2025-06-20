import { Skeleton } from '@mantine/core';

const IntroLoading = () => (
    <>
        <Skeleton width="95%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="90%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="85%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="30%" height={10} radius="sm" opacity={0.5} mb="lg" />
        <Skeleton width="15%" height={10} radius="sm" opacity={0.5} mb="xs" />
        <Skeleton width="35%" height={8} radius="sm" opacity={0.5} mb="xs" />
    </>
);

export default IntroLoading;
