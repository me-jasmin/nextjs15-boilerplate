import '@mantine/core/styles.css';
import '@styles/global.scss';

import { Metadata, Viewport } from 'next';

import type { ReactNode } from 'react';

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 10,
    userScalable: true,
};

export const metadata: Metadata = {
    title: {
        template: '%s // SpaceX',
        default: 'SpaceX',
    },
};

const RootLayout = ({ children }: { children: ReactNode }) => children;

export default RootLayout;
