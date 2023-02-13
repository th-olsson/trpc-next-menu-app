import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const addItemSchema = z.object({
  menuId: z.string().uuid(),
  name: z.string().min(3).max(50),
  price: z.coerce.number().min(0),
});

type AddItemProps = {
  menuId: string;
  adding: boolean;
  cancelAdding: () => void;
};

type AddItemInput = z.infer<typeof addItemSchema>;

export default function AddItem({
  menuId,
  adding,
  cancelAdding,
}: AddItemProps): JSX.Element {
  const { register, handleSubmit, reset } = useZodForm({
    schema: addItemSchema,
    defaultValues: {
      name: "",
    },
  });

  const utils = trpc.useContext();

  const addItem = trpc.menuItem.add.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: AddItemInput) => {
    const { menuId, name, price } = data;
    await addItem.mutateAsync({ menuId, name, price });
    cancelAdding();
    reset();
  };

  return (
    <fieldset>
      <legend>Add item</legend>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <input
          type="hidden"
          {...register("menuId", { required: true })}
          defaultValue={menuId}
        />
        <label htmlFor={`add-item-name-${menuId}`}>Name</label>
        <input
          id={`add-item-name-${menuId}`}
          type="name"
          {...register("name", { required: true })}
        />
        <label htmlFor={`add-item-price-${menuId}`}>Price</label>
        <input
          id={`add-item-price-${menuId}`}
          type="number"
          {...register("price", { required: true })}
        />
        <button type="submit">Submit</button>
        {adding && (
          <button type="button" onClick={cancelAdding}>
            Cancel
          </button>
        )}
      </form>
    </fieldset>
  );
}
