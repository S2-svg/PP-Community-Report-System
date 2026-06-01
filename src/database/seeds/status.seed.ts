import { AppDataSource } from "../../config/data-source";
import { Status } from "../../entities/Status";

export async function seedStatuses() {
  const repo = AppDataSource.getRepository(Status);

  const data: Partial<Status>[] = [
    { statusName: "REPORTED" },
    { statusName: "REVIEWED" },
    { statusName: "SUBMITTED_TO_GOV" },
    { statusName: "ACCEPTED" },
    { statusName: "IN_PROGRESS" },
    { statusName: "RESOLVED" },
    { statusName: "CLOSED" },
    { statusName: "REJECTED" },
  ];

  const statuses = await repo.save(data);

  return statuses;
}