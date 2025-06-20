'use client';

import { use, useMemo } from 'react';

import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Badge, Card, Group, Text } from '@mantine/core';

import type { RocketTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';
import type { Swiper as SwiperTypes } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';

const RocketSlider: FC<{ asyncData: Promise<RocketTypes[]>; locale: Locale; id: string }> = ({ asyncData, locale, id }) => {
    const t = useTranslations('rockets');
    const data: RocketTypes[] = use(asyncData);
    const ids = useMemo(() => data.map(rocket => rocket.id), [data]);

    const handleSlideChange = (swiper: SwiperTypes) => window.history.pushState({}, '', `/${locale}/rockets/${ids[swiper.realIndex]}`);

    return (
        <Swiper
            onSlideChange={handleSlideChange}
            modules={[Mousewheel, Pagination]}
            initialSlide={ids.indexOf(id)}
            pagination={{ clickable: true }}
            direction={'vertical'}
            mousewheel={true}
            autoHeight={true}
            slidesPerView={1}
            spaceBetween={0}
            style={{ height: 'auto', width: 'auto', flex: 1 }}
        >
            {data.map(rocket => (
                <SwiperSlide key={rocket.name}>
                    <Card shadow="sm" padding="xl" component="div">
                        <Link href={`/${locale}/rockets/5e9d0d95eda69973a809d1ec/modal`}>Open Modal</Link>
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
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default RocketSlider;
