'use client';

import { useMemo, useState } from 'react';

import { useQueryState } from 'nuqs';
import { Mousewheel, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Badge, Button, Divider, Group, Space, Text, Title } from '@mantine/core';

import Modal from '@/components/modal';

import type { RocketTypes } from '@/lib/api';
import type { Locale } from 'next-intl';
import type { FC } from 'react';
import type { Swiper as SwiperTypes } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';

import classes from '@components/rocket-slider/rocket-slider.module.scss';

const RocketSlider: FC<{ data: RocketTypes[]; locale: Locale; id: string }> = ({ data, locale, id }) => {
    const t = useTranslations('rockets');
    const ids = data.map(rocket => rocket.id);
    const searchParams = useSearchParams();
    const [open, setOpen] = useQueryState('modal', { defaultValue: '' });
    const [currentId, setCurrentId] = useState(id);

    const handleSlideChange = (swiper: SwiperTypes) => {
        window.history.pushState({ ...searchParams }, '', `/${locale}/rockets/${ids[swiper.realIndex]}`);
        setCurrentId(ids[swiper.realIndex]);
    };

    const currentIdData = useMemo(() => data?.find(rocket => rocket.id === currentId), [data, currentId]);

    const images = {
        falcon1: '/images/falcon-1.webp',
        falcon9: '/images/falcon-9.webp',
        falconheavy: '/images/falcon-heavy.webp',
        starship: '/images/starship.webp',
    };

    return (
        <>
            <Modal data={currentIdData} currentId={currentId} opened={!!open} onClose={() => setOpen('')} />
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
                className={classes.slider}
            >
                {data.map(rocket => (
                    <SwiperSlide key={rocket.name} className={classes['slider__slide']}>
                        <div className={classes['slider__slide__content']}>
                            <Text size="md" mb={-18} fw={500}>
                                {rocket.company}
                            </Text>
                            <Group>
                                <Title fw={500} size={96}>
                                    {rocket.name}
                                </Title>
                                {rocket.active !== null ? (
                                    rocket.active ? (
                                        <Badge variant="light" color="lime" size="xl">
                                            {t('active')}
                                        </Badge>
                                    ) : (
                                        <Badge variant="light" color="grey" size="xl">
                                            {t('inactive')}
                                        </Badge>
                                    )
                                ) : null}
                            </Group>
                            <Text mt="xs" size="sm">
                                {rocket.description}
                            </Text>
                            <Space h="xl" />
                            <Divider my="xs" opacity={0.3} />
                            <Space h="xl" />
                            <Group gap="xs">
                                <Button onClick={() => setOpen('open')} variant="light" size="xs">
                                    More Details
                                </Button>
                                {rocket.wikipedia && (
                                    <Button href={rocket.wikipedia} target="_blank" rel="noopener noreferrer" component={Link} variant="light" size="xs">
                                        {t('readMoreWikipedia')}
                                    </Button>
                                )}
                            </Group>
                        </div>
                        <div className={classes['slider__slide__image']}>
                            <Image src={images[rocket?.name?.toLowerCase().replaceAll(' ', '') as keyof typeof images]} alt={rocket.name} fill sizes="100vw" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default RocketSlider;
