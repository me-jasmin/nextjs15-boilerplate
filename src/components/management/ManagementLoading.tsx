import { SimpleGrid } from '@mantine/core';

import { managementLayout } from '@/components/management/Management';
import { PeopleLoading } from '@/components/people';

const ManagementLoading = () => {
    return (
        <>
            <SimpleGrid {...managementLayout}>
                <PeopleLoading />
                <PeopleLoading />
                <PeopleLoading />
                <PeopleLoading />
            </SimpleGrid>
        </>
    );
};

export default ManagementLoading;
