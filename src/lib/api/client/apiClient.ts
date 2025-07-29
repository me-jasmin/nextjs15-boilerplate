import { cache } from 'react';

type ApiClientArgs = {
    query: string;
    variables?: Record<string, unknown>;
    key?: string;
    revalidate?: number;
};

const endpoint = process.env.NEXT_PUBLIC_SPACEX_API!;

const apiClient = cache(async <T = unknown>({ query, variables = {}, key = '', revalidate = 3600 }: ApiClientArgs): Promise<T> => {
    if (!endpoint) throw new Error('Missing environment variable');

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
        next: { revalidate },
    });

    const { data } = await response.json();

    return key ? data[key] : data;
});

export default apiClient;
export type { ApiClientArgs };
