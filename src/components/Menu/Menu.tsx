import { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import AddItem from "../MenuItem/forms/AddItem";
import MenuItem from "../MenuItem/MenuItem";
import DeleteMenu from "./forms/DeleteMenu";
import EditMenu from "./forms/EditMenu";

type Menus = inferRouterOutputs<AppRouter>["menu"]["list"]["menus"];
type MenuProps = Pick<Menus[number], "id" | "name" | "items">;

export default function Menu({ id, name, items }: MenuProps): JSX.Element {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);

  return (
    <>
      {editing ? (
        <EditMenu
          id={id}
          name={name}
          editing={editing}
          cancelEditing={() => setEditing(false)}
        />
      ) : (
        <>
          <h2>{name}</h2>
          <button onClick={() => setEditing(true)}>Edit menu</button>
        </>
      )}
      <DeleteMenu id={id} name={name} />
      <table>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td>(This menu is empty)</td>
            </tr>
          ) : (
            <>
              {items.map(({ id, name, price }) => (
                <MenuItem key={id} id={id} name={name} price={price} />
              ))}
            </>
          )}
        </tbody>
      </table>
      {adding ? (
        <AddItem
          menuId={id}
          adding={adding}
          cancelAdding={() => setAdding(false)}
        />
      ) : (
        <div>
          <button onClick={() => setAdding(true)}>Add item</button>
        </div>
      )}
    </>
  );
}
