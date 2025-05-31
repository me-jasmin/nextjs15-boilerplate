import { Group, Skeleton } from '@mantine/core';

const SocialLoading = () => {
    return (
        <Group gap="xs">
            <Skeleton width="110px" height={36} radius="sm" opacity={0.2} mb="md" />
            <Skeleton width="110px" height={36} radius="sm" opacity={0.2} mb="md" />
            <Skeleton width="100px" height={36} radius="sm" opacity={0.2} mb="md" />
            <Skeleton width="180px" height={36} radius="sm" opacity={0.2} mb="md" />
        </Group>
    );
};

export default SocialLoading;
