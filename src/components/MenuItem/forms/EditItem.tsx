import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const editItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(50),
  price: z.coerce.number().min(0),
});

type EditItemProps = {
  id: string;
  name: string;
  price: number;
  editing: boolean;
  cancelEditing: () => void;
};

type editItemInput = z.infer<typeof editItemSchema>;

export default function EditItem({
  id,
  name,
  price,
  editing,
  cancelEditing,
}: EditItemProps): JSX.Element {
  const { register, handleSubmit, reset } = useZodForm({
    schema: editItemSchema,
    defaultValues: {
      id,
      name,
      price,
    },
  });

  const utils = trpc.useContext();

  const editItem = trpc.menuItem.update.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: editItemInput) => {
    const { id, name, price } = data;
    await editItem.mutateAsync({ id, name, price });
    cancelEditing();
    reset();
  };

  const prefix = "edit-item";

  return (
    <fieldset>
      <legend>Edit item</legend>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <input
          id={`${prefix}-id`}
          type="hidden"
          {...register("id", { required: true })}
        />
        <label htmlFor={`${prefix}-name-${id}`}>Name</label>
        <input
          id={`${prefix}-name-${id}`}
          type="name"
          {...register("name", { required: true })}
        />
        <label htmlFor={`${prefix}-price-${id}`}>Price</label>
        <input
          id={`${prefix}-price-${id}`}
          type="number"
          {...register("price", { required: true })}
        />
        <button type="submit">Update</button>
        {editing && (
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>
    </fieldset>
  );
}
