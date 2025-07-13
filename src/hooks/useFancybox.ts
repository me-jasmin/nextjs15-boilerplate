import { useEffect, useRef } from 'react';

import { Fancybox } from '@fancyapps/ui/dist/fancybox/';

import type { FancyboxOptions } from '@fancyapps/ui/dist/fancybox/';

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

const useFancybox = (options: Partial<FancyboxOptions> = {}) => {
    const containerRef = useRef<HTMLElement | null>(null);
    const setContainerRef = (element: HTMLElement | null) => (containerRef.current = element);

    useEffect(() => {
        if (containerRef) {
            Fancybox.bind(containerRef.current, '[data-fancybox]', options);
            return () => Fancybox.unbind(containerRef.current);
        }
    }, [options]);

    return [setContainerRef];
};
export default useFancybox;
