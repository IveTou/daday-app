'use client'
import { useFormState } from 'react-dom';
import { createUser } from './actions';

const initialState = {
  errors: '',
  data: undefined
}

export default async function CreateUserProfile() {
  const [state, formAction] = useFormState(createUser, initialState)

  console.log('state',state)
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