import { use, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { SimpleGrid } from '@mantine/core';

import People from '@/components/people';

import type { AboutTypes } from '@/lib/api';
import type { FC } from 'react';

const managementLayoutSettings = {
    cols: { base: 2, xs: 3 },
    spacing: 'md',
};

const Management: FC<{ asyncData: Promise<AboutTypes> }> = ({ asyncData }) => {
    const t = useTranslations('about.management');
    const data: AboutTypes = use(asyncData);

    const managementMeta = useMemo(
        () => [
            { name: data.ceo, title: t('ceo'), avatar: '/images/elon-musk_cropped.webp' },
            { name: data.coo, title: t('coo'), avatar: '/images/gwynne-shotwell_cropped.webp' },
            { name: data.cto, title: t('cto'), avatar: '/images/elon-musk_cropped.webp' },
            { name: data.cto_propulsion, title: t('ctoPropulsion'), avatar: '/images/tom-mueller_cropped.webp' },
        ],
        [data.ceo, data.coo, data.cto, data.cto_propulsion, t]
    );

    const management = useMemo(() => managementMeta.map(({ name, title, avatar }) => <People key={title} {...{ name, title, avatar }} />), [managementMeta]);

    return <SimpleGrid {...managementLayoutSettings}>{management}</SimpleGrid>;
};

export default Management;
export { managementLayoutSettings };
