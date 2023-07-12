import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
const radioLogo = "/fm97-youth-logo.png";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="កម្មវិធីផ្សាយប្រចាំថ្ងៃរបស់វិទ្យុសំលេងយុវជន ៩៧ | ព័ត៌មានពិត អប់រំ កម្សាន្ត និងចំណេះដឹង"
        />
        <meta name="keywords" content="Keywords" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Voice of Our Youth" />
        <meta property="og:site_name" content="AMS Radio FM97" />
        <meta property="og:image" content={radioLogo} />
        <meta name="theme-color" content="#ffffff" />
        <title>The Voice of Our Youth</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
        <script async defer type="text/javascript" data-website-id="fc69046d-d2b0-4f87-9f6e-26f052ec064b" src="https://status.amskh.co/umami.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
