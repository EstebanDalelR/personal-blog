import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SidebarFooter from '../components/SidebarFooter';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SidebarFooter />
    </>
  );
}
