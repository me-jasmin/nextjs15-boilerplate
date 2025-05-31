'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Menu, UnstyledButton } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import classes from '@/components/navigation/navigation.module.scss';

const LanguageSwitcher = () => {
    const t = useTranslations('languageSwitcher');
    const pathname = usePathname();
    const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

    const languageOptions = [
        { locale: 'en', label: t('en') },
        { locale: 'de', label: t('de') },
    ];

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
                <UnstyledButton className={classes.link} variant="subtle" color="gray">
                    {t('label')}{' '}
                    <TablerIcon name="chevron-down" size={14} stroke={1.5} />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                {languageOptions.map(option => (
                    <Menu.Item component={Link} key={option.locale} href={`/${option.locale}/${pathnameWithoutLocale}`}>
                        {option.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default LanguageSwitcher;
