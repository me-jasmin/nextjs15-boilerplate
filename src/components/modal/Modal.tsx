import { useRef } from 'react';

import { IconArrowAutofitHeight, IconArrowAutofitWidth, IconFlag, IconMeteor, IconProgressCheck, IconRocket, IconSettingsDollar, IconStars, IconWeight } from '@tabler/icons-react';

import { useTranslations } from 'next-intl';

import { Badge, Group, Modal as MantineModal, SimpleGrid, Text } from '@mantine/core';

import InfoCard from '@/components/info-card';

import { RocketTypes } from '@/lib/api';

import type { ModalBaseProps } from '@mantine/core';
import type { FC } from 'react';

type ModalProps = Pick<ModalBaseProps, 'opened' | 'onClose'> & {
    data: RocketTypes | undefined;
    currentId: string;
};

const Modal: FC<ModalProps> = ({ data, opened, onClose }) => {
    const t = useTranslations('rockets');
    const ref = useRef<HTMLDivElement>(null);

    if (!data) return null;

    return (
        <MantineModal
            ref={ref}
            opened={opened}
            onClose={onClose}
            overlayProps={{ opacity: 0.5, blur: 50 }}
            size="md"
            centered
            transitionProps={{
                transition: 'pop',
                duration: 200,
            }}
            title={
                <Group gap="sm">
                    <Text size="xl">{data.name}</Text>
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
            }
        >
            <SimpleGrid cols={2} spacing="md">
                {data.country !== undefined && <InfoCard value={data.country} label={t('country')} icon={<IconFlag />} />}
                {data.first_flight !== undefined && <InfoCard value={data.first_flight} label={t('firstFlight')} icon={<IconRocket />} />}
                {data.success_rate_pct !== undefined && <InfoCard value={`${data.success_rate_pct}%`} label={t('successRate')} icon={<IconProgressCheck />} />}
                {data.cost_per_launch !== undefined && <InfoCard value={`${(data.cost_per_launch / 1000000).toFixed(1)}M`} label={t('costPerLaunch')} icon={<IconSettingsDollar />} />}
                {data.stages !== undefined && <InfoCard value={data.stages} label={t('stages')} icon={<IconStars />} />}
                {data.boosters !== undefined && <InfoCard value={data.boosters} label={t('boosters')} icon={<IconMeteor />} />}
                {data.height.meters !== undefined && <InfoCard value={`${data.height.meters}m`} label={t('height')} icon={<IconArrowAutofitHeight />} />}
                {data.diameter.meters !== undefined && <InfoCard value={`${data.diameter.meters}m`} label={t('diameter')} icon={<IconArrowAutofitWidth />} />}
                {data.mass.kg !== undefined && <InfoCard value={`${data.mass.kg / 1000}T`} label={t('mass')} icon={<IconWeight />} />}
            </SimpleGrid>
        </MantineModal>
    );
};

export default Modal;
