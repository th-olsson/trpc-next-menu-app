import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db";
import { deleteMenuSchema } from "@/components/Menu/forms/DeleteMenu";
import { addMenuSchema } from "@/components/Menu/forms/AddMenu";

const defaultMenuSelect = Prisma.validator<Prisma.MenuSelect>()({
  id: true,
  name: true,
  items: {
    select: {
      id: true,
      name: true,
      price: true,
    },
  },
  createdAt: true,
  updatedAt: true,
});

export const menuRouter = router({
  list: procedure.query(async () => {
    const menus = await prisma.menu.findMany({
      select: defaultMenuSelect,
    });
    return {
      menus,
    };
  }),
  add: procedure.input(addMenuSchema).mutation(async ({ input }) => {
    const menu = await prisma.menu.create({
      data: input,
      select: defaultMenuSelect,
    });
    return menu;
  }),
  delete: procedure.input(deleteMenuSchema).mutation(async ({ input }) => {
    const menu = await prisma.menu.delete({
      where: {
        id: input.id,
      },
      select: defaultMenuSelect,
    });
    return menu;
  }),
  // update: procedure.input(editMenuSchema).mutation(async ({ input }) => {
  //   const menu = await prisma.menu.update({
  //     where: {
  //       id: input.id,
  //     },
  //     data: input,
  //     select: defaultMenuSelect,
  //   });
  //   return menu;
  // }),
});
