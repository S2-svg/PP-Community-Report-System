import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Notification } from "./Notification";
import { Report } from "./Report";
import { ReportStatusHistory } from "./ReportStatusHistory";

export type UserRole = "Citizen" | "Admin";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId!: number;

  @Column({ name: "full_name", type: "varchar", length: 100, nullable: true })
  fullName!: string | null;

  @Column({ type: "varchar", length: 50, unique: true, nullable: true })
  username!: string | null;

  @Column({ type: "varchar", length: 100, unique: true, nullable: true })
  email!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  password!: string | null;

  @Column({ name: "phone_number", type: "varchar", length: 20, nullable: true })
  phoneNumber!: string | null;

  @Column({ name: "profile_image", type: "text", nullable: true })
  profileImage!: string | null;

  @Column({ type: "varchar", length: 10, nullable: true })
  gender!: string | null;

  @Column({ name: "date_of_birth", type: "date", nullable: true })
  dateOfBirth!: string | null;

  @Column({ type: "text", nullable: true })
  address!: string | null;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column({ type: "enum", enum: ["Citizen", "Admin"], default: "Citizen" })
  role!: UserRole;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports!: Report[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications!: Notification[];

  @OneToMany(() => ReportStatusHistory, (history) => history.changedBy)
  reportStatusHistory!: ReportStatusHistory[];
}
