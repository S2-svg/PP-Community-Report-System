import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { Notification } from "./Notification";
import { ReportImage } from "./ReportImage";
import { Status } from "./Status";
import { User } from "./User";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn({ name: "report_id" })
  reportId!: number;

  @Column({ name: "user_id", type: "int", nullable: true })
  userId!: number | null;

  @Column({ name: "category_id", type: "int", nullable: true })
  categoryId!: number | null;

  @Column({ name: "status_id", type: "int", nullable: true, default: 1 })
  statusId!: number | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  title!: string | null;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "text", nullable: true })
  location!: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: "user_id" })
  user!: User | null;

  @ManyToOne(() => Category, (category) => category.reports)
  @JoinColumn({ name: "category_id" })
  category!: Category | null;

  @ManyToOne(() => Status, (status) => status.reports)
  @JoinColumn({ name: "status_id" })
  status!: Status | null;

  @OneToMany(() => ReportImage, (image) => image.report, { cascade: true })
  images!: ReportImage[];

  @OneToMany(() => Notification, (notification) => notification.report)
  notifications!: Notification[];
}
