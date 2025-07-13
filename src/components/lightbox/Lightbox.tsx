'use client';

import { useFancybox } from '@/hooks';

import type { FancyboxOptions } from '@fancyapps/ui/dist/fancybox';
import type { ElementType, ReactNode } from 'react';

const Lightbox = ({ children, options, Wrapper = 'div', wrapperProps }: { children: ReactNode; options?: FancyboxOptions; Wrapper?: ElementType; wrapperProps: Record<string, unknown> }) => {
    const [fancyboxRef] = useFancybox({
        Hash: false,
        ...options,
    });

    return (
        <Wrapper ref={fancyboxRef} {...wrapperProps}>
            {children}
        </Wrapper>
    );
};

export default Lightbox;
