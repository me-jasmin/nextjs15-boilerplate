import clsx from 'clsx';

import type { ReactNode } from 'react';

import classes from '@/components/layouts/sideContent.module.scss';

const SideContentLayout = ({ children, background }: { children: ReactNode; background?: string }) => {
    return (
        <div className={clsx(classes.cover, classes[background || null])}>
            <div className={classes.hero}>{children}</div>
        </div>
    );
};

export default SideContentLayout;
