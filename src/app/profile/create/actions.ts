'use server'
import { createUserDTO } from '@/data/user-dto';
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

export async function createUser(prevState: any, formData: FormData) {
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
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { success, error, data } = await createUserDTO(validatedFields.data)

  return { success, errors: error, data }
}
