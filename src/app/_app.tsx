// src/app/pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Layout from './layout'; // Adjust the path as needed

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
