// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { getTranslations } from 'next-intl/server';



import { Badge, Card, Group, SimpleGrid, Text } from '@mantine/core';



import { Rocket, rocket } from '@/lib/api/rockets.graphql';
import getData from '@/lib/getData';





export default async function RocketsPage() {
    const t = await getTranslations('rockets');
    const data: Rocket[] = await getData({ query: rocket, key: 'rockets' });

    return (
        <>
            <h1>{t('rocketsTitle')}</h1>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing={{ base: 10, sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
                {data.map(rocket => (
                    <Card shadow="sm" padding="xl" component="div" key={rocket.id}>
                        <Text fw={500} size="lg" mt="md">
                            {rocket.name}
                        </Text>
                        <Text mt="xs" size="sm">
                            {rocket.company}
                        </Text>
                        <Group>
                            {rocket.active !== null ? (
                                rocket.active ? (
                                    <Badge variant="light" color="lime">
                                        {t('active')}
                                    </Badge>
                                ) : (
                                    <Badge variant="light" color="grey">
                                        {t('inactive')}
                                    </Badge>
                                )
                            ) : null}
                        </Group>
                        <Text mt="xs" size="sm">
                            {rocket.description}
                        </Text>

                        <div style={{ marginBottom: '1rem' }}>
                            <div>
                                <span>{t('firstFlight')}</span>
                                <span>{rocket.first_flight}</span>
                            </div>

                            <div>
                                <span>{t('country')}</span>
                                <span>{rocket.country}</span>
                            </div>

                            <div>
                                <span>{t('successRate')}</span>
                                <span>{rocket.success_rate_pct}%</span>
                            </div>

                            <div>
                                <span>{t('costPerLaunch')}</span>
                                <span>${(rocket.cost_per_launch / 1000000).toFixed(1)}M</span>
                            </div>
                        </div>

                        <a href={rocket.wikipedia} target="_blank" rel="noopener noreferrer">
                            {t('readMoreWikipedia')} →
                        </a>
                    </Card>
                ))}
            </SimpleGrid>
        </>
    );
}