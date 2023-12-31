'use client'
import { useTranslation } from '../../app/i18n/client';

import Link from 'next/link';
import styles from './menu-items.module.scss';
import { usePathname } from 'next/navigation';

type MenuItemsProps = {
  lng: string;
};

const MenuItems: React.FC<MenuItemsProps> = ({ lng }) => {
  const pathname = usePathname();
  const { t } = useTranslation(lng, 'nav');

  return (
    <div className={styles.container}>
      <Link
        href="/works"
        style={{
          color: pathname === '/works' ? 'rgb(240,150,37)' : '',
        }}>

        {t('works')}

      </Link>
      <Link
        href="/press"
        style={{
          color: pathname === '/press' ? 'rgb(240,150,37)' : '',
        }}>

        {t('press')}

      </Link>
      <Link
        href="/contact"
        style={{
          color: pathname === '/contact' ? 'rgb(240,150,37)' : '',
        }}>

        {t('contact')}

      </Link>
    </div>
  );
};

export default MenuItems;
