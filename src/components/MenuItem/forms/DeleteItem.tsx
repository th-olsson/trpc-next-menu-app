import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const deleteItemSchema = z.object({
  id: z.string().uuid(),
});

type DeleteItemInput = z.infer<typeof deleteItemSchema>;

type DeleteItemProps = {
  id: string;
  name: string;
};

export default function DeleteItem({ id, name }: DeleteItemProps): JSX.Element {
  const { register, handleSubmit } = useZodForm({
    schema: deleteItemSchema,
  });
  const utils = trpc.useContext();

  const deleteItem = trpc.menuItem.delete.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: DeleteItemInput) => {
    const { id } = data;
    if (confirm(`Are you sure you want to delete item: "${name}"?`)) {
      await deleteItem.mutateAsync({ id });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "inline-block" }}>
      <input type="hidden" {...register("id")} value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}
