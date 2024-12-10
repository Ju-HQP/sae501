<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use App\Entity\Benevole;
use App\Entity\Actualite;

use Psr\Log\LoggerInterface;

class AppFixtures extends Fixture
{
	protected $logger;

	public function __construct(LoggerInterface $logger)
	{
		$this->logger = $logger;
	}

	public function load(ObjectManager $manager): void
	{
		if (count($manager->getRepository("App\Entity\Benevole")->findAll()) == 0) {
		
			$benevole = new Benevole();
			$benevole->setNom("HEDREUL");
			$benevole->setPrenom("Julien");
			$benevole->setPassword("1234");
			$benevole->setMail("hedrjul@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRoles("admin");
			$manager->persist($benevole);

			// Les deux autres bénévoles ont des mdp aléatoires, mais pas hash
			$benevole = new Benevole();
			$benevole->setNom("MARTIN");
			$benevole->setPrenom("Antoine");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("ant.martin@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRoles("benevole");
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("RETAUD");
			$benevole->setPrenom("Berranger");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("berranger.rt@gmail.com");
			$benevole->setPhoto("https://www.leparisien.fr/resizer/ct_WYEsReoHHR5VZonx9QrYcJq0=/622x971/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/O7DVELRLZVHOFH3ZLPNV53EEVI.jpg");
			$benevole->setRoles("admin");
			$manager->persist($benevole);

			$manager->flush();
		}

		if (count($manager->getRepository("App\Entity\Actualite")->findAll()) == 0) {
			
			$actualite = new Actualite();
            $actualite->setTitre("Actu 1");
            $actualite->setDate("12/12/12");
            $actualite->setDescription("Ceci est un essai numéro 1 pour les actualités. Blabla blublabla bleblibla bla bloblibloblo blablabla blu.");
            $actualite->setImage("imageActu1.png");
            $manager->persist($actualite);

            $actualite = new Actualite();
            $actualite->setTitre("Actu 2");
            $actualite->setDate("11/11/11");
            $actualite->setDescription("Ceci est un essai numéro 2 pour les actualités. Blabla blublabla bleblibla bla bloblibloblo blablabla blu.");
            $actualite->setImage("imageActu2.png");
            $manager->persist($actualite);

            $actualite = new Actualite();
            $actualite->setTitre("Actu 3");
            $actualite->setDate("10/10/10");
            $actualite->setDescription("Ceci est un essai numéro 3 pour les actualités. Blabla blublabla bleblibla bla bloblibloblo blablabla blu.");
            $actualite->setImage("imageActu3.png");
            $manager->persist($actualite);

            $actualite = new Actualite();
            $actualite->setTitre("Actu 4");
            $actualite->setDate("09/09/09");
            $actualite->setDescription("Ceci est un essai numéro 4 pour les actualités. Blabla blublabla bleblibla bla bloblibloblo blablabla blu.");
            $actualite->setImage("imageActu4.png");
            $manager->persist($actualite);

            $manager->flush();
		}
	}
}
