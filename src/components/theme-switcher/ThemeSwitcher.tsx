'use client';

import { useMemo } from 'react';

import { ActionIcon, Group, Tooltip, useMantineColorScheme } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import type { MantineColorScheme } from '@mantine/core';

import navigationClasses from '@/components/navigation/navigation.module.scss';
import classes from '@/components/theme-switcher/theme-switcher.module.scss';

export default function ThemeSwitcher({ mobile = false }: { mobile?: boolean }) {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const nextColorScheme = useMemo<MantineColorScheme>(() => {
        const modes: MantineColorScheme[] = ['auto', 'light', 'dark'];
        const currentModeIndex = modes.indexOf(colorScheme);
        const nextModeIndex = (currentModeIndex + 1) % modes.length;

        return modes[nextModeIndex];
    }, [colorScheme]);

    const colorSchemeMeta = useMemo(() => {
        const iconProps = {
            stroke: mobile ? 2 : 1.5,
            size: mobile ? 40 : 24,
        };

        const iconLabel = colorScheme === 'light' ? 'Light mode' : colorScheme === 'dark' ? 'Dark mode' : 'System';

        const icons = {
            light: <TablerIcon name="sun" {...iconProps} />,
            dark: <TablerIcon name="moon" {...iconProps} />,
            auto: <TablerIcon name="device-laptop" {...iconProps} />,
        };

        return { icon: icons[colorScheme], label: iconLabel };
    }, [colorScheme, mobile]);

    if (!colorScheme) {
        console.warn('Color scheme is not defined. Please check your Mantine configuration.');

        return null;
    }

    if (mobile) {
        return (
            <Group className={navigationClasses.link} onClick={() => setColorScheme(nextColorScheme)} gap="xs">
                {colorSchemeMeta.label}
                {colorSchemeMeta.icon}
            </Group>
        );
    }

    return (
        <Tooltip label={colorSchemeMeta.label} openDelay={1000} arrowPosition="side" arrowOffset={10} arrowSize={8} withArrow>
            <ActionIcon
                className={classes['theme-switcher']}
                onClick={() => setColorScheme(nextColorScheme)}
                variant="subtle"
                color="gray"
                size="lg"
                aria-label="Toggle color scheme"
            >
                {colorSchemeMeta.icon}
            </ActionIcon>
        </Tooltip>
    );
}
