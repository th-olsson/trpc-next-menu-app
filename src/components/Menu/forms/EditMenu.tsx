import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const editMenuSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(50),
});

type EditMenuProps = {
  id: string;
  name: string;
  editing?: boolean;
  cancelEditing: () => void;
};

type editMenuInput = z.infer<typeof editMenuSchema>;

export default function EditMenu({
  id,
  name,
  editing,
  cancelEditing,
}: EditMenuProps): JSX.Element {
  const { register, handleSubmit, reset } = useZodForm({
    schema: editMenuSchema,
    defaultValues: {
      id,
      name,
    },
  });

  const utils = trpc.useContext();

  const editMenu = trpc.menu.update.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: editMenuInput) => {
    const { id, name } = data;
    await editMenu.mutateAsync({ id, name });
    cancelEditing();
    reset();
  };

  return (
    <fieldset>
      <legend>Edit menu</legend>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <input
          id="edit-menu-id"
          type="hidden"
          {...register("id", { required: true })}
        />
        <label htmlFor={`edit-menu-name-${id}`}>Name</label>
        <input
          id={`edit-menu-name-${id}`}
          type="name"
          {...register("name", { required: true })}
        />
        <button type="submit">Submit</button>
        {editing && (
          <button type="button" onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>
    </fieldset>
  );
}
