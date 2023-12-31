'use client';

import { useEffect } from 'react';
import styles from './error.module.scss';
import { t } from 'i18next';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h1 className={styles.title}>Something went wrong...</h1>
      </div>
      <button className={styles.button} onClick={() => reset()}>
        {t('tryAgain')}
      </button>
    </div>
  );
}
