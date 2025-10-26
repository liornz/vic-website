'use client';

import { CookiesProvider } from 'react-cookie';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CookiesProviderWrapper({ children }: Props) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
