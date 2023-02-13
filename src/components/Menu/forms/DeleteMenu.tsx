import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const deleteMenuSchema = z.object({
  id: z.string().uuid(),
});

type DeleteMenuInput = z.infer<typeof deleteMenuSchema>;

type DeleteMenuProps = {
  id: string;
  name: string;
};

export default function DeleteMenu({ id, name }: DeleteMenuProps): JSX.Element {
  const { register, handleSubmit } = useZodForm({
    schema: deleteMenuSchema,
  });
  const utils = trpc.useContext();

  const deleteMenu = trpc.menu.delete.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: DeleteMenuInput) => {
    const { id } = data;
    if (confirm(`Are you sure you want to delete menu: "${name}"?`)) {
      await deleteMenu.mutateAsync({ id });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "inline-block" }}>
      <input type="hidden" {...register("id")} value={id} />
      <button type="submit">Delete menu</button>
    </form>
  );
}
