import { redirect } from 'next/navigation';

import { routing } from '@/i18n/routing';

import type { FC } from 'react';

const RootPage: FC = () => redirect(routing.defaultLocale);

export default RootPage;
