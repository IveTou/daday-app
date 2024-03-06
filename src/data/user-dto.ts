//These methods should expose objects that are safe to be transferred to the client as is. We like to call these Data Transfer Objects (DTO) to clarify that they're ready to be consumed by the client.
import 'server-only'
import { getCurrentUser } from "./auth"
import { UserDTO } from './types'

// Secret keys can be stored in environment variables but only the data access layer should access process.env in this approach.import prisma from '@/lib/prisma'
// Considerate using dependency injection here instead of using Prisma dependency
export async function createUserDTO(userData: UserDTO) {
  try {
    const currentUser = await getCurrentUser()

    const user = await prisma.user.create({
      data: {
        id: currentUser.id,
        role: currentUser.role,
        ...userData
      }
    })

    // only return the data relevant for this query and not everything
    // you can apply privacy rules here

    if (user) {
      return { success: true, data: user }
    }

    throw new Error()
  } catch (e) {
    return { error: 'Error creating user'}
  }
}

export async function getUserDTO() {
  try {
    const currentUser = await getCurrentUser()

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    })

    return { data: user }
  } catch (e) {
    return { error: true, errorMessage: 'User not found' }
  }
}
