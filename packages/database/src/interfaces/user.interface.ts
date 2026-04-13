import { User } from '../../generated/prisma/client'
import { UserCreateInput, UserUpdateInput } from '../../generated/prisma/models'

export interface UserRepositoryInterface {
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(user: UserCreateInput): Promise<User>
  update(id: number, user: UserUpdateInput): Promise<User>
  delete(id: number): Promise<void>
}
