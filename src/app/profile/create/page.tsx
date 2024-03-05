import { getSession, updateSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation'
//import prisma from '../../../../lib/prisma';

async function createUserProfile() {
  'use server';
  const session = await getSession();

  if(session) {
    await updateSession({ ...session, user: { ...session.user, user_id: session.user.sub }})
    redirect('/')
  }
}

export default async function CreateUserProfile() {

  return (
    <form action={createUserProfile}>
      <button type="submit">Update User</button>
    </form>
  );
}
