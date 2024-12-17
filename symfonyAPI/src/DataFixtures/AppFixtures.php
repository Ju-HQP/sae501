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
		
			$competence = new Competence();
			$competence->setNom("Graphiste");
			$manager->persist($competence);

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
			$benevole->setNom("Trobu");
			$benevole->setPrenom("Berranger");
			$benevole->setPassword("1234");
<<<<<<< HEAD
			$benevole->setMail("hedrjul@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRoles(['ROLE_ADMIN']);
=======
			$benevole->setMail("brg.trobu@free.fr");
			$benevole->setTel("0647589501");
			$benevole->setPhoto("https://st3.depositphotos.com/1743476/16188/i/450/depositphotos_161885998-stock-photo-mature-mixed-race-man-smiling.jpg");
			$benevole->setRoles(1);
>>>>>>> main
			$manager->persist($benevole);

			// Les deux autres bénévoles ont des mdp aléatoires, mais pas hash
			$benevole = new Benevole();
			$benevole->setNom("Misstaire");
			$benevole->setPrenom("Martun");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
<<<<<<< HEAD
			$benevole->setMail("ant.martin@gmail.com");
			$benevole->setTel("0767347406");
			$benevole->setRoles(['ROLE_USER']);
=======
			$benevole->setMail("mart.mist@gmail.com");
			$benevole->setTel("0674854751");
			$benevole->setPhoto("https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/MTc1YWE2ZDQtMThiMi00NTM1LTk3YzctMzk0MmZhMjQ4OGZm_167911d1-0c4c-4aeb-9c3c-3be12e16cdf9_paul-schafer-ndcn_8jiaqw-unsplash-1-scaled.jpeg");
			$benevole->setRoles(0);
>>>>>>> main
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("Aconda");
			$benevole->setPrenom("Ahlan");
			$randomMdp = random_bytes(20);
			$benevole->setPassword($randomMdp);
<<<<<<< HEAD
			$benevole->setMail("berranger.rt@gmail.com");
			$benevole->setPhoto("https://www.leparisien.fr/resizer/ct_WYEsReoHHR5VZonx9QrYcJq0=/622x971/cloudfront-eu-central-1.images.arcpublishing.com/leparisien/O7DVELRLZVHOFH3ZLPNV53EEVI.jpg");
			$benevole->setRoles(['ROLE_USER']);
=======
			$benevole->setMail("ahlanaconda@hotmail.com");
			$benevole->setTel("0672284157");
			$benevole->setPhoto("https://thispersondoesnotexist.com/");
			$benevole->setRoles(1);
>>>>>>> main
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
