import React from 'react';
import Image from "next/image";
import { useTranslations } from 'next-intl';
import styles from "../page.module.css";

export default function Home() {
  const t = useTranslations('Index');
  const alt = useTranslations('Alt');
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt={alt('nextLogo')}
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            {t('getStarted')} <code>src/app/[locale]/page.tsx</code>.
          </li>
          <li>{t('saveChanges')}</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt={alt('vercelLogo')}
              width={20}
              height={20}
            />
            {t('deployNow')}
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            {t('readDocs')}
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt={alt('fileIcon')} width={16} height={16} />
          {t('learn')}
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt={alt('windowIcon')} width={16} height={16} />
          {t('examples')}
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt={alt('globeIcon')} width={16} height={16} />
          {t('goToNextjs')}
        </a>
      </footer>
    </div>
  );
}
