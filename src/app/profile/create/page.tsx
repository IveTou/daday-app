'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { createUser } from './actions';

const initialState = {
  errors: {},
  sucess: false
}

//TODO: don't let them acces this page if they already have a profile
export default async function CreateUserProfile() {
  const router = useRouter()
  const [state, formAction] = useFormState(createUser, initialState)

  useEffect(() => {
    if(state.success) {
      router.push('/profile')
    }
  }, [state.success])

  return (
    <form action={formAction}>
      <input type="text" name="name" />
      <input type="text" name="email" />
      <input type="text" name="phone" />
      <input type="text" name="address" />
      <button type="submit">Update User</button>
    </form>
  );
}


//Useful

/* if(session) {
  await updateSession({ ...session, user: { ...session.user, user_id: session.user.sub }})
  redirect('/')
} */
