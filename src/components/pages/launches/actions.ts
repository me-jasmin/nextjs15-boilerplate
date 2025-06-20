// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use server';

import { redirect } from 'next/navigation';

export async function applyFilters(_: { error?: string }, formData: FormData): Promise<State> {
    const limit = formData.get('limit')?.toString() || '10';
    const sort = formData.get('sort')?.toString() || 'launch_year';
    const order = formData.get('order')?.toString() || 'asc';
    const locale = formData.get('locale')?.toString() || 'en';

    redirect(`/${locale}/launches/${limit}/0/${sort}/${order}`);
}
