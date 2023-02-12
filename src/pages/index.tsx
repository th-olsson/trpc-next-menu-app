import Head from "next/head";
import LoginButton from "@/components/LoginButton";
import { trpc } from "@/utils/trpc";
import Menu from "@/components/Menu/Menu";
import AddMenu from "@/components/Menu/forms/AddMenu";
import { useState } from "react";

export default function Home() {
  const [adding, setAdding] = useState(false);
  const menus = trpc.menu.list.useQuery();

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
        <LoginButton />
        {menus.data?.menus.map(({ id, name, items }) => (
          <Menu key={id} id={id} name={name} items={items} />
        ))}
        {!adding && <button onClick={() => setAdding(true)}>Add menu</button>}
        {adding && (
          <AddMenu adding={adding} cancelAdding={() => setAdding(false)} />
        )}
      </main>
    </>
  );
}
