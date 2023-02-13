import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const deleteMenuSchema = z.object({
  id: z.string().uuid(),
});

type DeleteMenuInput = z.infer<typeof deleteMenuSchema>;

export default function DeleteMenu({ id }: { id: string }): JSX.Element {
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
    if (confirm(`Are you sure you want to delete this menu?`)) {
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
