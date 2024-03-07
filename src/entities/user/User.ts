
export enum UserRoles {
  USER = 'USER',
  ADMIN =  'ADMIN',
}

export class User {
  id: string
  role: UserRoles

  constructor(
    id: string,
    role: UserRoles = UserRoles.USER,
  ){
		this.id = id
    this.role = role
	}
}
