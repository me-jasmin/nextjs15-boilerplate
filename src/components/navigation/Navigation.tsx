'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from 'next-view-transitions';

import { Burger, Group, Stack, UnstyledButton } from '@mantine/core';

import LanguageSwitcher from '@/components/language-switcher';
import Logo from '@/components/logo';
import { DEFAULT_SLUGS } from '@/components/pages/launches/Launches';
import ThemeSwitcher from '@/components/theme-switcher';

import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';

import type { FC } from 'react';

import classes from '@/components/navigation/navigation.module.scss';

const Navigation: FC = () => {
    const t = useTranslations('navigation');
    const [opened, { open, close }] = useDisclosure(false);
    const [scroll] = useWindowScroll();
    const matches = useMediaQuery('(min-width: 48rem)');
    const pathname = usePathname();
    const container = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    const locale = pathname.split('/')[1];
    const isPinned = scroll.y > 0;
    const isActive = useCallback((path: string) => path === pathname, [pathname]);

    gsap.registerPlugin(useGSAP);

    const { contextSafe } = useGSAP(
        () => {
            tl.current = gsap
                .timeline({ paused: true })
                .from('[data-animated]', {
                    onStart: () => {
                        if (!tl?.current?.reversed()) {
                            document.documentElement.classList.add('navigation--opened');
                            open();
                        }
                    },
                    opacity: 0,
                    stagger: 0.1,
                    y: 200,
                    scaleY: -0.5,
                    skewX: -25,
                    skewY: -5,
                    rotateX: 70,
                    rotateY: 5,
                    rotateZ: -5,
                    duration: 0.6,
                    ease: 'power4.inOut',
                    onReverseComplete: () => {
                        if (tl?.current?.reversed()) {
                            document.documentElement.classList.remove('navigation--opened');
                            close();
                        }
                    },
                })
                .reverse();
        },
        { scope: container }
    );

    const toggleMobileMenu = contextSafe(() => tl?.current?.reversed(!tl?.current?.reversed()));

    useEffect(() => {
        if (matches && opened) {
            tl?.current?.kill();
            close();
            document.documentElement.classList.remove('navigation--opened');
        }
    }, [close, matches, opened]);

    const linksMeta = useMemo(
        () => [
            { link: `/${locale}`, label: t('about') },
            { link: `/${locale}/roadster`, label: t('roadster') },
            { link: `/${locale}/launches/${DEFAULT_SLUGS.join('/')}`, label: t('launches') },
            { link: `/${locale}/rockets/5e9d0d95eda69955f709d1eb`, label: t('rockets') },
        ],
        [locale, t]
    );

    const menuLinks = useMemo(
        () =>
            linksMeta.map(({ link, label }) => (
                <UnstyledButton
                    className={clsx(classes['navigation__link'], { [classes['navigation__link--active']]: isActive(link) })}
                    component={Link}
                    variant="subtle"
                    color="gray"
                    key={label}
                    href={isActive(link) ? '' : link}
                    onClick={() => opened && toggleMobileMenu()}
                    prefetch
                    data-animated
                >
                    {label}
                </UnstyledButton>
            )),
        [isActive, linksMeta, opened, toggleMobileMenu]
    );

    return (
        <nav className={clsx(classes['navigation'], { [classes['navigation--pinned']]: isPinned, [classes['navigation--opened']]: opened })}>
            <div className={classes['navigation__inner']}>
                <Logo className={classes['navigation__logo']} />
                <Group className={classes['navigation__desktop']} gap={0}>
                    {menuLinks}
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                </Group>
                <Burger opened={opened} onClick={toggleMobileMenu} size="md" hiddenFrom="sm" aria-label="mobile menu" />
            </div>
            <Stack className={classes['navigation__mobile']} gap={0} ref={container}>
                {menuLinks}
                <LanguageSwitcher mobile />
                <ThemeSwitcher mobile />
            </Stack>
        </nav>
    );
};

export default Navigation;
