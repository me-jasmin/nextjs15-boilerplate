import { motion } from 'motion/react';

import { Paper, Stack, Text } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { TablerIconProps } from '@/components/tabler-icon';

import classes from '@/components/info-card/info-card.module.scss';

export type InfoCardProps = {
    value: string | number;
    label: string;
    icon: TablerIconProps['name'];
};

const InfoCard = ({ value, label, icon }: InfoCardProps) => {
    return (
        <Paper component={motion.div} className={classes.stat} radius="md" shadow="md" p="xs">
            <TablerIcon className={classes.icon} name={icon} size={36} stroke={1.5} />
            <Stack justify="flex-start" align="flex-start" gap={0}>
                <Text className={classes.label} fz="xs">
                    {label}
                </Text>
                <Text className={classes.value} fz="md">
                    {value}
                </Text>
            </Stack>
        </Paper>
    );
};

export default InfoCard;
