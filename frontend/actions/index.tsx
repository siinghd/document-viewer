'use server';

import { revalidatePath } from 'next/cache';

export const revalidateRouter = (path: string) => {
  revalidatePath(path);
};
