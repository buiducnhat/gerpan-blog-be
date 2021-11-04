import {MigrationInterface, QueryRunner} from "typeorm";

export class db1635993365283 implements MigrationInterface {
    name = 'db1635993365283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(100) NOT NULL, \`lastName\` varchar(100) NULL, \`avatar\` varchar(255) NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(15) NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`password\` varchar(255) NULL, \`lastLogin\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`social\` (\`id\` int NOT NULL AUTO_INCREMENT, \`socialId\` varchar(255) NOT NULL, \`provider\` enum ('facebook', 'google') NOT NULL, \`firstName\` varchar(50) NOT NULL, \`lastName\` varchar(50) NULL, \`avatar\` varchar(255) NULL, \`email\` varchar(50) NOT NULL, \`phone\` varchar(15) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`social\` ADD CONSTRAINT \`FK_4cda297c26dea7a3b8d08b9ba18\` FOREIGN KEY (\`userId\`) REFERENCES \`gerpan_blog\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`social\` DROP FOREIGN KEY \`FK_4cda297c26dea7a3b8d08b9ba18\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`social\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`user\``);
    }

}
