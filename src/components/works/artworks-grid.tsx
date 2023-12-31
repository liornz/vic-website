import ArtworkCard from './artwork-card';
import styles from './artworks-grid.module.scss';
import { artwork } from "../../types/types";

interface Props {
  artworks: artwork[];
  image?: string;
  slug: string;
  imagePropsArray: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
  }[];
}

const ArtworksGrid: React.FC<Props> = (props) => {
  const { artworks, image, slug, imagePropsArray } = props;
  return (
    <div className={styles.fixedContainer}>
      <div className={styles.dark}>
        {artworks.map((item, index) => (
          <ArtworkCard
            key={item.slug}
            artwork={item}
            imageProps={imagePropsArray[index]}
          />
        ))}
      </div>
      <div className={styles.fixedWrap}>
        <div
          className={styles.fixedInner}
          style={
            image
              ? {
                  backgroundImage: `url('/images/categories/${slug}/background.jpg')`,
                }
              : undefined
          }
        ></div>
      </div>
    </div>
  );
};

export default ArtworksGrid;
