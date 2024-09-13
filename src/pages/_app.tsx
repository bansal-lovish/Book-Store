'use client';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import '../app/globals.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ProductDrawerProvider } from '@/context/ProductDrawerContext';
import theme from '@/theme/theme';
import { ThemeProvider } from '@mui/material';
import AuthProvider from '@/context/AuthProvider';
import Confirmdialog from '@/components/confirmdialog/ConfirmDialog';



export default function App({ Component, pageProps }: AppProps) {






  return (
    <Provider store={store}>
      <AuthProvider>
         <ThemeProvider theme={theme}>
          <ProductDrawerProvider>
      <Component {...pageProps} />
            <Confirmdialog/>
      <ToastContainer />
      </ProductDrawerProvider>
      </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}
