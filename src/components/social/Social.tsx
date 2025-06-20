import { use, useMemo } from 'react';

import { Button, Group } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { TablerIconProps } from '@/components/tabler-icon';
import type { AboutTypes } from '@/lib/api';
import type { FC } from 'react';

const Social: FC<{ asyncData: Promise<AboutTypes> }> = ({ asyncData }) => {
    const data: AboutTypes = use(asyncData);

    const linksMeta = useMemo(
        () =>
            [
                { name: 'SpaceX', url: data.links.website, icon: 'globe' },
                { name: 'Twitter', url: data.links.twitter, icon: 'brand-x' },
                { name: 'Flickr', url: data.links.flickr, icon: 'brand-flickr' },
                { name: 'Twitter Elon Musk', url: data.links.elon_twitter, icon: 'brand-x' },
            ] as { name: string; url: string; icon: TablerIconProps['icon'] }[],
        [data.links.elon_twitter, data.links.flickr, data.links.twitter, data.links.website]
    );

    const links = linksMeta.map(({ name, url, icon }) => (
        <Button
            key={name}
            leftSection={<TablerIcon icon={icon} size={16} stroke={1.5} />}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            component="a"
            variant="light"
            size="xs"
        >
            {name}
        </Button>
    ));

    return <Group gap="xs">{links}</Group>;
};

export default Social;
