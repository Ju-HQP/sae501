<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bundle\MakerBundle\Str;

#[ORM\Entity]
class Actualite
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(name: "id_actualite")]
    private int $id_actualite;

    #[ORM\Column(length: 200, name: 'titre_a')]
    private ?string $titre_a = null;

    #[ORM\Column(type:'text', length:65535, name: 'description_a')]
    private ?string $description_a = null;

    #[ORM\Column(length: 255, name: 'date_a')]
    private ?string $date_a = null;

    #[ORM\Column(length: 255, name: 'image_a')]
    private ?string $image_a = null;

    public function getId(): int
    {
        return $this->id_actualite;
    }

    public function getTitre(): ?string
    {
        return $this->titre_a;
    }

    public function setTitre(string $titre): static
    {
        $this->titre_a = $titre;

        return $this;
    }

    public function getDate(): ?string
    {
        return $this->date_a;
    }

    public function setDate(string $date): static
    {
        $this->date_a = $date;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description_a;
    }

    public function setDescription(string $description): static
    {
        $this->description_a = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image_a;
    }

    public function setImage(string $image): static
    {
        $this->image_a = $image;

        return $this;
    }
}
