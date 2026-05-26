import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";
import { User } from "./User";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn({ name: "notification_id" })
  notificationId!: number;

  @Column({ name: "user_id", type: "int", nullable: true })
  userId!: number | null;

  @Column({ name: "report_id", type: "int", nullable: true })
  reportId!: number | null;

  @Column({ type: "text", nullable: true })
  message!: string | null;

  @Column({ name: "is_read", type: "boolean", default: false })
  isRead!: boolean;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: "user_id" })
  user!: User | null;

  @ManyToOne(() => Report, (report) => report.notifications)
  @JoinColumn({ name: "report_id" })
  report!: Report | null;
}
