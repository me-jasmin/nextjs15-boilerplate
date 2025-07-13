import clsx from 'clsx';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Anchor, Badge, Button, Flex, Group, Stack, Text } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { LaunchTypes } from '@/lib/api';
import type { FC } from 'react';

import classes from '@components/launch-card/launch-card.module.scss';

type LaunchCardProps = LaunchTypes & { className?: string };

const LaunchCard: FC<LaunchCardProps> = ({
    id,
    launch_date_utc: launchDateUtc,
    launch_site: launchSite,
    launch_success: launchSuccess,
    links,
    rocket,
    mission_name: missionName,
    className,
    ...rest
}) => {
    const t = useTranslations('launches');
    const locale = useLocale();

    return (
        <Flex className={clsx(classes['launch-card'], className)} key={launchDateUtc} {...rest}>
            {links.flickr_images && links.flickr_images.length > 0 ? (
                <div className={classes['launch-card__image']} style={{ backgroundImage: `url(${links.flickr_images[0]})` }}></div>
            ) : (
                <div className={classes['launch-card__image-placeholder']}>
                    <TablerIcon icon="rocket" stroke={1.5} size={150} />
                </div>
            )}
            <Stack gap={0} p="lg" flex={1}>
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
                    <Anchor component={Link} size="sm" mb="md" href={`/${locale}/rockets/${rocket.rocket.id}`} prefetch>
                        <Group component="span" gap={5} align="center">
                            <TablerIcon icon="rocket" stroke={1.5} size={16} />
                            {rocket.rocket_name}
                        </Group>
                    </Anchor>
                </Stack>
                <Text size="sm" fw={800} mt="auto" mb="xs">
                    {t('quickLinks')}
                </Text>
                <Button component={Link} href={`/${locale}/launch/${id}`} variant="light" size="xs" mt="xs">
                    More Details
                </Button>
            </Stack>
        </Flex>
    );
};

export default LaunchCard;
export type { LaunchCardProps };
