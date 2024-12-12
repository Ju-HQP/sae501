<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use App\Entity\Benevole;

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
			$benevole->setNom("Trobu");
			$benevole->setPrenom("Berranger");
			$benevole->setPassword("1234");
			$benevole->setMail("brg.trobu@free.fr");
			$benevole->setTel("0647589501");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			// Les deux autres bénévoles ont des mdp aléatoires, mais pas hash
			$benevole = new Benevole();
			$benevole->setNom("Misstaire");
			$benevole->setPrenom("Martun");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("mart.mist@gmail.com");
			$benevole->setTel("0674854751");
			$benevole->setRoles(0);
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("Aconda");
			$benevole->setPrenom("Ahlan");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
			$benevole->setMail("ahlanaconda@hotmail.com");
			$benevole->setPhoto("https://thispersondoesnotexist.com/");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			$manager->flush();
		}
	}
}
