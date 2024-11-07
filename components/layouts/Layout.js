import React, { useEffect } from "react";
import FooterMain from "./Footer/Footer";
import SSRProvider from 'react-bootstrap/SSRProvider'

import Header from "./Header/Header";
import Head from "next/head";
import Script from 'next/script'
import Link from "next/link";

import { ToastContainer } from "react-toastify";
function MainLayout(props) {

  return (
    <>
      <SSRProvider>
        {/* <html xmlns="http://www.w3.org/1999/xhtml" lang="en-ae,en-gb,en-us'"> */}
        <Head>
          {/* <meta name="robots" content="noindex"/> */}
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="generator" content="Allsopp and Allsopp CMS" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link legacyBehavior rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
          <link legacyBehavior rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link legacyBehavior rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link legacyBehavior rel="manifest" href="/site.webmanifest" />
          <link legacyBehavior rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff"></meta>
          <meta name="robots" content="noindex, nofollow"/>
          <meta name="google-site-verification" content="zRDFZcoKtW8wwOH4a9esZtspzxQg9jmHCADf8Snn27Y" />
        </Head>
        {props.children}
        {/* </html> */}

        <FooterMain />
      </SSRProvider>
    </>
  );
};

export default MainLayout;
