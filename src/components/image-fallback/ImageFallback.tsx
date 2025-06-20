'use client';

import React, { useState } from 'react';

import clsx from 'clsx';

import Image from 'next/image';

import TablerIcon from '@/components/tabler-icon';

import type { ImageProps } from 'next/image';
import type { FC } from 'react';

import classes from '@components/image-fallback/image-fallback.module.scss';

const ImageFallback: FC<ImageProps> = ({ src, alt, width, height, className, ...rest }) => {
    const [error, setError] = useState(false);

    if (error || src === 'fallback') {
        return (
            <div className={clsx(classes['image-fallback-icon'], className)}>
                <TablerIcon icon="photo-x" size={40} stroke={1.5} />
            </div>
        );
    }

    return (
        <Image
            className={clsx(classes['image-fallback'], className)}
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={() => setError(true)}
            {...rest}
        />
    );
};

export default ImageFallback;
