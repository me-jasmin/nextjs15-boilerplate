'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { Modal as MantineModal } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import type { FC } from 'react';

const Modal: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        open();
    }, [open]);

    const handleClose = () => {
        close();
        router.back();
    };

    return (
        <MantineModal ref={ref} opened={opened} onClose={handleClose} overlayProps={{ opacity: 0.55, blur: 3 }} size="md" centered>
            <h2>GSAP Modal</h2>
            <p>This is an animated modal using GSAP and Mantine UI.</p>
            <button onClick={handleClose}>Close</button>
        </MantineModal>
    );
};
export default Modal;
