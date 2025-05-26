import { useMemo } from 'react';



import { ActionIcon, useMantineColorScheme } from '@mantine/core';



import TablerIcon from '@/components/TablerIcon';



import type { MantineColorScheme } from '@mantine/core';





export default function ThemeSwitcher() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const nextColorScheme = useMemo<MantineColorScheme>(() => {
        const modes: MantineColorScheme[] = ['auto', 'light', 'dark'];
        const currentModeIndex = modes.indexOf(colorScheme);
        const nextModeIndex = (currentModeIndex + 1) % modes.length;

        return modes[nextModeIndex];
    }, [colorScheme]);

    if (!colorScheme) return null;

    return (
        <ActionIcon
            onClick={() => setColorScheme(nextColorScheme)}
            variant="subtle"
            color="gray"
            size="lg"
            aria-label="Toggle color scheme"
        >
            {colorScheme === 'light' ? (
                <TablerIcon name="sun" stroke={1.5} size={20} />
            ) : colorScheme === 'dark' ? (
                <TablerIcon name="moon" stroke={1.5} size={20} />
            ) : (
                <TablerIcon name="device-laptop" stroke={1.5} size={20} />
            )}
        </ActionIcon>
    );
}