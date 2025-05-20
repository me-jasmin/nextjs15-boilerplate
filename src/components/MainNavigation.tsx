import React from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MainNavigation: React.FC = () => {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  
  const isActive = (path: string) => {
    return pathname.includes(path);
  };
  
  return (
    <header style={{
      backgroundColor: '#f9f9f9',
      padding: '1rem',
      marginBottom: '2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          Next.js 15 Boilerplate
        </div>
        
        <nav style={{
          display: 'flex',
          gap: '1.5rem'
        }}>
          <Link 
            href={`/${locale}`} 
            style={{
              textDecoration: 'none',
              color: isActive(`/${locale}`) && !isActive(`/${locale}/rockets`) && !isActive(`/${locale}/launches`) ? '#0070f3' : '#333',
              fontWeight: isActive(`/${locale}`) && !isActive(`/${locale}/rockets`) && !isActive(`/${locale}/launches`) ? 'bold' : 'normal',
            }}
          >
            {t('home')}
          </Link>
          <Link 
            href={`/${locale}/rockets`} 
            style={{
              textDecoration: 'none',
              color: isActive(`/${locale}/rockets`) ? '#0070f3' : '#333',
              fontWeight: isActive(`/${locale}/rockets`) ? 'bold' : 'normal',
            }}
          >
            {t('rockets')}
          </Link>
          <Link 
            href={`/${locale}/launches`} 
            style={{
              textDecoration: 'none',
              color: isActive(`/${locale}/launches`) ? '#0070f3' : '#333',
              fontWeight: isActive(`/${locale}/launches`) ? 'bold' : 'normal',
            }}
          >
            {t('launches')}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;
