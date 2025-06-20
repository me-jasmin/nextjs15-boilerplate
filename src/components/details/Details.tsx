import { use } from 'react';

import { Text } from '@mantine/core';

import type { RoadsterTypes } from '@/lib/api';
import type { FC } from 'react';

const Details: FC<{ asyncData: Promise<RoadsterTypes> }> = ({ asyncData }) => {
    const data: RoadsterTypes = use(asyncData);

    return (
        <Text size="md" mb="md">
            {data.details}
        </Text>
    );
};

export default Details;
