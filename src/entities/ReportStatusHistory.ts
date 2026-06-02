import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";
import { Status } from "./Status";
import { User } from "./User";

@Entity("report_status_history")
export class ReportStatusHistory {
  @PrimaryGeneratedColumn({ name: "history_id" })
  historyId!: number;

  @Column({ name: "report_id", type: "int" })
  reportId!: number;

  @Column({ name: "previous_status_id", type: "int", nullable: true })
  previousStatusId!: number | null;

  @Column({ name: "new_status_id", type: "int" })
  newStatusId!: number;

  @Column({ name: "changed_by_user_id", type: "int", nullable: true })
  changedByUserId!: number | null;

  @Column({ type: "text", nullable: true })
  note!: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => Report, (report) => report.statusHistory, { onDelete: "CASCADE" })
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @ManyToOne(() => Status, (status) => status.previousStatusHistory)
  @JoinColumn({ name: "previous_status_id" })
  previousStatus!: Status | null;

  @ManyToOne(() => Status, (status) => status.newStatusHistory)
  @JoinColumn({ name: "new_status_id" })
  newStatus!: Status;

  @ManyToOne(() => User, (user) => user.reportStatusHistory)
  @JoinColumn({ name: "changed_by_user_id" })
  changedBy!: User | null;
}
