// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

import { Badge, Button, Card, Group, SimpleGrid, Text, Title } from '@mantine/core';

import { launch, Launch } from '@/lib/api/launches.graphql';
import getData from '@/lib/getData';

export const metadata: Metadata = {
    title: 'Launches',
    description: 'SpaceX launches, including mission details, rocket information, and links to articles, videos, and Wikipedia.',
};

export default async function LaunchesPage() {
    const t = await getTranslations('launches');
    const data: Launch[] = await getData({ query: launch, variables: { limit: 10 }, key: 'launchesPast' });

    return (
        <>
            <Title order={1} mb="lg">
                {t('launchesTitle')}
            </Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing={{ base: 10, sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
                {data.map(launch => (
                    <Card shadow="sm" padding="xl" component="div" key={launch.id}>
                        <Text fw={500} size="lg" mt="md">
                            {launch.mission_name}
                        </Text>
                        <Text mt="xs" size="sm">
                            {launch.rocket.rocket_name}
                        </Text>
                        <Text size="sm">{new Date(launch.launch_date_utc).toLocaleDateString()}</Text>
                        <Group>
                            status{' '}
                            {launch.launch_success !== null ? (
                                launch.launch_success ? (
                                    <Badge variant="light" color="lime">
                                        {t('successful')}
                                    </Badge>
                                ) : (
                                    <Badge variant="light" color="red">
                                        {t('failed')}
                                    </Badge>
                                )
                            ) : null}
                        </Group>
                        <Text size="sm">{new Date(launch.launch_date_utc).toLocaleDateString()}</Text>
                        <Group>
                            {launch.links.mission_patch && (
                                <Image
                                    src={launch.links.mission_patch}
                                    alt={`${launch.mission_name} patch`}
                                    width={100}
                                    height={100}
                                    style={{ maxWidth: '100px' }}
                                />
                            )}
                        </Group>
                        <Text>{launch.details ? launch.details : t('noDetails')}</Text>
                        <Group>
                            {launch.links.article_link && (
                                <Button component="a" href={launch.links.article_link} target="_blank" rel="noopener noreferrer">
                                    {t('article')}
                                </Button>
                            )}

                            {launch.links.video_link && (
                                <Button component="a" href={launch.links.video_link} target="_blank" rel="noopener noreferrer">
                                    {t('video')}
                                </Button>
                            )}

                            {launch.links.wikipedia && (
                                <Button component="a" href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                                    {t('wikipedia')}
                                </Button>
                            )}
                        </Group>
                    </Card>
                ))}
            </SimpleGrid>
        </>
    );
}
