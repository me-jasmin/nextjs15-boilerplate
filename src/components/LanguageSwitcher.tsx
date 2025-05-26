'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

import classes from './navigation.module.scss';

const LanguageSwitcher = () => {
    const t = useTranslations('LanguageSwitcher');
    const pathname = usePathname();
    const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');

    const languageOptions = [
        { locale: 'en', label: t('en') },
        { locale: 'de', label: t('de') },
    ];

    return (
        <Menu position="bottom-end" offset={8} withArrow trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
                <Button className={classes.link} variant="subtle" color="gray" rightSection={<IconChevronDown size={14} stroke={1.5} />}>
                    {t('label')}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {languageOptions.map(option => (
                    <Menu.Item component={Link} key={option.locale} href={`/${option.locale}/${pathnameWithoutLocale}`} className={classes.link}>
                        {option.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default LanguageSwitcher;
