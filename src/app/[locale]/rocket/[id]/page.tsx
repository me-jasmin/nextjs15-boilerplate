// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { getTranslations } from 'next-intl/server';

import { Badge, Card, Group, SimpleGrid, Text } from '@mantine/core';

import { rocket } from '@/lib/api';
import apiClient from '@/lib/api/client';

import type { RocketTypes } from '@/lib/api';

export default async function RocketsPage({ params }: { params: Promise<{ id: string }> }) {
    const t = await getTranslations('rockets');
    const { id } = await params;
    console.log('Rocket ID:', id);
    const data: RocketTypes[] = await apiClient({ query: rocket, variables: { id }, key: 'rocket' });

    return (
        <>
            <h1>{t('rocketsTitle')}</h1>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing={{ base: 10, sm: 'xl' }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
                <Card shadow="sm" padding="xl" component="div" key={data.id}>
                    <Text fw={500} size="lg" mt="md">
                        {data.name}
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.company}
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.type}
                    </Text>
                    <Group>
                        {data.active !== null ? (
                            data.active ? (
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
                        {data.stages}
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.boosters}
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.description}
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.height.meters} m
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.diameter.meters} m
                    </Text>
                    <Text mt="xs" size="sm">
                        {data.mass.kg} kg
                    </Text>

                    <div style={{ marginBottom: '1rem' }}>
                        <div>
                            <span>{t('firstFlight')}</span>
                            <span>{data.first_flight}</span>
                        </div>

                        <div>
                            <span>{t('country')}</span>
                            <span>{data.country}</span>
                        </div>
                        <div>
                            <span>{t('country')}</span>
                            <span>{data.company}</span>
                        </div>

                        <div>
                            <span>{t('successRate')}</span>
                            <span>{data.success_rate_pct}%</span>
                        </div>

                        <div>
                            <span>{t('costPerLaunch')}</span>
                            <span>${(data.cost_per_launch / 1000000).toFixed(1)}M</span>
                        </div>
                    </div>

                    <a href={data.wikipedia} target="_blank" rel="noopener noreferrer">
                        {t('readMoreWikipedia')} →
                    </a>
                </Card>
            </SimpleGrid>
        </>
    );
}
