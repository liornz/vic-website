import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo/logo.png";

import styles from "./logo.module.scss";

interface Props {
  toggle?: () => void;
}

const Logo: React.FC<Props> = (props) => {
  const { toggle } = props;
  return (
    <div className={styles.logo} onClick={toggle}>
      <Link href="/">
        <Image
          src={logo}
          alt="Victor Alaluf Logo"
          placeholder="blur"
          height={60}
        />
      </Link>
    </div>
  );
};

export default Logo;
