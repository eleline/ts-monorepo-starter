import { UserRepositoryInterface } from "../interfaces/user.interface";
import { db } from "../client";
import { User } from "../../generated/prisma/client";
import { UserCreateInput, UserUpdateInput } from "../../generated/prisma/models";

export class UserRepository implements UserRepositoryInterface {
  async findAll(): Promise<User[]> {
    return db.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return db.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
      where: { email },
    });
  }

  async create(user: UserCreateInput): Promise<User> {
    return db.user.create({
      data: user,
    });
  }

  async update(id: number, user: UserUpdateInput): Promise<User> {
    return db.user.update({
      where: { id },
      data: user,
    });
  }

  async delete(id: number): Promise<void> {
    await db.user.delete({
      where: { id },
    });
  }
}