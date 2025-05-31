'use client';

import { useEffect } from 'react';

import clsx from 'clsx';
// import { motion, useAnimate } from 'motion/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Burger, Group, Stack, UnstyledButton } from '@mantine/core';

import LanguageSwitcher from '@/components/language-switcher';
import Logo from '@/components/logo';
import ThemeSwitcher from '@/components/theme-switcher';

import { useDisclosure, useWindowScroll } from '@mantine/hooks';

import classes from '@/components/navigation/navigation.module.scss';

export function useWindowEvent<K extends string>(
    type: K,
    listener: K extends keyof WindowEventMap ? (this: Window, ev: WindowEventMap[K]) => void : (this: Window, ev: CustomEvent) => void,
    options?: boolean | AddEventListenerOptions
) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const typedListener = listener as EventListener;

        window.addEventListener(type, typedListener, options);
        return () => window.removeEventListener(type, typedListener, options);
    }, [type, listener, options]);
}

export default function Navigation() {
    const [opened, { toggle }] = useDisclosure(false);
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const [scroll] = useWindowScroll();

    const locale = pathname.split('/')[1];
    const isActive = (path: string) => path === pathname;
    const isPinned = scroll.y > 0;

    useEffect(() => {
        if (opened) {
            document.documentElement.classList.add('navigation-opened');
        } else {
            document.documentElement.classList.remove('navigation-opened');
        }
    }, [opened]);

    /* const variants = {
        initial: {
            transition: {
                staggerChildren: 0.3,
                staggerDirection: -1,
            },
        },
        visible: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.3,
                staggerDirection: 1,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeInOut' },
        },
    }; */

    const links = [
        { link: `/${locale}`, label: t('about') },
        { link: `/${locale}/launches`, label: t('launches') },
        { link: `/${locale}/rockets`, label: t('rockets') },
    ];

    // const control = useAnimate();

    const items = links.map(link => {
        return (
            <UnstyledButton
                key={link.label}
                component={Link}
                href={isActive(link.link) ? '' : link.link}
                prefetch
                className={clsx('link', classes.link, { [classes.active]: isActive(link.link) })}
                color="gray"
                variant="subtle"
            >
                {/* <motion.div variants={childVariants}>{link.label}</motion.div> */}
                {link.label}
            </UnstyledButton>
        );
    });

    /* const handleControl = () => {
        control.start('visible');
    }; */

    return (
        <nav className={clsx(classes.navigation, { [classes['navigation-pinned']]: isPinned, [classes['navigation-opened']]: opened })}>
            <div className={classes.inner}>
                <Logo className={classes.logo} />
                <Group gap={0} visibleFrom="sm">
                    {items}
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </Group>
                <Burger opened={opened} onClick={toggle} size="md" hiddenFrom="sm" aria-label="mobile menu" />
            </div>
            {opened && (
                <Stack className={classes.mobile} /* component={motion.div} */ gap={0} /* variants={variants} initial="hidden" animate={control} */>
                    {/* <button onClick={handleControl}>asdasd</button> */}
                    {items}
                    <LanguageSwitcher />
                    <ThemeSwitcher mobile />
                </Stack>
            )}
        </nav>
    );
}
