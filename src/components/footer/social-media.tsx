import { FaFacebookSquare } from 'react-icons/fa';
import { SiInstagram } from 'react-icons/si';
import Image from 'next/image';
import sinFronteras from '../../../public/images/logo/_sin-fronteras.png';
import styles from './social-media.module.scss';

const SocialMedia: React.FC = () => {
  return (
    <div className={styles.container}>
      <a
        id="facebook"
        className={styles.item}
        href="https://www.facebook.com/victor.alaluf"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebookSquare color="#4267B2" size="1.5rem" />
        <p className={styles.social_text}>FACEBOOK</p>
      </a>
      <a
        id="instagram"
        className={styles.item}
        href="https://www.instagram.com/alalufvictor.sinfronteras/"
        target="_blank"
        rel="noreferrer"
      >
        <SiInstagram color="#833AB4" size="1.5rem" />
        <p className={styles.social_text}>INSTAGRAM</p>
      </a>
      <a
        id="sinfronteras"
        className={styles.item}
        href="https://sinfronteras-travelblog.com"
        target="_blank"
        rel="noreferrer"
      >
        <div className={styles.image}>
          <Image src={sinFronteras} alt="Sin Fronteras Logo" />
        </div>
        <p className={styles.social_text}>SIN FRONTERAS</p>
      </a>
    </div>
  );
};

export default SocialMedia;
