import { reconstructUrl } from '@/utils/url-utils';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: Promise<{ lng: string; pic: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pic: filename } = await params;

  return {
    title: `Victor Alaluf Art - Press Article - ${filename}`,
    description: `Victor Alaluf Art - Press Article - ${filename}`,
  };
}

const ImageViewer: React.FC<Props> = async ({ params }) => {
  const { pic: filename } = await params;

  if (filename.startsWith('external-')) {
    const reconstructedUrl = reconstructUrl(filename.replace('external-', ''));
    return <iframe src={reconstructedUrl} allow="*" style={{ width: '100%', height: '100vh' }} />;
  }

  const imagePath = `/images/press/${filename}.jpg`;
  return <Image src={imagePath} alt={`Press article - ${filename}`} width={2000} height={1428} style={{ width: '100%', height: 'auto' }} />;
};

export default ImageViewer;
