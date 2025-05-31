import { Group, Skeleton, Stack } from '@mantine/core';

const PeopleLoading = () => (
    <Group gap="sm">
        <Skeleton height={40} circle opacity={0.2} />
        <Stack align="flex-start" justify="flex-start" gap={0}>
            <Skeleton width="75px" height={15} radius="sm" opacity={0.2} mb="xs" />
            <Skeleton width="20px" height={10} radius="sm" opacity={0.2} />
        </Stack>
    </Group>
);

export default PeopleLoading;
