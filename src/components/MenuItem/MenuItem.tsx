import { useState } from "react";
import DeleteItem from "./forms/DeleteItem";

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
      {/* {editing ? (
      <td>
        <EditMenuItem {id} {name} {price} bind:editing />
      </td>
    ) : ( */}
      <td>{name}</td>
      <td>{price} kr</td>
      {/* <!-- TODO: Only render this if the user is logged in --> */}
      <td>
        <button type="button" onClick={() => setEditing(true)}>
          Edit
        </button>
      </td>
      <td>
        <DeleteItem id={id} name={name} />
      </td>

      {/* )} */}
    </tr>
  );
}
