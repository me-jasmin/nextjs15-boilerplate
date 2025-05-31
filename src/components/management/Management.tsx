import { use, useMemo } from 'react';

import { useTranslations } from 'next-intl';

import { SimpleGrid } from '@mantine/core';

import People from '@/components/people';

import type { CompanyInfo } from '@/lib/api/companyInfo.graphql';

export const managementLayout = {
    cols: { base: 1, xs: 2, sm: 3, md: 4, lg: 3 },
    spacing: { base: 'md' },
};

const Management = ({ asyncData }: { asyncData: Promise<CompanyInfo> }) => {
    const t = useTranslations('about');
    const data: CompanyInfo = use(asyncData);

    const managementMeta = useMemo(
        () => [
            { name: data.ceo, title: t('ceo'), avatar: '/images/elon-musk_cropped.webp' },
            { name: data.coo, title: t('coo'), avatar: '/images/gwynne-shotwell_cropped.webp' },
            { name: data.cto, title: t('cto'), avatar: '/images/elon-musk_cropped.webp' },
            { name: data.cto_propulsion, title: 'CTO Propulsion', avatar: '/images/tom-mueller_cropped.webp' },
        ],
        [data.ceo, data.coo, data.cto, data.cto_propulsion, t]
    );

    const management = useMemo(
        () => managementMeta.map(({ name, title, avatar }) => <People key={title} {...{ name, title, avatar }} />),
        [managementMeta]
    );

    return <SimpleGrid {...managementLayout}>{management}</SimpleGrid>;
};

export default Management;
