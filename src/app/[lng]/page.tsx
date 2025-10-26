import Hero from '@/components/home-page/hero';
import VideoOpening from '@/components/home-page/video-opening';

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params;

  return (
    <>
      <VideoOpening />
      <Hero lng={lng} />
    </>
  );
}
