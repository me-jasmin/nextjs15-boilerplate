'use client';

import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Badge, Card, Group, Text } from '@mantine/core';

import type { RocketTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';
import type { Swiper as SwiperTypes } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';

const RocketSlider: FC<{ data: RocketTypes[]; locale: Locale; id: string }> = ({ data, locale, id }) => {
    const t = useTranslations('rockets');
    const ids = data.map(rocket => rocket.id);
    const router = useRouter();

    const handleSlideChange = (swiper: SwiperTypes) => {
        //console.log('Slide changed to index:', `/${locale}/rockets/${ids[swiper.realIndex]}`);
        //window.history.pushState({}, '', `/${locale}/rockets/${ids[swiper.realIndex]}`);
        const newPath = `/${locale}/rockets/${ids[swiper.realIndex]}`;
        router.push(newPath, { scroll: false });
    };

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
                <SwiperSlide key={rocket.name} style={{ padding: '150px' }}>
                    <Card shadow="sm" padding="xl" component="div">
                        <Link href={`/${locale}/rockets/${rocket.id}/modal`}>{`/${locale}/rockets/${rocket.id}/modal`}</Link>
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
