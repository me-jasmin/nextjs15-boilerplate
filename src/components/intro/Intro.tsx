import { use } from 'react';

import { Text } from '@mantine/core';

import type { AboutTypes } from '@/lib/api';

const Intro = ({ asyncData }: { asyncData: Promise<AboutTypes> }) => {
    const data: AboutTypes = use(asyncData);

    return (
        <>
            <Text size="md" mb="md">
                {data.summary}
            </Text>
            <Text c="blue" size="sm" mt="sm" fw={700}>
                {data.name}
            </Text>
            <Text size="xs">
                {data.headquarters.address}, {data.headquarters.city}, {data.headquarters.state}
            </Text>
        </>
    );
};

export default Intro;
