import { SimpleGrid } from '@mantine/core';

import { managementLayoutSettings } from '@/components/management/Management';
import { PeopleLoading } from '@/components/people';

import type { FC } from 'react';

const ManagementLoading: FC = () => (
    <SimpleGrid {...managementLayoutSettings}>
        <PeopleLoading />
        <PeopleLoading />
        <PeopleLoading />
        <PeopleLoading />
    </SimpleGrid>
);

export default ManagementLoading;
