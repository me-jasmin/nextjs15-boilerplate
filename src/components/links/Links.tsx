import { use } from 'react';

import { IconBrandWikipedia } from '@tabler/icons-react';

import { Button } from '@mantine/core';

import type { RoadsterTypes } from '@/lib/api';
import type { FC } from 'react';

const Links: FC<{ asyncData: Promise<RoadsterTypes> }> = ({ asyncData }) => {
    const data: RoadsterTypes = use(asyncData);

    return (
        <Button leftSection={<IconBrandWikipedia size={16} stroke={1.5} />} href={data.wikipedia} rel="noopener noreferrer" target="_blank" component="a" variant="light" size="xs">
            SpaceX
        </Button>
    );
};

export default Links;
