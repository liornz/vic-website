import { Metadata } from 'next';
import React from 'react';
import Contact from '../../../components/contact-page/contact';

interface Props {
  params: Promise<{ lng: string }>;
}

export const metadata: Metadata = {
  title: 'Victor Alaluf Art - Contact Page',
  description: 'Contact Page - Victor Alaluf Art - Contact me!',
};

const ContactPage: React.FC<Props> = async ({ params }) => {
  const { lng } = await params;
  return <Contact lng={lng} />;
};

export default ContactPage;
