import { cache } from 'react';

type FetchGraphQLArgs = {
    query: string;
    variables?: Record<string, unknown>;
    key?: string;
    revalidate?: number;
};

const endpoint = process.env.REACT_APP_SPACEX_API!;
const getData = cache(async <T = unknown>({ query, variables = {}, key = '', revalidate = 3600 }: FetchGraphQLArgs): Promise<T> => {
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

export default getData;
