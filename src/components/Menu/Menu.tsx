import { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import DeleteMenu from "./forms/DeleteMenu";
import EditMenu from "./forms/EditMenu";

type Menus = inferRouterOutputs<AppRouter>["menu"]["list"]["menus"];
type MenuProps = Pick<Menus[number], "id" | "name" | "items">;

export default function Menu({ id, name }: MenuProps): JSX.Element {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <EditMenu
        id={id}
        name={name}
        editing={editing}
        cancelEditing={() => setEditing(false)}
      />
    );
  }

  return (
    <>
      <h2>{name}</h2>
      <button onClick={() => setEditing(true)}>Edit</button>
      <DeleteMenu id={id} />
    </>
  );
}
