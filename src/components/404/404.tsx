import Link from 'next/link';
import styles from './404.module.scss';
import { useTranslation } from '../../app/i18n';


interface Props {
  lng: string;
}

const Error404: React.FC<Props> = async (props) => {
  const { lng } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'error');
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