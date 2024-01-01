'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import styles from "./artwork.module.scss";
import { artwork } from "../../../types/types";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import PreviewArtwork from "./preview-artwork";
import { useTranslation } from '../../../app/i18n/client';

interface Props {
  artwork: artwork;
  lng: string;
  category: string;
  imageName: string;
  imageProps: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
  };
}

const Artwork: React.FC<Props> = (props) => {
  const { t } = useTranslation(props.lng, 'common');
  const [imagePreview, setImagePreview] = useState(false);
  const router = useRouter();
  const { artwork, imageProps, imageName, category } = props;
  const imagesArray = artwork.images.split("/");
  const imageNamesArray = artwork.imageNames.split("/");
  const imageIndex = imagesArray.findIndex(
    (image) => image.replace(/\.jpg$|\.png$|\.jfif$/, "") === imageName
  );

  const nextImage = (index: number) => {
    if (index === imagesArray.length - 1) {
      return imagesArray[0].replace(/\.jpg$|\.png$|\.jfif$/, "");
    } else {
      return imagesArray[index + 1].replace(/\.jpg$|\.png$|\.jfif$/, "");
    }
  };

  const previousImage = (index: number) => {
    if (index === 0) {
      return imagesArray[imagesArray.length - 1].replace(
        /\.jpg$|\.png$|\.jfif$/,
        ""
      );
    } else {
      return imagesArray[index - 1].replace(/\.jpg$|\.png$|\.jfif$/, "");
    }
  };

  const nextImagePath = `/works/${artwork.categorySlug}/${
    artwork.slug
  }/${nextImage(imageIndex)}`;

  const previousImagePath = `/works/${artwork.categorySlug}/${
    artwork.slug
  }/${previousImage(imageIndex)}`;

  const openPreviewHandler = () => {
    setImagePreview(true);
  };
  const closePreviewHandler = () => {
    setImagePreview(false);
  };

  let xDown: number | null = null;
  let yDown: number | null = null;

  function handleTouchStart(evt: React.TouchEvent<HTMLDivElement>) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt: React.TouchEvent<HTMLDivElement>) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        router.push(nextImagePath);
      } else {
        router.push(previousImagePath);
      }
    } else {
      // if (yDiff > 0) {
      //   console.log('swipe down');
      //   /* down swipe */
      // } else {
      //   console.log('swipe up');
      //   /* up swipe */
      // }
    }
    xDown = null;
    yDown = null;
  }

  const artworkData = (
    <div className={styles.data}>
      {imageNamesArray[imageIndex] ? (
        <h1>{imageNamesArray[imageIndex]}</h1>
      ) : null}
      <h3>{artwork.materials}</h3>
      <p>{artwork.measurements}</p>
      <p>{artwork.year}</p>
      <p
        className={styles.image_count}
        style={imagesArray.length < 2 ? { display: "none" } : {}}
      >
        {`Image ${imageIndex + 1} out of ${imagesArray.length}`}
      </p>
      <p className={styles.mobile}>{t('swipe_image')}</p>
      <p className={styles.mobile}>{t('click_image')}</p>
    </div>
  );

  return (
    <>
      <h1 className={styles.title}>{artwork.title}</h1>
      <div className={styles.main}>
        {artworkData}
        <div className={styles.image_carousel}>
          <Link href={previousImagePath}>
            <span
              role="button"
              className={styles.button_minus}
              style={imagesArray.length < 2 ? { display: "none" } : {}}
            >
              <AiOutlineLeft size="2rem" />
            </span>
          </Link>

          <div
            className={styles.image_container}
            onClick={openPreviewHandler}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <Image
              className={styles.image}
              {...imageProps}
              placeholder="blur"
              alt={artwork.title}
              style={{
                objectFit: "contain",
                objectPosition: "50% 50%",
                height: "100%",
                width: "100%",
              }}
              priority
            />
          </div>
          <Link href={nextImagePath}>
            <span
              role="button"
              className={styles.button_plus}
              style={imagesArray.length < 2 ? { display: "none" } : {}}
            >
              <AiOutlineRight size="2rem" />
            </span>
          </Link>
        </div>
      </div>
      <ReactMarkdown className={styles.details}>
        {artwork.content}
      </ReactMarkdown>
      {imagePreview ? (
        <PreviewArtwork
          imageProps={imageProps}
          imageTitle={artwork.title}
          close={closePreviewHandler}
        />
      ) : null}
    </>
  );
};

export default Artwork;
