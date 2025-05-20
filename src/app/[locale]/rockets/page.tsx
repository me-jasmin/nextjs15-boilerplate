import React from 'react';
import { getRockets } from '@/lib/spacex';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from '../../spacex.module.css';
import SpaceXNav from '@/components/SpaceXNav';

export default async function RocketsPage() {
  const t = useTranslations('SpaceX');
  const rockets = await getRockets();
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('rocketsTitle')}</h1>
      
      <SpaceXNav />
      
      <div className={styles.grid}>
        {rockets.map((rocket) => (
          <div key={rocket.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{rocket.name}</h2>
            <div className={styles.cardSubtitle}>
              {rocket.active ? (
                <span className={`${styles.badge} ${styles.badgeSuccess}`}>{t('active')}</span>
              ) : (
                <span className={`${styles.badge} ${styles.badgeError}`}>{t('inactive')}</span>
              )}
              <span>{rocket.company}</span>
            </div>
            
            <p className={styles.cardBody}>{rocket.description}</p>
            
            <div style={{ marginBottom: '1rem' }}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t('firstFlight')}</span>
                <span className={styles.statValue}>{rocket.first_flight}</span>
              </div>
              
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t('country')}</span>
                <span className={styles.statValue}>{rocket.country}</span>
              </div>
              
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t('successRate')}</span>
                <span className={styles.statValue}>{rocket.success_rate_pct}%</span>
              </div>
              
              <div className={styles.stat}>
                <span className={styles.statLabel}>{t('costPerLaunch')}</span>
                <span className={styles.statValue}>${(rocket.cost_per_launch / 1000000).toFixed(1)}M</span>
              </div>
            </div>
            
            <a
              href={rocket.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              {t('readMoreWikipedia')} →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
