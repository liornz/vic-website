'use client';

import { useEffect, useState } from 'react';
import Logo from './logo';
import Navbar from './navbar';
import styles from './main-header.module.scss';
import MenuToggler from './menuToggler';

interface Props {
  lng: string;
}

const MainHeader: React.FC<Props> = ({ lng }) => {
  const breakpoint = 600;
  const [isMobile, setIsMobile] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const handleResizeWindow = () => (window.innerWidth <= breakpoint ? setIsMobile(true) : setIsMobile(false));
    handleResizeWindow();
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [breakpoint]);

  function toggleMobileMenu() {
    setShowMobileMenu((prevState) => !prevState);
  }

  let output = isMobile ? (
    <header>
      <div className={styles.header_mobile}>
        <div className={styles.toolbar_mobile}>
          <Logo toggle={showMobileMenu ? toggleMobileMenu : undefined} />
          <MenuToggler show={showMobileMenu} toggle={toggleMobileMenu} />
        </div>
        <Navbar lng={lng} show={showMobileMenu ? true : false} toggle={toggleMobileMenu} isMobile={true} />
      </div>
    </header>
  ) : (
    <header>
      <div className={styles.header_desktop}>
        <Logo />
        <Navbar lng={lng} show isMobile={false} />
      </div>
    </header>
  );

  return output;
};

export default MainHeader;
