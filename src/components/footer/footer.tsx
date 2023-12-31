import ExtendedLogo from './extended-logo';
import MenuItems from './menu-items';
import SocialMedia from './social-media';
import styles from './footer.module.scss';
import { Box } from '@mui/material';

type FooterProps = {
  lng: string;
  drawerWidth: number;
};

const Footer: React.FC<FooterProps> = ({ lng, drawerWidth }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        pt: 7,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <div className={styles.container}>
        <ExtendedLogo lng={lng} />
        <MenuItems lng={lng} />
        <SocialMedia />
      </div>
    </Box>
  );
};

export default Footer;
