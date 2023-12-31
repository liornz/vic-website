'use client';
import React, { useRef } from 'react';
import styles from './contact.module.scss';
import { useTranslation } from '../../app/i18n/client';
import Button from './button';
import { contact } from '@/actions/contact';
import { toast } from 'react-toastify';

type Props = {
  lng: string;
};

const Contact: React.FC<Props> = ({ lng }) => {
  const ref = useRef<HTMLFormElement>(null);
  const { t } = useTranslation(lng, 'contact');

  const actionHandler = async (formData: FormData) => {
    ref.current?.reset();
    const result = await contact(formData);
    if (result?.error === 'Invalid input') {
      toast(t('invalid'));
      return;
    }
    if (result?.error instanceof Error) {
      toast(result.error.message);
      return;
    }
    toast(t('success'));
  };

  return (
    <div className={styles.container}>
      <h1>{t('title')}</h1>
      <form ref={ref} className={styles.form} action={actionHandler}>
        <div className={styles.row}>
          <div className={styles.control}>
            <label htmlFor="email">{t('email')}</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">{t('name')}</label>
            <input type="text" id="name" name="name" />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">{t('message')}</label>
          <textarea name="message" id="message" rows={5}></textarea>
        </div>
        <Button lng={lng} />
      </form>
    </div>
  );
};

export default Contact;
