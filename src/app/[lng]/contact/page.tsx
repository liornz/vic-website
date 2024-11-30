import { Metadata } from 'next';
import Contact from '../../../components/contact-page/contact';

interface Props {
  params: Promise<{ lng: string }>;
}

export const metadata: Metadata = {
  title: 'Victor Alaluf Art - Contact Page',
  description: 'Contact Page - Victor Alaluf Art - Contact me!',
};

const ContactPage = async ({ params }: Props) => {
  const { lng } = await params;
  return <Contact lng={lng} />;
};

export default ContactPage;
