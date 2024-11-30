'use client';

import Link from 'next/link';
import { useTranslation } from '../../app/i18n/client';
import styles from './404.module.scss';

interface Props {
  lng: string;
}

const Error404: React.FC<Props> = (props) => {
  const { lng } = props;
  const { t } = useTranslation(lng, 'error');
  return (
    <div className={styles.section}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.sub}>{t('sub')}</p>
      <Link href="/" className={styles.button}>
        Home
      </Link>
    </div>
  );
};

export default Error404;
