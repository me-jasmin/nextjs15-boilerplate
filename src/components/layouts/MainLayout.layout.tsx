import clsx from 'clsx';

import type { FC, ReactNode } from 'react';

import classes from '@/components/layouts/main-layout.module.scss';

type MainLayoutProps = {
    children: ReactNode;
    background?: 'about' | 'roadster' | 'launches';
    noPadding?: boolean;
    fullWidth?: boolean;
    fullScreeen?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({ children, background, fullWidth = false, noPadding = false, fullScreeen = false }) => (
    <div
        className={clsx(classes.cover, {
            [classes['cover--full-width']]: fullWidth,
            [classes['cover--full-screen']]: fullScreeen,
            [classes['cover--no-padding']]: noPadding,
            [classes[background || '']]: background,
        })}
    >
        {fullWidth || fullScreeen || noPadding ? children : <div className={classes.hero}>{children}</div>}
    </div>
);

export default MainLayout;
export type { MainLayoutProps };
