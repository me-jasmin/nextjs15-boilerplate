import { use } from 'react';

import { Button } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { RoadsterTypes } from '@/lib/api';

const Links = ({ asyncData }: { asyncData: Promise<RoadsterTypes> }) => {
    const data: RoadsterTypes = use(asyncData);

    return (
        <Button
            leftSection={<TablerIcon icon="brand-wikipedia" size={16} stroke={1.5} />}
            href={data.wikipedia}
            rel="noopener noreferrer"
            target="_blank"
            component="a"
            variant="light"
            size="xs"
        >
            SpaceX
        </Button>
    );
};

export default Links;
