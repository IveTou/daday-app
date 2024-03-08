'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { createUser } from './actions'
import { setProfileSuccess } from "@/lib/redux/slices/profileSlice"
import { useDispatch, useSelector } from '@/lib/redux/store'


const initialState = {
  errors: {},
  sucess: false
}

export default function CreateUserProfile() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.profile)
  const [state, formAction] = useFormState(createUser, initialState)

  useEffect(() => {
    //Don't let them acces this page if they already have a profile
    if(profile.id) {
      router.push('/profile')
    }

    if(state.success) {
      dispatch(setProfileSuccess(state.data))
      router.push('/profile')
    }

  }, [state.success, profile])

  console.log(profile)

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
