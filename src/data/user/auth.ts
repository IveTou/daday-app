import { cache } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import { User } from '@/entities/user/User';

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  const id: string = session?.user.sub
  const email: string = session?.user.email

  return new User({ id, email });
});
