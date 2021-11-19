import {MigrationInterface, QueryRunner} from "typeorm";

export class db1637310600594 implements MigrationInterface {
    name = 'db1637310600594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` DROP FOREIGN KEY \`FK_8a73d40a64b69a9644e5076b584\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`user\` ADD \`bio\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` ADD CONSTRAINT \`FK_8a73d40a64b69a9644e5076b584\` FOREIGN KEY (\`parentId\`) REFERENCES \`gerpan_blog\`.\`article_comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` DROP FOREIGN KEY \`FK_8a73d40a64b69a9644e5076b584\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`user\` DROP COLUMN \`bio\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` ADD CONSTRAINT \`FK_8a73d40a64b69a9644e5076b584\` FOREIGN KEY (\`parentId\`) REFERENCES \`gerpan_blog\`.\`article_comment\`(\`id\`) ON DELETE CASCADE ON UPDATE RESTRICT`);
    }

}
