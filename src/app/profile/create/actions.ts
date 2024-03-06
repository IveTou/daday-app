'use server'
import { getSession } from '@auth0/nextjs-auth0';
import { z } from 'zod'
import prisma from '../../../../lib/prisma';

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
  try {
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

    const user = await prisma.user.create({
      data: {
        id: session?.user.su,
        ...validatedFields.data
      }
    })

    return { data: user }
  } catch (e) {
    return { errors: 'Server error: ' + e }
  }

}
