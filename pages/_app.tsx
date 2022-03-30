import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavbarComponent from "../components/navbar.component";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wordle Clone</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
