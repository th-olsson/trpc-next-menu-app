import { useState } from "react";
import DeleteItem from "./forms/DeleteItem";
import EditItem from "./forms/EditItem";

type MenuItemProps = {
  id: string;
  name: string;
  price: number;
};

export default function MenuItem({
  id,
  name,
  price,
}: MenuItemProps): JSX.Element {
  const [editing, setEditing] = useState(false);

  return (
    <tr>
      {editing ? (
        <td colSpan={4}>
          <EditItem
            id={id}
            name={name}
            price={price}
            editing={editing}
            cancelEditing={() => setEditing(false)}
          />
        </td>
      ) : (
        <>
          <td>{name}</td>
          <td>{price} kr</td>
          <td>
            <button type="button" onClick={() => setEditing(true)}>
              Edit
            </button>
          </td>
          <td>
            <DeleteItem id={id} name={name} />
          </td>
        </>
      )}
    </tr>
  );
}
