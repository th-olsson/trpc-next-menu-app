import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { prisma } from "@/server/db";
import { addItemSchema } from "@/components/MenuItem/forms/AddItem";

const defaultItemSelect = Prisma.validator<Prisma.MenuItemSelect>()({
  id: true,
  name: true,
  price: true,
  createdAt: true,
  updatedAt: true,
});

export const itemRouter = router({
  add: procedure.input(addItemSchema).mutation(async ({ input }) => {
    const item = await prisma.menuItem.create({
      data: input,
      select: defaultItemSelect,
    });
    return item;
  }),
  // delete: procedure.input(deleteitemschema).mutation(async ({ input }) => {
  //   const item = await prisma.menuItem.delete({
  //     where: {
  //       id: input.id,
  //     },
  //     select: defaultItemSelect,
  //   });
  //   return item;
  // }),
  // update: procedure.input(edititemschema).mutation(async ({ input }) => {
  //   const item = await prisma.menuItem.update({
  //     where: {
  //       id: input.id,
  //     },
  //     data: input,
  //     select: defaultItemSelect,
  //   });
  //   return item;
  // }),
});
