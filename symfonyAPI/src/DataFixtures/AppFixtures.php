<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use App\Entity\Benevole;
use App\Entity\Actualite;
use App\Entity\Competence;
use App\Entity\Projet;
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
			$benevole->setMail("brg.trobu@free.fr");
			$benevole->setTel("0647589501");
			$benevole->setPhoto("https://st3.depositphotos.com/1743476/16188/i/450/depositphotos_161885998-stock-photo-mature-mixed-race-man-smiling.jpg");
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
			$benevole->setPhoto("https://www.utopix.com/fr/blog/wp-content/uploads/2024/04/MTc1YWE2ZDQtMThiMi00NTM1LTk3YzctMzk0MmZhMjQ4OGZm_167911d1-0c4c-4aeb-9c3c-3be12e16cdf9_paul-schafer-ndcn_8jiaqw-unsplash-1-scaled.jpeg");
			$benevole->setRoles(0);
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("Aconda");
			$benevole->setPrenom("Ahlan");
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
			$benevole->setPassword("$2y$08\$W9HPfteJJ42GLyzynauqw.0.AOxSV6vMlLN6POETyyjGLj6AA7mEe");
			$benevole->setMail("m.tano@gmail.com");
			$benevole->setTel("0764412869");
			$benevole->setPhoto("https://cache.cosmopolitan.fr/data/photo/w1000_c17/3y/femme_sourire.jpg");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("Beta");
			$benevole->setPrenom("Test");
			$benevole->setPassword("$2y$08\$z5cHfGcwwPoahQ7q3QXHI.1BLjzOXIzfxQrpCFpBMdaeNYQ39QqPy");
			$benevole->setMail("test@free.fr");
			$benevole->setTel("0764412869");
			$benevole->setPhoto("https://thispersondoesnotexist.com/");
			$benevole->setRoles(1);
			$manager->persist($benevole);

			$benevole = new Benevole();
			$benevole->setNom("Ben");
			$benevole->setPrenom("Ben");
			$benevole->setPassword("$2y$08\$Q7y54/MZNwi85tm2a/06TOgDvl3.wPJRvlAkDP9gLqrUH6eWGvTd6");
			$benevole->setMail("ben@free.fr");
			$benevole->setTel("0485956514");
			$benevole->setRoles(0);
			$manager->persist($benevole);

			$manager->flush();
		}

		if (count($manager->getRepository("App\Entity\Projet")->findAll()) == 0) {
			$project = new Projet();
			$project->setTitre('Orthèse');
			$project->setDescription("Réalisation d'une orthèse pour une personne amputée des 2 bras, avec support pour stylo et couvert (fourchette, cuillère...), sur la base d'un scan 3D du bras, modélisation et impression 3D");
			$project->setImage('https://www.mayhumanlab.fr/wp-content/themes/lablab/img/projet_orthese.jpg');
			$manager->persist($project);

			$project = new Projet();
			$project->setTitre('Projet Cendrillon');
			$project->setDescription("Réalisation d'un dispositif d'assistance à l'enfilage de chaussure pour une personne en fauteuil roulant, conception, modélisation, impression 3D et découpe bois");
			$project->setImage('https://www.mayhumanlab.fr/wp-content/themes/lablab/img/projet_cendrillon.jpg');
			$manager->persist($project);

			$manager->flush();
		}

		if (count($manager->getRepository("App\Entity\Actualite")->findAll()) == 0) {

			$actualite = new Actualite();
			$actualite->setTitre("Actu 1");
			$actualite->setDate("2012-12-12");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$manager->persist($actualite);

			$actualite = new Actualite();
			$actualite->setTitre("Actu 2");
			$actualite->setDate("2011-11-11");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1737&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$manager->persist($actualite);

			$actualite = new Actualite();
			$actualite->setTitre("Actu 3");
			$actualite->setDate("2010-10-10");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$manager->persist($actualite);

			$actualite = new Actualite();
			$actualite->setTitre("Actu 4");
			$actualite->setDate("2009-09-09");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1706700722877-1b014f34f383?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$manager->persist($actualite);

			$manager->flush();
		}
	}
}
