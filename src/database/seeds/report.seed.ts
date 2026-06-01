import { AppDataSource } from "../../config/data-source";
import { Report } from "../../entities/Report";

export async function seedReports(users: any, categories: any, statuses: any) {
  const repo = AppDataSource.getRepository(Report);

  const report1 = await repo.save({
    user: users.user1,
    category: categories.infra,
    status: statuses[0], // REPORTED
    title: "Broken Road in Toul Kork",
    description: "The road is heavily damaged and unsafe for vehicles",
    location: "Toul Kork, Phnom Penh",
  });

  const report2 = await repo.save({
    user: users.user1,
    category: categories.env,
    status: statuses[0],
    title: "Garbage not collected",
    description: "Trash has been piling up for 3 days",
    location: "Chamkarmon, Phnom Penh",
  });

  return { report1, report2 };
}