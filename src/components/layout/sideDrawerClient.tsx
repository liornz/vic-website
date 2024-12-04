'use client';

import ColorLensIcon from '@mui/icons-material/ColorLens';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StorefrontIcon from '@mui/icons-material/Storefront';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useTranslation } from '../../app/i18n/client';
import Logo from './logo';

interface Props {
  children: React.ReactNode;
  drawerWidth: number;
  categoriesData: { name: string; slug: string }[];
  lng: string;
}

export default function SideDrawerClient(props: Props) {
  const { children, categoriesData, drawerWidth, lng } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { t } = useTranslation(lng, 'nav');
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mainIcon = (text: string) => {
    switch (text) {
      case 'Home':
        return <HomeIcon />;
      case 'Works':
        return <ColorLensIcon />;
      case 'Press':
        return <NewspaperIcon />;
      case 'Shop':
        return <StorefrontIcon />;
      case 'Contact':
        return <ContactMailIcon />;
      default:
        return null;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Home', 'Works', 'Press', 'Contact'].map((text) => (
          <ListItem key={text} disablePadding>
            <Link href={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>
              <ListItemButton>
                <ListItemIcon>{mainIcon(text)}</ListItemIcon>
                <ListItemText primary={t(text.toLowerCase())} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {categoriesData.map(({ name, slug }) => (
          <ListItem key={name} disablePadding>
            <Link href={`/works/${slug.toLowerCase()}`}>
              <ListItemButton>
                <ListItemIcon>
                  <ExploreIcon />
                </ListItemIcon>
                <ListItemText primary={name[0].toUpperCase() + name.slice(1)} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        {/* <Divider />
		  <ListItem disablePadding>
			<ListItemButton>
			  <ListItemIcon>
				<LanguageIcon />
			  </ListItemIcon>
			  <Trans i18nKey="languageSwitcher" t={t}>
				<Link href={lng === 'en' ? pathname.replace('/en', '/es') : pathname.replace('/es', '/en')}>
				  {lng === 'en' ? 'ESP' : 'ENG'}
				</Link>
			  </Trans>
			</ListItemButton>
		  </ListItem> */}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'black',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ position: 'relative', flexGrow: 1, pt: 8, width: { md: `calc(100% - ${drawerWidth}px)` } }}>
        {children}
      </Box>
    </Box>
  );
}
