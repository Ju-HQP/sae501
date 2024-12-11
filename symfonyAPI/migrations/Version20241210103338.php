<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241210103338 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE benevole CHANGE tel_b tel_b VARCHAR(15) DEFAULT NULL, CHANGE photo photo VARCHAR(255) DEFAULT NULL, CHANGE role_b role_b JSON NOT NULL');
        $this->addSql('ALTER TABLE competence CHANGE couleur_c couleur_c VARCHAR(7) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE benevole CHANGE tel_b tel_b VARCHAR(15) DEFAULT \'NULL\', CHANGE photo photo VARCHAR(255) DEFAULT \'NULL\', CHANGE role_b role_b LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`');
        $this->addSql('ALTER TABLE competence CHANGE couleur_c couleur_c VARCHAR(7) DEFAULT \'NULL\'');
    }
}
