'use client';

import { useTranslation } from '../../../app/i18n/client';
import { category } from '../../../types/types';
import styles from './all-categories.module.scss';
import CategoriesGrid from './categories-grid';

interface Props {
  categories: category[];
  lng: string;
  images: {
    imageProps: {
      blurDataURL: string;
      src: string;
      height: number;
      width: number;
    };
  }[];
}

const AllCategories: React.FC<Props> = (props) => {
  const { categories, images, lng } = props;
  const { t } = useTranslation(lng, 'common');

  return (
    <div>
      <div className={styles.container}>
        <h1 className="header">{t('select')}</h1>
        <div className="header-underline"></div>
        <div className={styles.divider}></div>
      </div>
      <CategoriesGrid categories={categories} images={images} />
    </div>
  );
};

export default AllCategories;
