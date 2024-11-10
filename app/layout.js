"use client"


import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { Provider } from 'react-redux';
import { store } from './store';
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
      <Provider store={store}>
      <body className={inter.className}>
      {children}
      </body>
      </Provider>
        </SessionProvider>
    </html>
  );
}
