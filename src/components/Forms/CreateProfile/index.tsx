import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { setProfileSuccess } from "@/lib/redux/slices/profileSlice"
import { useDispatch } from '@/lib/redux/store'
import { ProfileType, FieldProfileErrorsType } from '@/entities/user/types'


const initialState: ActionDataState<ProfileType, FieldProfileErrorsType> = {
  errors: undefined,
  fieldErrors: undefined,
  success: false,
  data: undefined
}

export default function CreateProfile({ action } : { action: (prevState: any, formData: FormData ) => Promise<ActionDataState<ProfileType, FieldProfileErrorsType>> }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [state, formAction] = useFormState(action, initialState)

   useEffect(() => {
    if(state.success) {
      dispatch(setProfileSuccess(state.data))
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

