
export enum UserRoles {
  USER = 'USER',
  ADMIN =  'ADMIN',
}

export class User {
  id: string
  email: string
  role: UserRoles

  constructor({
    id,
    email,
    role = UserRoles.USER
  }
  :
  {
    id: string,
    email: string,
    role?: UserRoles
  }){
		this.id = id
    this.email = email
    this.role = role
	}
}
