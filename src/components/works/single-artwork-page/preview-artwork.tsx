import styles from "./preview-artwork.module.scss";
import Image from "next/image";

interface Props {
  imageTitle: string;
  close: () => void;
  imageProps: {
    blurDataURL: string;
    src: string;
    height: number;
    width: number;
    type?: string | undefined;
  };
}

const PreviewArtwork: React.FC<Props> = (props) => {
  const { imageTitle, close, imageProps } = props;
  return (
    <>
      <div className={styles.backdrop} onClick={close}>
        <div
          className={styles.image_container}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Image
            {...imageProps}
            alt={imageTitle}
            style={{
              objectFit: "contain",
              objectPosition: "50% 50%",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <span className={styles.close} onClick={close}>
          X
        </span>
      </div>
    </>
  );
};

export default PreviewArtwork;
