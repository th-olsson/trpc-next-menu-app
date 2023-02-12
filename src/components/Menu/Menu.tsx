import { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import AddItem from "../MenuItem/forms/AddItem";
import DeleteMenu from "./forms/DeleteMenu";
import EditMenu from "./forms/EditMenu";

type Menus = inferRouterOutputs<AppRouter>["menu"]["list"]["menus"];
type MenuProps = Pick<Menus[number], "id" | "name" | "items">;

export default function Menu({ id, name, items }: MenuProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

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
      {adding ? (
        <AddItem
          menuId={id}
          adding={adding}
          cancelAdding={() => setAdding(false)}
        />
      ) : (
        <button onClick={() => setAdding(true)}>Add item</button>
      )}
      <button onClick={() => setEditing(true)}>Edit</button>
      <DeleteMenu id={id} />
      <ul>
        {items.map(({ id, name, price }) => (
          <li key={id}>
            {name} - {price}
          </li>
        ))}
      </ul>
    </>
  );
}
