import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LoadingScreen /> : <Component {...pageProps} />}
    </>
  );
}

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="animate-breathe flex flex-col items-center">
        <img
          src="/logo.svg"
          alt="Company Logo"
          className="w-16 h-16"
        />
      </div>
    </div>
  );
};
