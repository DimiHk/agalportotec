import type { AppProps } from "next/app";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";
import { chakraOptions, swrOptions } from "@/configs";
import { config } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "@/styles/globals.css";
import AuthenticationProvider from "@/providers/authenticationProvider";

config.autoAddCss = true;

export default function App({ Component, pageProps }: AppProps) {
  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStylesLoaded(true);
    }, 50);
  }, []);

  return (
    <ChakraProvider toastOptions={chakraOptions}>
      <CSSReset />
      {stylesLoaded && (
        <AuthenticationProvider>
          <NextNProgress height={4} />
          <SWRConfig value={swrOptions}>
            <Component suppressHydrationWarning={true} {...pageProps} />
          </SWRConfig>
        </AuthenticationProvider>
      )}
    </ChakraProvider>
  );
}
