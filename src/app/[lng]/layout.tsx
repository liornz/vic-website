import SideDrawer from '@/components/layout/sideDrawer';
import { dir } from 'i18next';
import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
import { languages } from '../i18n/settings';
import './globals.css';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

import Footer from '@/components/footer/footer';
import { getAllCategoriesData } from '@/utils/data-utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/globals.scss';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Victor Alaluf - Artist Portfolio',
  description: 'Artwork Portfolio of Victor Alaluf - A Conceptual Artist in the flieds of Installation, Sculpture and Drawing',
  verification: {
    google: 'g9rOuYhxp85PFoEn6Ib1IRk6ogMouW5ZlU5tk-djwhE',
  },
  metadataBase: new URL('https://victoralaluf.com/'),
  formatDetection: {
    telephone: false,
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  maximumScale: 1,
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
};

const drawerWidth = 240;

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = await params;
  const categories = getAllCategoriesData(lng);
  const categoriesData = categories.map((category) => ({ name: category.name, slug: category.slug }));
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={lato.className}>
        <SideDrawer lng={lng} categoriesData={categoriesData} drawerWidth={drawerWidth}>
          {children}
        </SideDrawer>
        <Footer drawerWidth={drawerWidth} lng={lng} />
        <ToastContainer />
      </body>
    </html>
  );
}
