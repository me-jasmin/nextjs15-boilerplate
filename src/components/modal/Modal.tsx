'use client';

import { useEffect, useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Modal as MantineModal } from '@mantine/core';

import { useDisclosure, useMounted } from '@mantine/hooks';

import type { FC } from 'react';

const Modal: FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);
    const mounted = useMounted();
    const [openedOnce, setOpenedOnce] = useState(false);
    const pathname = usePathname();
    const isModal = pathname.includes('/modal');
    console.log('Pathname:', pathname);
    console.log('Modal mounted:', mounted, 'Opened:', opened, 'Opened Once:', openedOnce, 'Is Modal:', isModal);

    useEffect(() => {
        if ((!opened && mounted && !openedOnce) || (isModal && !opened && mounted && !openedOnce)) {
            open();
            setOpenedOnce(true);
        }
    }, [isModal, mounted, open, opened, openedOnce]);

    const handleClose = () => {
        if (opened && mounted && openedOnce) {
            close();
            const timeout = setTimeout(() => {
                router.back();
            }, 500);
            return () => clearTimeout(timeout);
        }
    };

    return (
    <>
    modal is here
        <MantineModal
            ref={ref}
            opened={opened}
            onClose={handleClose}
            overlayProps={{ opacity: 0.55, blur: 3 }}
            size="md"
            centered
            transitionProps={{
                transition: 'skew-up',
                duration: 500,
            }}
        >
            <h2>GSAP Modal</h2>
            <p>This is an animated modal using GSAP and Mantine UI.</p>
            <button onClick={handleClose}>Close</button>
        </MantineModal>
    </>
    );
};
export default Modal;
