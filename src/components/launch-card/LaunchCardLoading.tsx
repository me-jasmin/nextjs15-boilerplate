import clsx from 'clsx';

import { Flex, Group, Skeleton, Stack } from '@mantine/core';

import { IconRocket } from '@tabler/icons-react';

import type { FC } from 'react';

import classes from '@components/launch-card/launch-card.module.scss';

const LaunchCardLoading: FC = () => (
    <Flex className={clsx(classes['launch-card'])}>
        <div className={classes['launch-card__image-placeholder']}>
            <IconRocket stroke={1.5} size={150} opacity={0.5} />
        </div>
        <Stack gap={0} p="lg" flex={1}>
            <Stack gap={0} mb="md">
                <Group gap="xs" mb="md" align="center">
                    <Skeleton width={30} height={10} radius="sm" opacity={0.5} />
                    <Skeleton width={70} height={20} radius="sm" opacity={0.5} />
                    <Skeleton width={50} height={10} radius="sm" opacity={0.5} ml="auto" />
                </Group>
                <Skeleton width="30%" height={16} radius="sm" opacity={0.5} mb="xs" />
                <Skeleton width={60} height={8} radius="sm" opacity={0.5} />
            </Stack>
            <Skeleton width={80} height={8} radius="sm" opacity={0.5} mb="xl" />
            <Skeleton width={100} height={8} radius="sm" opacity={0.5} mb="xs" />
            <Skeleton width="100%" height={36} radius="sm" opacity={0.5} mb="md" />
        </Stack>
    </Flex>
);

export default LaunchCardLoading;
