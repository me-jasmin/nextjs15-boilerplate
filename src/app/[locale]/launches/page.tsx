import { redirect } from 'next/navigation';

import { DEFAULT_SLUGS } from '@/components/pages/launches/Launches';

import type { Locale } from 'next-intl';

const RootPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
    const { locale } = await params;

    return redirect(`/${locale}/launches/${DEFAULT_SLUGS.join('/')}`);
};

export default RootPage;
