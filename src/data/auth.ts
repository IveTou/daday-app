import { cache } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import { User } from '@/entities/user/User';

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  const userId = session?.user.sub

  //Get user permitions provided externaly

  return new User(userId/*, role */);
});
