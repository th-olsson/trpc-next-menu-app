import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });

  if (!hello.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Menu App</title>
        <meta name="description" content="Meta description goes here" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Menu App</h1>
        <p>{hello.data.greeting}</p>
        <LoginButton />
      </main>
    </>
  );
}
