import { router, procedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/server/db";
import { deleteMenuSchema } from "@/components/Menu/Menu";

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
  add: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input }) => {
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
});
