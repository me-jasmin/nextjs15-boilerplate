import { SimpleGrid } from '@mantine/core';

import { infoLayout } from '@/components/info';
import { InfoCardLoading } from '@/components/info-card';

const InfoLoading = () => (
    <SimpleGrid {...infoLayout}>
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
        <InfoCardLoading />
    </SimpleGrid>
);

export default InfoLoading;
