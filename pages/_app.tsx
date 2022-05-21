import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CardCounterProvider } from "../context/CardTransition";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CardCounterProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CardCounterProvider>
  );
}

export default MyApp;
