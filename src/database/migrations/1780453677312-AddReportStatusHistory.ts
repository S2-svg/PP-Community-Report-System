import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReportStatusHistory1780453677312 implements MigrationInterface {
  name = "AddReportStatusHistory1780453677312";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`report_status_history\` (\`history_id\` int NOT NULL AUTO_INCREMENT, \`report_id\` int NOT NULL, \`previous_status_id\` int NULL, \`new_status_id\` int NOT NULL, \`changed_by_user_id\` int NULL, \`note\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`history_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` ADD CONSTRAINT \`FK_report_status_history_report\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` ADD CONSTRAINT \`FK_report_status_history_previous_status\` FOREIGN KEY (\`previous_status_id\`) REFERENCES \`status\`(\`status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` ADD CONSTRAINT \`FK_report_status_history_new_status\` FOREIGN KEY (\`new_status_id\`) REFERENCES \`status\`(\`status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` ADD CONSTRAINT \`FK_report_status_history_changed_by\` FOREIGN KEY (\`changed_by_user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` DROP FOREIGN KEY \`FK_report_status_history_changed_by\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` DROP FOREIGN KEY \`FK_report_status_history_new_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` DROP FOREIGN KEY \`FK_report_status_history_previous_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`report_status_history\` DROP FOREIGN KEY \`FK_report_status_history_report\``,
    );
    await queryRunner.query(`DROP TABLE \`report_status_history\``);
  }
}
