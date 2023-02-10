import { router } from "../trpc";
import { menuRouter } from "./menu";

export const appRouter = router({
  menu: menuRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
