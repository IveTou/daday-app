'use server'

import { getUserDTO } from "@/data/user-dto"

export async function getUser() {
  return await getUserDTO()
}
