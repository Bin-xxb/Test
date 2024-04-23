import "../styles/globals.css";
import type { AppProps } from "next/app";
import mantineTheme from "../styles/theme/mantineTheme";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import Router from "next/router";
import { GTMPageView } from "../utility/gtm";
// import Announcement from "../components/Announcement";

export default function App({ Component, pageProps }: AppProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url);
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=2.0"
        ></meta>
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta
          name="twitter:image"
          content="https://www.cvdcheck.org.au/assets/cvdcheck-og.jpg"
        ></meta>
        <meta
          name="twitter:image:alt"
          content="Assessing and managing cardiovascular disease risk - 2023 Australian guideline and calculator"
        ></meta>
        <meta
          property="og:image"
          content="https://www.cvdcheck.org.au/assets/cvdcheck-og.jpg"
        ></meta>
        <meta property="og:image:width" content="740"></meta>
        <meta property="og:image:height" content="430"></meta>
        <title>
          Assessing and managing cardiovascular disease risk - 2023 Australian
          guideline and calculator
        </title>
        <meta
          name="Description"
          content="New Australian Guideline for assessing and managing cardiovascular disease risk and CVD risk calculator based on the latest evidence for the primary prevention of cardiovascular disease in Australia."
        />
      </Head>
      <MantineProvider theme={mantineTheme} withGlobalStyles withNormalizeCSS>
        {isLoaded ? (
          <Component {...pageProps} />
        ) : (
          <div style={{ visibility: "hidden" }}>
            <Component {...pageProps} />
          </div>
        )}
        {/* <Announcement /> */}
      </MantineProvider>
    </>
  );
}
