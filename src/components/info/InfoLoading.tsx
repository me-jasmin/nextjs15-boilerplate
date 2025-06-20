import { SimpleGrid } from '@mantine/core';

import { infoLayoutSettings } from '@/components/info';
import { InfoCardLoading } from '@/components/info-card';

const InfoLoading = () => (
    <SimpleGrid {...infoLayoutSettings}>
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
