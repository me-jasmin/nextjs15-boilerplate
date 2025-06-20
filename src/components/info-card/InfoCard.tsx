import { Paper, Stack, Text } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { TablerIconProps } from '@/components/tabler-icon';

import classes from '@/components/info-card/info-card.module.scss';

type InfoCardProps = {
    value: string | number;
    label: string;
    icon: TablerIconProps['icon'];
};

const InfoCard = ({ value, label, icon }: InfoCardProps) => {
    return (
        <Paper className={classes.stat} radius="md" shadow="md" p="xs">
            <TablerIcon className={classes.icon} icon={icon} size={36} stroke={1.5} />
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
export type { InfoCardProps };
