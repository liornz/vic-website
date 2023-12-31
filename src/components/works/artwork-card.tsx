import Image from "next/image";
import Link from "next/link";
// import { Fade } from "react-awesome-reveal";

import styles from "./artwork-card.module.scss";
import { artwork } from "../../types/types";

interface Props {
  artwork: artwork;
  imageProps: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
  };
}

const ArtworkCard: React.FC<Props> = (props) => {
  const { categorySlug, slug, title, materials, measurements } = props.artwork;
  const { imageProps } = props;
  const imagesArray = props.artwork.images.split("/");
  const filePath = `/works/${categorySlug}/${slug}/${imagesArray[0].replace(
    /\.jpg$|\.png$|\.jfif$/,
    ""
  )}`;

  return (
    // <Fade delay={300}>
      <Link href={filePath}>
        <div className={styles.card}>
          <div className={styles.image}>
            <Image
              {...imageProps}
              alt={title}
              width={594}
              height={420}
              style={{ width: "100%", height: "auto" }}
              placeholder="blur"
            />
            <div className={styles.overlay}></div>
          </div>
          <div className={styles.text}>
            <div className={styles.title}>
              <h1>{title}</h1>
            </div>
            <div className={styles.materials}>
              <p>{materials}</p>
            </div>
            <div className={styles.measurements}>
              <p>{measurements}</p>
            </div>
          </div>
        </div>
      </Link>
    // </Fade>
  );
};

export default ArtworkCard;
