import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("temp_users")
export class TempUser {
  @PrimaryGeneratedColumn()
  tempUserId!: number;

  @Column({ type: "varchar", length: 100 })
  fullName!: string;

  @Column({ type: "varchar", length: 100 })
  username!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "varchar", length: 6 })
  otpCode!: string;

  @Column({ type: "datetime" })
  otpExpiresAt!: Date;

  @Column({ type: "boolean", default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
