<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250123100050 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE reset_password_request (id INT AUTO_INCREMENT NOT NULL, selector VARCHAR(20) NOT NULL, hashed_token VARCHAR(100) NOT NULL, requested_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', expires_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE reset_password_request ADD CONSTRAINT FK_7CE748ABF396750 FOREIGN KEY (id) REFERENCES benevole (id_benevole)');
        $this->addSql('ALTER TABLE benevole CHANGE tel_b tel_b VARCHAR(15) DEFAULT NULL, CHANGE photo photo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE competence CHANGE couleur_c couleur_c VARCHAR(7) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reset_password_request DROP FOREIGN KEY FK_7CE748ABF396750');
        $this->addSql('DROP TABLE reset_password_request');
        $this->addSql('ALTER TABLE benevole CHANGE tel_b tel_b VARCHAR(15) DEFAULT \'NULL\', CHANGE photo photo VARCHAR(255) DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE competence CHANGE couleur_c couleur_c VARCHAR(7) DEFAULT \'NULL\'');
    }
}
