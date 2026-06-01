import "reflect-metadata";
import { AppDataSource } from "../../config/data-source";

import { seedUsers } from "./user.seed";
import { seedCategories } from "./category.seed";
import { seedStatuses } from "./status.seed";
import { seedReports } from "./report.seed";
import { seedNotifications } from "./notification.seed";

async function seed() {
  await AppDataSource.initialize();

  console.log("🌱 Starting seed...");

  const users = await seedUsers();
  const categories = await seedCategories();
  const statuses = await seedStatuses();
  const reports = await seedReports(users, categories, statuses);
  await seedNotifications(users, reports);

  console.log("✅ Seed completed!");

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
});