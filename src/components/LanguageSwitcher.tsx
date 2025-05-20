"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const pathname = usePathname();
  
  // Remove the locale prefix from the pathname
  const pathnameWithoutLocale = pathname.split('/').slice(2).join('/');
  
  const languageOptions = [
    { locale: 'en', label: t('en') },
    { locale: 'de', label: t('de') }
  ];
  
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }}>
      <span>{t('label')}:</span>
      <div style={{ display: 'flex', gap: '10px' }}>
        {languageOptions.map((option) => (
          <Link
            key={option.locale}
            href={`/${option.locale}/${pathnameWithoutLocale}`}
            style={{
              textDecoration: 'underline',
              fontWeight: pathname.includes(`/${option.locale}/`) ? 'bold' : 'normal'
            }}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
