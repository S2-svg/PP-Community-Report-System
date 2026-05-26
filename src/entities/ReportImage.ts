import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";

@Entity("report_images")
export class ReportImage {
  @PrimaryGeneratedColumn({ name: "image_id" })
  imageId!: number;

  @Column({ name: "report_id", type: "int", nullable: true })
  reportId!: number | null;

  @Column({ name: "image_url", type: "text", nullable: true })
  imageUrl!: string | null;

  @CreateDateColumn({ name: "uploaded_at", type: "timestamp" })
  uploadedAt!: Date;

  @ManyToOne(() => Report, (report) => report.images, { onDelete: "CASCADE" })
  @JoinColumn({ name: "report_id" })
  report!: Report | null;
}
