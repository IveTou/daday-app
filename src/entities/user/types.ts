export type ProfileType = {
  id: string
  name: string
  email: string | null
  address: string | null
  phone: string | null
  role: string
}

export type FieldProfileErrorsType = {
  name?:  string[] | undefined
  email?: string[] | undefined
  address?: string[] | undefined
  phone?: string[] | undefined
}
