import { AppDataSource } from "../../config/data-source";
import { Category } from "../../entities/Category";

export async function seedCategories() {
  const repo = AppDataSource.getRepository(Category);

  const infra = await repo.save({
    categoryName: "Infrastructure",
    description: "Roads, bridges, buildings issues",
  });

  const env = await repo.save({
    categoryName: "Environment",
    description: "Garbage, pollution, drainage",
  });

  const traffic = await repo.save({
    categoryName: "Traffic",
    description: "Traffic lights, congestion issues",
  });

  const utilities = await repo.save({
    categoryName: "Utilities",
    description: "Water, electricity problems",
  });

  return { infra, env, traffic, utilities };
}
