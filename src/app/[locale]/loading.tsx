import React from 'react';
import styles from '../spacex.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #0070f3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}></div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
