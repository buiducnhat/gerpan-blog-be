import {MigrationInterface, QueryRunner} from "typeorm";

export class db1636011167247 implements MigrationInterface {
    name = 'db1636011167247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_tag\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_category\` DROP COLUMN \`slug\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_category\` ADD \`slug\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article\` ADD \`slug\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_tag\` ADD \`slug\` varchar(100) NOT NULL`);
    }

}
