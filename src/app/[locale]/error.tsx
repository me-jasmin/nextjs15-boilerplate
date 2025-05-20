"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from '../spacex.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Error');

  return (
    <div className={styles.errorContainer}>
      <h2>{t('somethingWentWrong')}</h2>
      <p>{error.message || t('unexpectedError')}</p>
      <button
        onClick={reset}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        {t('tryAgain')}
      </button>
    </div>
  );
}
