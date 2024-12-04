'use client';

import { useTranslation } from '../../app/i18n/client';
import styles from './extended-logo.module.scss';

type ExtendedLogoProps = {
  lng: string;
};

const ExtendedLogo: React.FC<ExtendedLogoProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer');

  return (
    <div className={styles.container}>
      <div className={styles.image}></div>
      <h1>{t('logo-subtitle')}</h1>
      <a href="mailto:vicalaluf@gmail.com">
        <p className={styles.email}>vicalaluf@gmail.com</p>
      </a>
      <p>©2021 VICTOR ALALUF</p>
      <p>{t('rights')}</p>
    </div>
  );
};

export default ExtendedLogo;
