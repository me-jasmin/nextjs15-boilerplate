import { use } from 'react';



import { Button, Group } from '@mantine/core';



import TablerIcon from '@/components/tabler-icon';



import type { CompanyInfo } from '@/lib/api/companyInfo.graphql';





const Social = ({ asyncData }: { asyncData: Promise<CompanyInfo> }) => {
    const data: CompanyInfo = use(asyncData);

    return (
        <>
            <Group gap="xs">
                <Button
                    leftSection={<TablerIcon name="brand-wikipedia" size={20} stroke={1.5} />}
                    href={data.links.website}
                    rel="noopener noreferrer"
                    target="_blank"
                    component="a"
                    color="blue"
                    variant="filled"
                    size="sm"
                >
                    SpaceX
                </Button>
                <Button
                    leftSection={<TablerIcon name="brand-x" size={20} stroke={1.5} />}
                    href={data.links.twitter}
                    rel="noopener noreferrer"
                    target="_blank"
                    component="a"
                    color="blue"
                    variant="filled"
                    size="sm"
                >
                    Twitter
                </Button>
                <Button
                    leftSection={<TablerIcon name="brand-flickr" size={20} stroke={1.5} />}
                    href={data.links.flickr}
                    rel="noopener noreferrer"
                    target="_blank"
                    component="a"
                    color="blue"
                    variant="filled"
                    size="sm"
                >
                    Flickr
                </Button>
                <Button
                    leftSection={<TablerIcon name="brand-x" size={20} stroke={1.5} />}
                    href={data.links.elon_twitter}
                    rel="noopener noreferrer"
                    target="_blank"
                    component="a"
                    color="blue"
                    variant="filled"
                    size="sm"
                >
                    Twitter Elon Musk
                </Button>
            </Group>
        </>
    );
};

export default Social;