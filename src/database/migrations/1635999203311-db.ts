import {MigrationInterface, QueryRunner} from "typeorm";

export class db1635999203311 implements MigrationInterface {
    name = 'db1635999203311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`article_comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` tinytext NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`articleId\` int NULL, \`userId\` int NULL, \`parentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`article_tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`content\` varchar(255) NULL, \`slug\` varchar(100) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`article\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` tinytext NULL, \`banner\` varchar(255) NOT NULL, \`published\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`content\` text NOT NULL, \`authorId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`article_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`content\` varchar(255) NULL, \`level\` enum ('1', '2') NOT NULL, \`slug\` varchar(100) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`gerpan_blog\`.\`article_tags_article_tag\` (\`articleId\` int NOT NULL, \`articleTagId\` int NOT NULL, INDEX \`IDX_f71240564787d60ba6fd56cfeb\` (\`articleId\`), INDEX \`IDX_86efef5ba84fd786e34f6d7508\` (\`articleTagId\`), PRIMARY KEY (\`articleId\`, \`articleTagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` ADD CONSTRAINT \`FK_4d5ab30629a42bad659fe1d4da6\` FOREIGN KEY (\`articleId\`) REFERENCES \`gerpan_blog\`.\`article\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` ADD CONSTRAINT \`FK_d501e7c60f674a1d44b30fcaba8\` FOREIGN KEY (\`userId\`) REFERENCES \`gerpan_blog\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` ADD CONSTRAINT \`FK_8a73d40a64b69a9644e5076b584\` FOREIGN KEY (\`parentId\`) REFERENCES \`gerpan_blog\`.\`article_comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article\` ADD CONSTRAINT \`FK_a9c5f4ec6cceb1604b4a3c84c87\` FOREIGN KEY (\`authorId\`) REFERENCES \`gerpan_blog\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article\` ADD CONSTRAINT \`FK_12824e4598ee46a0992d99ba553\` FOREIGN KEY (\`categoryId\`) REFERENCES \`gerpan_blog\`.\`article_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_category\` ADD CONSTRAINT \`FK_a05f83aedf4a91ae5d7c956e59c\` FOREIGN KEY (\`parentId\`) REFERENCES \`gerpan_blog\`.\`article_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_tags_article_tag\` ADD CONSTRAINT \`FK_f71240564787d60ba6fd56cfeb3\` FOREIGN KEY (\`articleId\`) REFERENCES \`gerpan_blog\`.\`article\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_tags_article_tag\` ADD CONSTRAINT \`FK_86efef5ba84fd786e34f6d75084\` FOREIGN KEY (\`articleTagId\`) REFERENCES \`gerpan_blog\`.\`article_tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_tags_article_tag\` DROP FOREIGN KEY \`FK_86efef5ba84fd786e34f6d75084\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_tags_article_tag\` DROP FOREIGN KEY \`FK_f71240564787d60ba6fd56cfeb3\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_category\` DROP FOREIGN KEY \`FK_a05f83aedf4a91ae5d7c956e59c\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article\` DROP FOREIGN KEY \`FK_12824e4598ee46a0992d99ba553\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article\` DROP FOREIGN KEY \`FK_a9c5f4ec6cceb1604b4a3c84c87\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` DROP FOREIGN KEY \`FK_8a73d40a64b69a9644e5076b584\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` DROP FOREIGN KEY \`FK_d501e7c60f674a1d44b30fcaba8\``);
        await queryRunner.query(`ALTER TABLE \`gerpan_blog\`.\`article_comment\` DROP FOREIGN KEY \`FK_4d5ab30629a42bad659fe1d4da6\``);
        await queryRunner.query(`DROP INDEX \`IDX_86efef5ba84fd786e34f6d7508\` ON \`gerpan_blog\`.\`article_tags_article_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_f71240564787d60ba6fd56cfeb\` ON \`gerpan_blog\`.\`article_tags_article_tag\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`article_tags_article_tag\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`article_category\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`article\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`article_tag\``);
        await queryRunner.query(`DROP TABLE \`gerpan_blog\`.\`article_comment\``);
    }

}
