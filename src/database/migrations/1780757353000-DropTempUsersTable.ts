import { MigrationInterface, QueryRunner } from "typeorm";

export class DropTempUsersTable1780757353000 implements MigrationInterface {
  name = "DropTempUsersTable1780757353000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`temp_users\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`temp_users\` (\`tempUserId\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(100) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`otpCode\` varchar(6) NOT NULL, \`otpExpiresAt\` datetime NOT NULL, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`failedAttempts\` int NOT NULL DEFAULT 0, \`lastResendAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`tempUserId\`), UNIQUE INDEX \`IDX_6a18a3e42ff2deecdbbb92e1d4\` (\`email\`)) ENGINE=InnoDB`,
    );
  }
}
