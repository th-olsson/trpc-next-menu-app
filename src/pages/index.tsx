import Head from "next/head";
import LoginButton from "@/components/LoginButton";
import { trpc } from "@/utils/trpc";
import Menu from "@/components/Menu/Menu";
import MenuForm from "@/components/Menu/forms/MenuForm";

export default function Home() {
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
        {menus.data?.menus.map((menu) => (
          <Menu key={menu.id} {...menu} />
        ))}
        <MenuForm />
      </main>
    </>
  );
}
