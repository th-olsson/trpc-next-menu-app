import { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";
import DeleteMenu from "./forms/DeleteMenu";

type Menus = inferRouterOutputs<AppRouter>["menu"]["list"]["menus"];
type MenuProps = Pick<Menus[number], "id" | "name" | "items">;

export default function Menu({ id, name }: MenuProps): JSX.Element {
  return (
    <>
      <h2>{name}</h2>
      <DeleteMenu id={id} />
    </>
  );
}
