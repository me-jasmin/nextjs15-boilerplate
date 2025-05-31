'use client';

import { useEffect, useState } from 'react';

import { dynamicImports } from '@tabler/icons-react';

import type { IconProps, TablerIcon } from '@tabler/icons-react';
import type { SVGProps } from 'react';

export type TablerIconProps = Partial<IconProps> & {
    name: keyof typeof dynamicImports.default;
    [key: string]: SVGProps<SVGSVGElement>[keyof SVGProps<SVGSVGElement>];
};

const iconCache: Record<string, TablerIcon> = {};

const TablerIcon = ({ name, size, stroke, title, ...props }: TablerIconProps) => {
    const [IconComponent, setIconComponent] = useState<TablerIcon | null>(iconCache[name] || null);

    useEffect(() => {
        (async () => {
            if (!iconCache[name]) {
                try {
                    const { default: Icon } = await dynamicImports.default[name]();
                    iconCache[name] = Icon;
                    setIconComponent(() => Icon);
                } catch (error) {
                    console.error(`Tabler icon "${name}" not found.`, error);
                }
            } else {
                setIconComponent(() => iconCache[name]);
            }
        })();
    }, [name]);

    if (!IconComponent) return null;

    return <IconComponent size={size} stroke={stroke} title={title} {...props} />;
};

export default TablerIcon;
