<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use App\Entity\Benevole;
use App\Entity\Competence;

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

			$competence = new Competence();
			$competence->setNom("Tavernier");
			$manager->persist($competence);

			$competence = new Competence();
			$competence->setNom("Roturier");
			$manager->persist($competence);

			$manager->flush();
		}
	}
}
