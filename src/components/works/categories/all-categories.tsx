import CategoriesGrid from './categories-grid';
import styles from './all-categories.module.scss';
import { category } from '../../../types/types';
import { useTranslation } from '../../../app/i18n';

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

const AllCategories: React.FC<Props> = async (props) => {
  const { categories, images, lng } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'common');

  return (
    <div>
      <div className={styles.container}>
        <h1 className="header">
          {t('select')}
        </h1>
        <div className="header-underline"></div>
        <div className={styles.divider}></div>
      </div>
      <CategoriesGrid categories={categories} images={images} />
    </div>
  );
};

export default AllCategories;