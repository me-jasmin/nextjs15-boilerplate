'use client';

import ASCIIText from '@/components/ascii-text/ASCIIText';

import type { FC } from 'react';

const GlobalNotFound: FC = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100dvh' }}>
        <ASCIIText text="404" enableWaves={true} asciiFontSize={16} />
    </div>
);

export default GlobalNotFound;
