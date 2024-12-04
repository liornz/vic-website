import SideDrawerClient from './sideDrawerClient';

interface Props {
  children: React.ReactNode;
  drawerWidth: number;
  categoriesData: { name: string; slug: string }[];
  lng: string;
}

export default function SideDrawer(props: Props) {
  return <SideDrawerClient {...props} />;
}
