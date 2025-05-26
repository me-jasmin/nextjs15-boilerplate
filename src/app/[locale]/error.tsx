'use client';

import { useTranslations } from 'next-intl';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const t = useTranslations('Error');

    return (
        <div>
            <h2>{t('somethingWentWrong')}</h2>
            <p>{error.message || t('unexpectedError')}</p>
            <button
                onClick={reset}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#96f300',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    marginTop: '1rem',
                }}
            >
                {t('tryAgain')}
            </button>
        </div>
    );
}
