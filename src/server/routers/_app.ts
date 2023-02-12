import { router } from "../trpc";
import { menuRouter } from "./menu";
import { itemRouter } from "./menuItem";

export const appRouter = router({
  menu: menuRouter,
  menuItem: itemRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
