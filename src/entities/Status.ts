import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn({ name: "status_id" })
  statusId!: number;

  @Column({ name: "status_name", type: "varchar", length: 50, nullable: true })
  statusName!: string | null;

  @OneToMany(() => Report, (report) => report.status)
  reports!: Report[];
}
