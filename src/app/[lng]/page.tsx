import Hero from '@/components/home-page/hero';
import VideoOpening from '@/components/home-page/video-opening';

export default function Page({ params: { lng } }: { params: { lng: string } }) {

  return (
    <>
      <VideoOpening />
      <Hero lng={lng} />
    </>
  );
}
