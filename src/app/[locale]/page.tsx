import React from 'react';
import { getCompanyInfo } from '@/lib/spacex';
import { useTranslations } from 'next-intl';
import styles from '../spacex.module.css';

export default async function Home() {
  const t = useTranslations('SpaceX');
  const companyInfo = await getCompanyInfo();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('companyTitle')}</h1>
      
      <div className={styles.infoCard}>
        <h2 className={styles.subtitle}>{companyInfo.name}</h2>
        <p>{companyInfo.summary}</p>
        
        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>{t('founded')}</span>
            <span className={styles.statValue}>{companyInfo.founded}</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statLabel}>{t('employees')}</span>
            <span className={styles.statValue}>{companyInfo.employees}</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statLabel}>{t('ceo')}</span>
            <span className={styles.statValue}>{companyInfo.ceo}</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statLabel}>{t('cto')}</span>
            <span className={styles.statValue}>{companyInfo.cto}</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statLabel}>{t('coo')}</span>
            <span className={styles.statValue}>{companyInfo.coo}</span>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statLabel}>{t('valuation')}</span>
            <span className={styles.statValue}>${(companyInfo.valuation / 1000000000).toFixed(1)} {t('billion')}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h3 className={styles.subtitle}>{t('headquarters')}</h3>
          <p>
            {companyInfo.headquarters.address}, {companyInfo.headquarters.city}, {companyInfo.headquarters.state}
          </p>
        </div>
      </div>
    </div>
  );
}
