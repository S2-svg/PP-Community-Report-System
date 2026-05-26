import { User } from "../entities/User";
import { BaseRepository } from "./abstract/base.repository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  findByEmail(email: string) {
    return this.repository().findOne({ where: { email } });
  }

  findByUsername(username: string) {
    return this.repository().findOne({ where: { username } });
  }
}
