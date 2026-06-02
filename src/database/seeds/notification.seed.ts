import { AppDataSource } from "../../config/data-source";
import { Notification } from "../../entities/Notification";

export async function seedNotifications(users: any, reports: any) {
  const repo = AppDataSource.getRepository(Notification);

  await repo.save([
    {
      user: users.user1,
      report: reports.report1,
      message: "Your report has been received and is under review",
      is_read: false,
    },
    {
      user: users.user1,
      report: reports.report2,
      message: "Your report is being processed by admin",
      is_read: false,
    },
  ]);
}