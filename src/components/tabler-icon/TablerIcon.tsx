'use client';

import { useEffect, useState } from 'react';

import { dynamicImports } from '@tabler/icons-react';

import type { IconProps, TablerIcon } from '@tabler/icons-react';
import type { SVGProps } from 'react';

type TablerIconProps = Partial<IconProps> & {
    icon: keyof typeof dynamicImports.default;
    [key: string]: SVGProps<SVGSVGElement>[keyof SVGProps<SVGSVGElement>];
};

const iconCache: Record<string, TablerIcon> = {};

const TablerIcon = ({ icon, size, stroke, title, ...props }: TablerIconProps) => {
    const [IconComponent, setIconComponent] = useState<TablerIcon | null>(iconCache[icon] || null);

    useEffect(() => {
        (async () => {
            if (!iconCache[icon]) {
                try {
                    const { default: Icon } = await dynamicImports.default[icon]();
                    iconCache[icon] = Icon;
                    setIconComponent(() => Icon);
                } catch (error) {
                    console.error(`Tabler icon "${icon}" not found.`, error);
                }
            } else {
                setIconComponent(() => iconCache[icon]);
            }
        })();
    }, [icon]);

    if (!IconComponent) return null;

    return <IconComponent size={size} stroke={stroke} title={title} {...props} />;
};

export default TablerIcon;
export type { TablerIconProps };
