'use client';

import { useMemo } from 'react';

import { ActionIcon, Group, Tooltip, UnstyledButton, useMantineColorScheme } from '@mantine/core';

import TablerIcon from '@/components/tabler-icon';

import { useMounted } from '@mantine/hooks';

import type { MantineColorScheme } from '@mantine/core';
import type { FC } from 'react';

import navigationClasses from '@/components/navigation/navigation.module.scss';
import classes from '@/components/theme-switcher/theme-switcher.module.scss';

const ThemeSwitcher: FC<{ mobile?: boolean }> = ({ mobile = false }) => {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const mounted = useMounted();

    const colorSchemeMeta = useMemo(() => {
        const iconProps = { stroke: mobile ? 2 : 1.5, size: mobile ? 36 : 24 };
        const iconLabel = colorScheme === 'light' ? 'Light mode' : colorScheme === 'dark' ? 'Dark mode' : 'System';
        const icons = {
            light: <TablerIcon icon="sun" {...iconProps} />,
            dark: <TablerIcon icon="moon" {...iconProps} />,
            auto: <TablerIcon icon="device-laptop" {...iconProps} />,
        };

        return { icon: mounted ? icons[colorScheme] : <></>, label: mounted ? iconLabel : '' };
    }, [colorScheme, mobile, mounted]);

    const nextColorScheme = useMemo<MantineColorScheme>(() => {
        const modes: MantineColorScheme[] = ['auto', 'light', 'dark'];
        const currentModeIndex = modes.indexOf(colorScheme);
        const nextModeIndex = (currentModeIndex + 1) % modes.length;

        return modes[nextModeIndex];
    }, [colorScheme]);

    if (mobile) {
        return (
            <Group
                className={navigationClasses['navigation__link']}
                onClick={() => setColorScheme(nextColorScheme)}
                component={UnstyledButton}
                data-animated
                gap="xs"
            >
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
};

export default ThemeSwitcher;
