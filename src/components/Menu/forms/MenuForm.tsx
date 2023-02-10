import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { trpc } from "@/utils/trpc";

const schema = z.object({
  name: z.string().min(3).max(50),
});

type MenuFormProps = {
  previousValues?: z.infer<typeof schema>;
  editing?: boolean;
};

export default function MenuForm({
  previousValues,
  editing,
}: MenuFormProps): JSX.Element {
  const { register, handleSubmit, reset } = useZodForm({
    schema,
    defaultValues: editing ? previousValues : undefined,
  });
  const utils = trpc.useContext();

  const addMenu = trpc.menu.add.useMutation({
    async onSuccess() {
      await utils.menu.invalidate();
    },
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const { name } = data;
    const result = await addMenu.mutateAsync({ name });
    console.log("created menu:", result);
    reset();
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input type="name" required {...register("name")} />
      <button type="submit">Submit</button>
    </form>
  );
}
