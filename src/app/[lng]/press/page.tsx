import Press from '@/components/press-page/press';
import { Metadata } from 'next';

interface Props {}

export const metadata: Metadata = {
  title: 'Victor Alaluf - Press Page',
  description: 'Artwork Portfolio of Victor Alaluf - Press Articles Page',
};

const PressPage: React.FC<Props> = () => {
  return <Press />;
};

export default PressPage;
