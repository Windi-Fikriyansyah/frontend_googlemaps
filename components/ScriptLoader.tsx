"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ScriptLoader() {
  const [loadScripts, setLoadScripts] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setLoadScripts(true);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  if (!loadScripts) return null;

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="lazyOnload" />
    </>
  );
}
