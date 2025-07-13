'use client';

import { useMemo } from 'react';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Accordion, AccordionControl, Group, Menu, Stack, UnstyledButton } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { FC } from 'react';

import classes from '@/components/navigation/navigation.module.scss';
import navigationClasses from '@/components/navigation/navigation.module.scss';

const LanguageSwitcher: FC<{ mobile?: boolean }> = ({ mobile = false }) => {
    const t = useTranslations('languageSwitcher');
    const pathname = usePathname();
    const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

    const languageMeta = useMemo(
        () => [
            { locale: 'en', label: t('en') },
            { locale: 'de', label: t('de') },
        ],
        [t]
    );

    const launguages = useMemo(
        () =>
            languageMeta.map(({ locale, label }) => {
                if (mobile) {
                    return (
                        <UnstyledButton className={navigationClasses['navigation__link']} component={Link} key={locale} href={`/${locale}/${pathnameWithoutLocale}`}>
                            {label}
                        </UnstyledButton>
                    );
                } else {
                    return (
                        <Menu.Item component={Link} key={locale} href={`/${locale}/${pathnameWithoutLocale}`}>
                            {label}
                        </Menu.Item>
                    );
                }
            }),
        [languageMeta, mobile, pathnameWithoutLocale]
    );

    if (mobile) {
        return (
            <Accordion data-animated unstyled chevron={null}>
                <Accordion.Item value="language-switcher">
                    <AccordionControl className={navigationClasses['navigation__link']} component={UnstyledButton} chevron={null}>
                        <Group gap="xs">
                            Language
                            <TablerIcon icon="chevron-down" size={36} stroke={2} />
                        </Group>
                    </AccordionControl>
                    <Accordion.Panel>
                        <Stack gap={0}>{launguages}</Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        );
    }

    return (
        <Menu
            transitionProps={{ transition: 'skew-up', duration: 100, exitDuration: 0 }}
            position="bottom-end"
            trigger="click-hover"
            withinPortal
            withArrow
            offset={{ mainAxis: -5, crossAxis: -15 }}
            width={120}
        >
            <Menu.Target>
                <UnstyledButton className={classes['navigation__link']} variant="subtle" color="gray">
                    {t('label')} <TablerIcon icon="chevron-down" size={14} stroke={1.5} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{launguages}</Menu.Dropdown>
        </Menu>
    );
};

export default LanguageSwitcher;
