import { useZodForm } from "@/hooks/useZodForm";
import { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

type Menus = inferRouterOutputs<AppRouter>["menu"]["list"]["menus"];
type MenuProps = Pick<Menus[number], "id" | "name" | "items">;
type DeleteMenuInput = z.infer<typeof deleteMenuSchema>;

export const deleteMenuSchema = z.object({
  id: z.string().uuid(),
});

export default function Menu({ id, name }: MenuProps): JSX.Element {
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
    <>
      <h2>{name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} value={id} />
        <button type="submit">Delete</button>
      </form>
    </>
  );
}
