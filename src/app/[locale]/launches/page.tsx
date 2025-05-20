import React from 'react';
import { getLaunches } from '@/lib/spacex';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from '../../spacex.module.css';

export default async function LaunchesPage() {
  const t = useTranslations('SpaceX');
  const launches = await getLaunches(10);
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('launchesTitle')}</h1>
      
      <div className={styles.grid}>
        {launches.map((launch) => (
          <div key={launch.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{launch.mission_name}</h2>
            <div className={styles.cardSubtitle}>
              {launch.launch_success !== null ? (
                launch.launch_success ? (
                  <span className={`${styles.badge} ${styles.badgeSuccess}`}>{t('successful')}</span>
                ) : (
                  <span className={`${styles.badge} ${styles.badgeError}`}>{t('failed')}</span>
                )
              ) : null}
              <span>{launch.rocket.rocket_name}</span>
            </div>
            
            <div className={styles.launchDate}>
              {new Date(launch.launch_date_utc).toLocaleDateString()}
            </div>
            
            {launch.links.mission_patch && (
              <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                <Image 
                  src={launch.links.mission_patch} 
                  alt={`${launch.mission_name} patch`}
                  width={100}
                  height={100}
                  style={{ maxWidth: '100px' }}
                />
              </div>
            )}
            
            <p className={styles.cardBody}>
              {launch.details ? launch.details : t('noDetails')}
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {launch.links.article_link && (
                <a
                  href={launch.links.article_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  {t('article')}
                </a>
              )}
              
              {launch.links.video_link && (
                <a
                  href={launch.links.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  {t('video')}
                </a>
              )}
              
              {launch.links.wikipedia && (
                <a
                  href={launch.links.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cardLink}
                >
                  {t('wikipedia')}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
