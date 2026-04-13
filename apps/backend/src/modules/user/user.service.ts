import type { UserRepository } from "database";
import type { UserCreateInput, UserUpdateInput } from "@repo/types";

export class UserService {
  constructor(private repo: UserRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: UserCreateInput) {
    return this.repo.create(data);
  }

  update(id: number, data: UserUpdateInput) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
