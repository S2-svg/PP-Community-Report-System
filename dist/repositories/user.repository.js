"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../entities/User");
const base_repository_1 = require("./abstract/base.repository");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(User_1.User);
    }
    findByEmail(email) {
        return this.repository().findOne({ where: { email } });
    }
    findByUsername(username) {
        return this.repository().findOne({ where: { username } });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map