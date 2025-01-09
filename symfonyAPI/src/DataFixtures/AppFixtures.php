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
		
			$competence2 = new Competence();
			$competence2->setNom("Graphiste");
			$manager->persist($competence2);

			$competence = new Competence();
			$competence->setNom("Designer");
			$manager->persist($competence);

			$competence = new Competence();
			$competence->setNom("Soudeur");
			$manager->persist($competence);

			$competence = new Competence();
			$competence->setNom("Fraiseur");
			$manager->persist($competence);

			$benevole = new Benevole();
			$benevole->setNom("HEDREUL");
			$benevole->setPrenom("Julien");
			$benevole->setPassword("1234");
			$benevole->setMail("hedrjul@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			// Les deux autres bénévoles ont des mdp aléatoires, mais pas hash
			$benevole = new Benevole();
			$benevole->setNom("MARTIN");
			$benevole->setPrenom("Antoine");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("ant.martin@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRoles(0);
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("RETAUD");
			$benevole->setPrenom("Berranger");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("ahlanaconda@hotmail.com");
			$benevole->setTel("0672284157");
			$benevole->setPhoto("https://thispersondoesnotexist.com/");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("Tano");
			$benevole->setPrenom("Marie");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("m.tano@gmail.com");
			$benevole->setTel("0764412869");
			$benevole->setPhoto("https://cache.cosmopolitan.fr/data/photo/w1000_c17/3y/femme_sourire.jpg");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			$manager->flush();
		}
	}
}
