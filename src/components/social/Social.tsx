import { use, useMemo } from 'react';

import { IconBrandFlickr, IconBrandX, IconGlobe } from '@tabler/icons-react';

import { Button, Group } from '@mantine/core';

import type { AboutTypes } from '@/lib/api';
import type { IconProps } from '@tabler/icons-react';
import type { FC, ReactElement } from 'react';

const Social: FC<{ asyncData: Promise<AboutTypes> }> = ({ asyncData }) => {
    const data: AboutTypes = use(asyncData);

    const linksMeta = useMemo(
        () =>
            [
                { name: 'SpaceX', url: data.links.website, icon: <IconGlobe size={16} stroke={1.5} /> },
                { name: 'Twitter', url: data.links.twitter, icon: <IconBrandX size={16} stroke={1.5} /> },
                { name: 'Flickr', url: data.links.flickr, icon: <IconBrandFlickr size={16} stroke={1.5} /> },
                { name: 'Twitter Elon Musk', url: data.links.elon_twitter, icon: <IconBrandX size={16} stroke={1.5} /> },
            ] as { name: string; url: string; icon: ReactElement<IconProps> }[],
        [data.links.elon_twitter, data.links.flickr, data.links.twitter, data.links.website]
    );

    const links = linksMeta.map(({ name, url, icon }) => (
        <Button key={name} leftSection={icon} href={url} rel="noopener noreferrer" target="_blank" component="a" variant="light" size="xs">
            {name}
        </Button>
    ));

    return <Group gap="xs">{links}</Group>;
};

export default Social;
