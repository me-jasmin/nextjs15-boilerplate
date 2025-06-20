import { SimpleGrid } from '@mantine/core';

import { managementLayoutSettings } from '@/components/management/Management';
import { PeopleLoading } from '@/components/people';

const ManagementLoading = () => (
    <>
        <SimpleGrid {...managementLayoutSettings}>
            <PeopleLoading />
            <PeopleLoading />
            <PeopleLoading />
            <PeopleLoading />
        </SimpleGrid>
    </>
);

export default ManagementLoading;
