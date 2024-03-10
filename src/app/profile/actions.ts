'use server'

import { getUserDTO, createUserDTO } from "@/data/user/user-dto"
import { ProfileType, FieldProfileErrorsType } from "@/entities/user/types";
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


export async function createProfile(prevState: any, formData: FormData): Promise<ActionDataState<ProfileType, FieldProfileErrorsType>> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
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
