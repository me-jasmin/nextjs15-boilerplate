'use client';

import { use, useEffect, useRef, useState } from 'react';

import { IconRocket } from '@tabler/icons-react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { Locale, useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Anchor, Badge, Button, Group, Modal as MantineModal, SimpleGrid, Stack, Text } from '@mantine/core';

import Lightbox from '@/components/lightbox/Lightbox';

import { useDisclosure, useMounted } from '@mantine/hooks';

import { launch } from '@/lib/api';
import apiClient from '@/lib/api/client';

import type { LaunchTypes } from '@/lib/api';
import type { FC } from 'react';

const Modal: FC<{ params: Promise<{ locale: Locale; id: string }> }> = ({ params }) => {
    const t = useTranslations('launches');
    const { locale, id } = use(params);
    const {
        details,
        launch_date_utc: launchDateUtc,
        launch_site: launchSite,
        launch_success: launchSuccess,
        links,
        rocket,
        mission_name: missionName,
    }: LaunchTypes = use(apiClient({ query: launch, variables: { launchId: id }, key: 'launch' }));

    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);
    const mounted = useMounted();
    const [openedOnce, setOpenedOnce] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!opened && mounted && !openedOnce) {
            open();
            setOpenedOnce(true);
        }
    }, [mounted, open, opened, openedOnce]);

    const handleClose = () => {
        if (opened && mounted && openedOnce) {
            close();
            const timeout = setTimeout(() => {
                router.back();
            }, 500);
            return () => clearTimeout(timeout);
        }
    };
    return (
        <>
            <div>modal loaded</div>
            <MantineModal
                ref={ref}
                opened={opened}
                onClose={handleClose}
                overlayProps={{ opacity: 0.55, blur: 3 }}
                size="md"
                centered
                transitionProps={{
                    transition: 'skew-up',
                    duration: 500,
                }}
                title={'Launch Details'}
            >
                <>
                    <Stack gap={0} mb="md">
                        <Group gap="xs" mb="md" align="center">
                            <Text size="xs" fw={800}>
                                {t('status')}
                            </Text>
                            {launchSuccess !== null ? (
                                launchSuccess ? (
                                    <Badge variant="light" color="lime">
                                        {t('successful')}
                                    </Badge>
                                ) : (
                                    <Badge variant="light" color="red">
                                        {t('failed')}
                                    </Badge>
                                )
                            ) : (
                                <Badge variant="light" color="gray">
                                    {t('unknown')}
                                </Badge>
                            )}
                            <Text size="sm" ml="auto">
                                {new Date(launchDateUtc).toLocaleDateString()}
                            </Text>
                        </Group>
                        <Text fw={700} size="xl">
                            {missionName}
                        </Text>
                        <Text size="sm">
                            {t('launchSite')}: {launchSite?.site_name || t('unknown')}
                        </Text>
                    </Stack>
                    <Anchor component={Link} size="sm" mb="md" href={`/${locale}/rockets/${rocket.rocket.id}`} prefetch>
                        <Group component="span" gap={5} align="center">
                            <IconRocket stroke={1.5} size={16} />
                            {rocket.rocket_name}
                        </Group>
                    </Anchor>
                    <Text mb="md">{details ? details : t('noDetails')}</Text>
                    <Text size="sm" fw={800} mt="auto" mb="xs">
                        {t('quickLinks')}
                    </Text>
                    <Group gap="xs" mb="md">
                        {links.article_link && (
                            <Button href={links.article_link} target="_blank" rel="noopener noreferrer" component={Link} variant="light" size="xs">
                                {t('article')}
                            </Button>
                        )}
                        {links.mission_patch && (
                            <Button href={links.mission_patch} target="_blank" rel="noopener noreferrer" component={Link} variant="light" size="xs">
                                {t('missionPatch')}
                            </Button>
                        )}
                        {links.video_link && (
                            <Button href={links.video_link} target="_blank" rel="noopener noreferrer" component={Link} variant="light" size="xs">
                                {t('video')}
                            </Button>
                        )}
                        {links.wikipedia && (
                            <Button href={links.wikipedia} target="_blank" rel="noopener noreferrer" component={Link} variant="light" size="xs">
                                {t('wikipedia')}
                            </Button>
                        )}
                    </Group>
                    <Text size="sm" fw={800} mt="auto" mb="xs">
                        {t('images')}
                    </Text>
                    {links.flickr_images && (
                        <Lightbox Wrapper={SimpleGrid} wrapperProps={{ cols: 4 }}>
                            {links.flickr_images.map(image => (
                                <a href={image} key={image} data-fancybox="gallery">
                                    <Image src={image} alt={image} width={500} height={500} style={{ width: '100%', height: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                                </a>
                            ))}
                        </Lightbox>
                    )}
                </>
            </MantineModal>{' '}
        </>
    );
};

export default Modal;
