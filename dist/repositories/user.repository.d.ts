import { User } from "../entities/User";
import { BaseRepository } from "./abstract/base.repository";
export declare class UserRepository extends BaseRepository<User> {
    constructor();
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
}
//# sourceMappingURL=user.repository.d.ts.map