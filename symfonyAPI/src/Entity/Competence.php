<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\ManyToMany;
use Symfony\Bundle\MakerBundle\Str;

#[ORM\Entity]
class Competence
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(name: "id_competence")]
    private int $id_competence;

    #[ORM\Column(length: 100,name: 'nom_c')]
    private ?string $nom_c;

    #[ORM\Column(length: 7,name: 'couleur_c', nullable:true)]
    private ?string $couleur_c;

    #[ManyToMany(targetEntity: Benevole::class, mappedBy: 'competences')]
    private Collection $benevoles;

    public function __construct() {
        $this->benevoles = new ArrayCollection();
    }
   
    public function getId(): int
    {
        return $this->id_competence;
    }

    public function setId(string $id): ?string
    {
        $this->id_competence = $id;

        return $this->id_competence;
    }

    public function getNom(): ?string
    {
        return $this->nom_c;
    }

    public function setNom(string $nom): ?string
    {
        $this->nom_c = $nom;

        return $this->nom_c;
    }

    public function getCouleurComp(string $couleur): ?string
    {
            return $this->couleur_c;
    }

    public function setCouleurComp(string $couleur): ?string
    {
        $this->couleur_c = $couleur;

        return $this->couleur_c;
    }
}
