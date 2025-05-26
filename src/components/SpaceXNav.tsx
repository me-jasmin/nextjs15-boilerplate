'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SpaceX from '@/images/SpaceX';
import { Burger, Button, Container, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

import classes from './navigation.module.scss';

export default function SpaceXNav() {
    const [opened, { toggle }] = useDisclosure(false);
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const locale = pathname.split('/')[1];

    const isActive = (path: string) => path === pathname;

    const links = [
        { link: `/${locale}`, label: t('home') },
        { link: `/${locale}/launches`, label: t('launches') },
        { link: `/${locale}/rockets`, label: t('rockets') },
    ];
    const items = links.map(link => {
        return (
            <Button
                className={clsx(classes.link, { [classes.active]: isActive(link.link) })}
                component={Link}
                href={isActive(link.link) ? '' : link.link}
                variant="subtle"
                color="gray"
                key={link.label}
                prefetch={!isActive(link.link)}
            >
                {link.label}
            </Button>
        );
    });

    return (
        <nav className={classes.header}>
            <Container fluid>
                <div className={classes.inner}>
                    <SpaceX className={classes.logo} />
                    <Group gap={0} visibleFrom="sm">
                        {items}
                        <LanguageSwitcher />
                        <ThemeSwitcher />
                    </Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </nav>
    );
}
