import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1779955910943 implements MigrationInterface {
    name = 'InitSchema1779955910943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(100) NULL, \`username\` varchar(50) NULL, \`email\` varchar(100) NULL, \`password\` varchar(255) NULL, \`phone_number\` varchar(20) NULL, \`profile_image\` text NULL, \`gender\` varchar(10) NULL, \`date_of_birth\` date NULL, \`address\` text NULL, \`bio\` text NULL, \`role\` enum ('Citizen', 'Admin') NOT NULL DEFAULT 'Citizen', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`notification_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`report_id\` int NULL, \`message\` text NULL, \`is_read\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`notification_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`report_images\` (\`image_id\` int NOT NULL AUTO_INCREMENT, \`report_id\` int NULL, \`image_url\` text NULL, \`uploaded_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`image_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`status_id\` int NOT NULL AUTO_INCREMENT, \`status_name\` varchar(50) NULL, PRIMARY KEY (\`status_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reports\` (\`report_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NULL, \`category_id\` int NULL, \`status_id\` int NULL DEFAULT '1', \`title\` varchar(150) NULL, \`description\` text NULL, \`location\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`report_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`category_id\` int NOT NULL AUTO_INCREMENT, \`category_name\` varchar(100) NULL, \`description\` text NULL, \`image_url\` text NULL, PRIMARY KEY (\`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`temp_users\` (\`tempUserId\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(100) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`otpCode\` varchar(6) NOT NULL, \`otpExpiresAt\` datetime NOT NULL, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_6a18a3e42ff2deecdbbb92e1d4\` (\`email\`), PRIMARY KEY (\`tempUserId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_9a8a82462cab47c73d25f49261f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_412af9b32c6225fe444454597f9\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`report_images\` ADD CONSTRAINT \`FK_9560cc9fd5449c70a6e4c42017c\` FOREIGN KEY (\`report_id\`) REFERENCES \`reports\`(\`report_id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_ca7a21eb95ca4625bd5eaef7e0c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_23d2ada1e9df0834c42df8d0fb0\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reports\` ADD CONSTRAINT \`FK_d71af40d9136c7264578670a0f9\` FOREIGN KEY (\`status_id\`) REFERENCES \`status\`(\`status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_d71af40d9136c7264578670a0f9\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_23d2ada1e9df0834c42df8d0fb0\``);
        await queryRunner.query(`ALTER TABLE \`reports\` DROP FOREIGN KEY \`FK_ca7a21eb95ca4625bd5eaef7e0c\``);
        await queryRunner.query(`ALTER TABLE \`report_images\` DROP FOREIGN KEY \`FK_9560cc9fd5449c70a6e4c42017c\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_412af9b32c6225fe444454597f9\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_9a8a82462cab47c73d25f49261f\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a18a3e42ff2deecdbbb92e1d4\` ON \`temp_users\``);
        await queryRunner.query(`DROP TABLE \`temp_users\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`reports\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`report_images\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
