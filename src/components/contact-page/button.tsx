import styles from './contact.module.scss';
import { useTranslation } from '../../app/i18n/client';
import { useFormStatus } from 'react-dom';

type Props = {
  lng: string;
};

export default function Button({ lng }: Props) {
  const { t } = useTranslation(lng, 'contact');
  const { pending } = useFormStatus();
  return <button className={styles.button}>{pending ? t('submitting') : t('button')}</button>;
}
