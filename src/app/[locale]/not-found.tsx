import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFound');
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      gap: '20px' 
    }}>
      <h1>{t('title')}</h1>
      <p>{t('message')}</p>
      <Link href="/" style={{ textDecoration: 'underline' }}>
        {t('returnHome')}
      </Link>
    </div>
  );
}
