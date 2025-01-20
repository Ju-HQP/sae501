<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bundle\MakerBundle\Str;

#[ORM\Entity]
class Projet
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(name: "id_projet")]
    private int $id_projet;

    #[ORM\Column(length: 200, name: 'titre_p', unique:true)]
    private ?string $titre_p = null;

    #[ORM\Column(type:'text', length:65535, name: 'description_p')]
    private ?string $description_p = null;

    #[ORM\Column(length: 255, name: 'image_p')]
    private ?string $image_p = null;

    public function getId(): int
    {
        return $this->id_projet;
    }

    public function getTitre(): ?string
    {
        return $this->titre_p;
    }

    public function setTitre(string $titre): static
    {
        $this->titre_p = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description_p;
    }

    public function setDescription(string $description): static
    {
        $this->description_p = $description;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image_p;
    }

    public function setImage(string $image): static
    {
        $this->image_p = $image;

        return $this;
    }
}
