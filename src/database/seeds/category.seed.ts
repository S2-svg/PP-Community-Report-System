import { AppDataSource } from "../../config/data-source";
import { Category } from "../../entities/Category";

export async function seedCategories() {
  const repo = AppDataSource.getRepository(Category);

  const infra = await repo.save({
    category_name: "Infrastructure",
    description: "Roads, bridges, buildings issues",
  });

  const env = await repo.save({
    category_name: "Environment",
    description: "Garbage, pollution, drainage",
  });

  const traffic = await repo.save({
    category_name: "Traffic",
    description: "Traffic lights, congestion issues",
  });

  const utilities = await repo.save({
    category_name: "Utilities",
    description: "Water, electricity problems",
  });

  return { infra, env, traffic, utilities };
}