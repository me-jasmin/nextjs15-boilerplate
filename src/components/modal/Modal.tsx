'use client';

import { useEffect, useRef } from 'react';

import { useRouter } from 'next/navigation';

import { Modal as MantineModal } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

export default function Modal() {
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
        <MantineModal ref={ref} opened={opened} onClose={handleClose} centered overlayProps={{ opacity: 0.55, blur: 3 }} size="md">
            <div>
                <h2 className="text-xl font-semibold mb-2">GSAP Modal</h2>
                <p className="mb-4">This is an animated modal using GSAP and Mantine UI.</p>
                <button onClick={handleClose} className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                    Close
                </button>
            </div>
        </MantineModal>
    );
}
