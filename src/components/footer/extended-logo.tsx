import styles from './extended-logo.module.scss';
import { useTranslation } from '../../app/i18n';

type ExtendedLogoProps = {
  lng: string;
};

const ExtendedLogo: React.FC<ExtendedLogoProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer');

  return (
    <div className={styles.container}>
      <div className={styles.image}>
      </div>
      <h1>{t('logo-subtitle')}</h1>
      <a href="mailto:vicalaluf@gmail.com">
        <p className={styles.email}>vicalaluf@gmail.com</p>
      </a>
      <p>©2021 VICTOR ALALUF</p>
      <p>
        {t('rights')}
      </p>
    </div>
  );
};

export default ExtendedLogo;
