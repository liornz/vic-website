import styles from './categories-grid.module.scss';
import CategoryCard from './category-card';
import { category } from '../../../types/types';

interface Props {
  categories: category[];
  images: {
    imageProps: {
      blurDataURL: string;
      src: string;
      height: number;
      width: number;
    };
  }[];
}

const CategoriesGrid: React.FC<Props> = (props) => {
  const { categories, images } = props;
  return (
    <div className={styles.fixedContainer}>
      <div className={styles.dark}>
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} image={images[index]} />
        ))}
      </div>
      <div className={styles.fixedWrap}>
        <div className={styles.fixedInner}></div>
      </div>
    </div>
  );
};

export default CategoriesGrid;
