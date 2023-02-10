import { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";

type Menus = inferRouterOutputs<AppRouter>["menu"]["list"]["menus"];
type MenuProps = Menus[number];

export default function Menu({ name }: MenuProps): JSX.Element {
  return <h2>{name}</h2>;
}
