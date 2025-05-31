'use client';

import { useTranslations } from 'next-intl';

import { Button, Text, Title } from '@mantine/core';

type ErrorProps = {
    error: Error;
    reset(): void;
};

const Error = ({ error, reset }: ErrorProps) => {
    const t = useTranslations('error');

    return (
        <>
            <Title order={2}>{t('somethingWentWrong')}</Title>
            <Text>{error.message || t('unexpectedError')}</Text>
            <Button onClick={reset}>{t('tryAgain')}</Button>
        </>
    );
};

export default Error;
