import { use } from 'react';

import { Text } from '@mantine/core';

import type { RoadsterTypes } from '@/lib/api';

const Details = ({ asyncData }: { asyncData: Promise<RoadsterTypes> }) => {
    const data: RoadsterTypes = use(asyncData);

    return (
        <Text size="md" mb="md">
            {data.details}
        </Text>
    );
};

export default Details;
