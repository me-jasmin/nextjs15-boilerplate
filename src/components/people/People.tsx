import { Avatar, Group, Stack, Text } from '@mantine/core';

type PeopleProps = {
    name: string;
    title: string;
    avatar: string;
};

const People = ({ name, title, avatar }: PeopleProps) => {
    return (
        <Group gap="sm">
            <Avatar size={40} src={avatar} radius={40} alt={name} />
            <Stack align="flex-start" justify="flex-start" gap={0}>
                <Text fz="md" fw={500}>
                    {name}
                </Text>
                <Text c="blue" fz="sm" fw={500}>
                    {title}
                </Text>
            </Stack>
        </Group>
    );
};

export default People;
export type { PeopleProps };
