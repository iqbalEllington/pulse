
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render() {
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    return (
      <Html>
        {/* <html xmlns="http://www.w3.org/1999/xhtml" lang="en-ae,en-gb,en-us'"> */}
        <Head />
        <head>
          <meta name="google-site-verification" content="zRDFZcoKtW8wwOH4a9esZtspzxQg9jmHCADf8Snn27Y" />
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <body class='theme-color-default light theme-default theme-with-animation'>
          <Main />
          <NextScript />
        </body>
        {/* </html> */}
      </Html>
    );
  }
}