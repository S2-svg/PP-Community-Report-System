import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "./Report";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn({ name: "category_id" })
  categoryId!: number;

  @Column({ name: "category_name", type: "varchar", length: 100, nullable: true })
  categoryName!: string | null;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ name: "image_url", type: "text", nullable: true })
  imageUrl!: string | null;

  @OneToMany(() => Report, (report) => report.category)
  reports!: Report[];
}
