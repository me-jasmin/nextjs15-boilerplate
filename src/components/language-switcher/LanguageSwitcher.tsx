'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Accordion, AccordionControl, Group, Menu, Stack, UnstyledButton } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import classes from '@/components/navigation/navigation.module.scss';
import navigationClasses from '@/components/navigation/navigation.module.scss';

const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => {
    const t = useTranslations('languageSwitcher');
    const pathname = usePathname();
    const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

    const languageOptions = [
        { locale: 'en', label: t('en') },
        { locale: 'de', label: t('de') },
    ];

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
                        <Stack gap={0}>
                            {languageOptions.map(({ locale, label }) => (
                                <UnstyledButton
                                    className={navigationClasses['navigation__link']}
                                    component={Link}
                                    key={locale}
                                    href={`/${locale}/${pathnameWithoutLocale}`}
                                >
                                    {label}
                                </UnstyledButton>
                            ))}
                        </Stack>
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
            <Menu.Dropdown>
                {languageOptions.map(({ locale, label }) => (
                    <Menu.Item component={Link} key={locale} href={`/${locale}/${pathnameWithoutLocale}`}>
                        {label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default LanguageSwitcher;
