import type { ReactNode } from 'react';

const Layout = ({ children, launch }: { children: ReactNode; launch: ReactNode }) => (
    <>
        {launch}
        {children}
    </>
);

export default Layout;
