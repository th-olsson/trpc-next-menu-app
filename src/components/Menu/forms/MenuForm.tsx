import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

export const addMenuSchema = z.object({
  name: z.string().min(3).max(50),
});

type MenuFormProps = {
  previousValues?: z.infer<typeof addMenuSchema>;
  editing?: boolean;
  adding?: boolean;
  cancelAdding?: () => void;
};

type AddMenuInput = z.infer<typeof addMenuSchema>;

export default function MenuForm({
  previousValues,
  editing,
  adding,
  cancelAdding,
}: MenuFormProps): JSX.Element {
  const { register, handleSubmit, reset } = useZodForm({
    schema: addMenuSchema,
    defaultValues: editing ? previousValues : undefined,
  });
  const utils = trpc.useContext();

  const addMenu = trpc.menu.add.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: AddMenuInput) => {
    const { name } = data;
    await addMenu.mutateAsync({ name });
    reset();
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <label htmlFor="add-menu-name">Name</label>
      <input
        id="add-menu-name"
        type="name"
        {...register("name", { required: true })}
      />
      <button type="submit">Submit</button>
      {adding && (
        <button type="button" onClick={cancelAdding}>
          Cancel
        </button>
      )}
    </form>
  );
}
