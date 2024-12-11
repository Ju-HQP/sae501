<?php

namespace App\Entity;

use App\Repository\BenevoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\InverseJoinColumn;
use Doctrine\ORM\Mapping\JoinColumn;
use Symfony\Bundle\MakerBundle\Str;
// UserInterface pour la gestion du mot de passe
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: BenevoleRepository::class)]
class Benevole implements UserInterface, PasswordAuthenticatedUserInterface
{ 
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "AUTO")]
    #[ORM\Column(name: "id_benevole")]
    private int $id_benevole;

    #[ORM\Column(length: 100,name: 'nom_b')]
    private ?string $nom_b = null;

    #[ORM\Column(length: 100,name: 'prenom_b')]
    private ?string $prenom_b = null;

    #[ORM\Column(length: 255,name: 'mdp_b')]
    private ?string $mdp_b = null;

    #[ORM\Column(length: 100,name: 'mail_b')]
    private ?string $mail_b = null;

    // nullable pour autoriser la valeur null
    #[ORM\Column(length: 15,name: 'tel_b', nullable:true)]
    private ?string $tel_b = null;
    
    #[ORM\Column(length: 255,name: 'photo', nullable:true)]
    private ?string $photo_b = null;

    #[ORM\Column(type:'json', name: 'role_b')]
    private ?array $role_b = null;

    // Many To Many bidirectionnelle pour les compétences et les bénévoles
        // Table jointe
    #[ORM\JoinTable(name: "Benevole_Competence")]
    #[JoinColumn(name: 'id_benevole', referencedColumnName: "id_benevole", onDelete: "CASCADE")]
    #[InverseJoinColumn(name: 'id_competence', referencedColumnName: 'id_competence', onDelete: "CASCADE")]
    #[ORM\ManyToMany(targetEntity: Competence::class, inversedBy: 'benevoles')]
    
    private Collection $competences;

    public function __construct()
    {
        $this->competences = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id_benevole;
    }

    public function getNom(): ?string
    {
        return $this->nom_b;
    }
    public function setNom(string $nom): static
    {
        $this->nom_b = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom_b;
    }
    public function setPrenom(string $prenom): static
    {
        $this->prenom_b = $prenom;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->mdp_b;
    }

    public function setPassword(string $mdp): static
    {
        $this->mdp_b = $mdp;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail_b;
    }

    public function setMail(string $mail): static
    {
        $this->mail_b = $mail;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel_b;
    }

    public function setTel(?string $tel): static
    {
        $this->tel_b = $tel;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo_b;
    }

    public function setPhoto(?string $photo): static
    {
        $this->photo_b = $photo;

        return $this;
    }


    // public function getRole(): ?string
    // {
    //     $roles[] = 'ROLE_USER';
    //     return $this->role_b;
    // }

    public function getRoles(): array
    {
        $roles = $this->role_b ?? [];
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }
    
    public function setRoles(array $roles): static
    {
        $this->role_b = $roles;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        // Utilisez un identifiant unique, comme l'email ou le nom
        return $this->mail_b;
    }

    public function eraseCredentials(): void
    {
        // Efface les données sensibles si nécessaire
    }

}

