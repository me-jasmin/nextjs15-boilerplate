import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SpaceXNav: React.FC = () => {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  const isActive = (path: string) => {
    return pathname.includes(path);
  };
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      gap: '1rem',
    }}>
      <Link 
        href={`/${locale}`} 
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          textDecoration: 'none',
          backgroundColor: isActive(`/${locale}`) && !isActive(`/${locale}/rockets`) && !isActive(`/${locale}/launches`) ? '#0070f3' : 'transparent',
          color: isActive(`/${locale}`) && !isActive(`/${locale}/rockets`) && !isActive(`/${locale}/launches`) ? 'white' : '#0070f3',
        }}
      >
        {t('home')}
      </Link>
      <Link 
        href={`/${locale}/rockets`} 
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          textDecoration: 'none',
          backgroundColor: isActive(`/${locale}/rockets`) ? '#0070f3' : 'transparent',
          color: isActive(`/${locale}/rockets`) ? 'white' : '#0070f3',
        }}
      >
        {t('rockets')}
      </Link>
      <Link 
        href={`/${locale}/launches`} 
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          textDecoration: 'none',
          backgroundColor: isActive(`/${locale}/launches`) ? '#0070f3' : 'transparent',
          color: isActive(`/${locale}/launches`) ? 'white' : '#0070f3',
        }}
      >
        {t('launches')}
      </Link>
    </nav>
  );
};

export default SpaceXNav;
