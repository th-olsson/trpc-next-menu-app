import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { trpc } from "@/utils/trpc";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth/core/types";

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
