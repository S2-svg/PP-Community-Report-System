import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";
import { ReportStatusHistory } from "./ReportStatusHistory";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn({ name: "status_id" })
  statusId!: number;

  @Column({ name: "status_name", type: "varchar", length: 50, nullable: true })
  statusName!: string | null;

  @OneToMany(() => Report, (report) => report.status)
  reports!: Report[];

  @OneToMany(() => ReportStatusHistory, (history) => history.previousStatus)
  previousStatusHistory!: ReportStatusHistory[];

  @OneToMany(() => ReportStatusHistory, (history) => history.newStatus)
  newStatusHistory!: ReportStatusHistory[];
}
