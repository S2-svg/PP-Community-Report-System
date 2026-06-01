import { AppDataSource } from "../../config/data-source";
import { User } from "../../entities/User";

export async function seedUsers() {
  const repo = AppDataSource.getRepository(User);

  const user1 = await repo.save({
    full_name: "Dara Sok",
    username: "dara_sok",
    email: "dara@gmail.com",
    password: "$2a$12$JlAVnjUeMm1pFqut3JC41eDBx6f7rAdRgxR5e27lreqfsjYFkDBI2", //pw: User1234
    phone_number: "012345678",
    role: "Citizen",
  });

  const admin = await repo.save({
    full_name: "Admin Phnom Penh",
    username: "admin_pp",
    email: "admin@gmail.com",
    password: "$2a$12$5TR77vNpToKrpe93t.46Vur8Imo8dzNOXmvkQLDNUVMigpCM2Nb9G", //pw: Admin123
    phone_number: "098765432",
    role: "Admin",
  });

  return { user1, admin };
}