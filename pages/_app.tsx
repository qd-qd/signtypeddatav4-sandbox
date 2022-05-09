import type { AppProps } from "next/app";
import WAGMIProvider from "../utils/WAGMIProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WAGMIProvider>
      <Component {...pageProps} />
    </WAGMIProvider>
  );
}

export default MyApp;
