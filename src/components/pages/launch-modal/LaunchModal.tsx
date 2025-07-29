'use client';

import { Suspense, use, useEffect, useRef, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Modal as MantineModal } from '@mantine/core';

import LaunchStats from '@/components/launch-stats';

import { useDisclosure, useMounted } from '@mantine/hooks';

import { launch } from '@/lib/api';
import apiClient from '@/lib/api/client';

import type { LaunchTypes } from '@/lib/api';
import type { Locale } from 'next-intl';

const LaunchModal = ({ params }: { params: Promise<{ locale: Locale; id: string }> }) => {
    const router = useRouter();
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);
    const { id, locale } = use(params);
    const [opened, { open, close }] = useDisclosure(false);
    const [openedOnce, setOpenedOnce] = useState(false);
    const mounted = useMounted();
    const isModal = pathname.includes('/modal');

    const data: Promise<LaunchTypes> = apiClient({ query: launch, variables: { launchId: id }, key: 'launch' });

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
        <MantineModal
            ref={ref}
            opened={opened}
            onClose={handleClose}
            overlayProps={{ opacity: 0.55, blur: 3 }}
            size="md"
            centered
            title="Launch Details"
            transitionProps={{
                transition: 'skew-up',
                duration: 500,
            }}
        >
            <Suspense fallback={null}>
                <LaunchStats locale={locale} asyncData={data} />
            </Suspense>
        </MantineModal>
    );
};

export default LaunchModal;
