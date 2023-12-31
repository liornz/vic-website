import React from 'react';
import Contact from '../../../components/contact-page/contact';
import { Metadata } from 'next';

interface Props {
  params: { lng: string };
}

export const metadata: Metadata = {
  title: 'Victor Alaluf Art - Contact Page',
  description: 'Contact Page - Victor Alaluf Art - Contact me!',
};

const ContactPage: React.FC<Props> = (props) => {
  const {
    params: { lng },
  } = props;
  return <Contact lng={lng} />;
};

export default ContactPage;
