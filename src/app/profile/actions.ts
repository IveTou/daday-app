'use server'

import { getUserDTO, createUserDTO } from "@/data/user/user-dto"
import { ProfileType, FieldProfileErrorsType } from "@/entities/user/types";
import { getSession } from '@auth0/nextjs-auth0';
import { z } from 'zod'

const schema = z.object({
  name: z.string({
    invalid_type_error: 'Invalid Name',
  }),
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
  address: z.string({
    invalid_type_error: 'Invalid Address',
  }),
  phone: z.string({
    invalid_type_error: 'Invalid Phone',
  })
})


//TODO: think about change this to comply to FSD
export async function createProfile(prevState: any, formData: FormData): Promise<ActionDataState<ProfileType, FieldProfileErrorsType>> {
  const session = await getSession();
  const userId = session?.user.sub

  if(!userId) throw new Error()

  const validatedFields = schema.safeParse({
    id: userId,
    name: formData.get('name'),
    email: formData.get('email') || session?.user.email,
    address: formData.get('address'),
    phone: formData.get('phone'),
  })

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { success, error, data } = await createUserDTO(validatedFields.data)

  return { success, errors: error, data }
}

export async function getProfile() {
  return await getUserDTO()
}
