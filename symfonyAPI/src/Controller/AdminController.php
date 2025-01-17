<?php

namespace App\Controller;

use Doctrine\DBAL\Exception\ConstraintViolationException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;

use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;

use Psr\Log\LoggerInterface;
// Pour l'entité
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Benevole;
use App\Entity\Actualite;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;

use Symfony\Component\HttpKernel\Event\ResponseEvent;
use App\Entity\Projet;
// Pour la gestion du mot de passe
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class AdminController extends AbstractController
{
	private EntityManagerInterface $entityManager;
	private LoggerInterface $logger;

	public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
	{
		$this->entityManager = $entityManager;
		$this->logger = $logger;
	}

	// // #[Route('/admin/benevoles/{id}', name: 'allow-retrieve-a-product', methods: ['OPTIONS'])]
	// #[Route('/api/benevoles', name: 'allow-create-a-product', methods: ['OPTIONS'])]
	// public function allowCreateAProduct(Request $request): Response
	// {
	// 	$response = new Response(); // Action qui autorise le options
	// 	$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
	// 	$response->headers->set('Access-Control-Allow-Origin', '*');
	// 	$response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
	// 	$response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
	// 	return $response;
	// }

	#[Route('/api/benevoles', name: 'adminBenevoles', methods: ['GET'])]
	public function adminBenevolesAction(Security $security): Response
	{

		$user = $security->getUser();
	
		if (!$user) {
			return new JsonResponse(['error' => 'Access denied'], 403);
		}
		$query = $this->entityManager->createQuery("SELECT b,c FROM App\Entity\Benevole b LEFT JOIN b.competences c");
		$benevoles = $query->getArrayResult(); // ou getResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->setContent(json_encode($benevoles));
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	// Fonction pour l'ajout d'un nouveau Bénévole
	// le paramètre passwordhasher vient du fichier security.yaml

	#[Route('/api/benevoles', name: 'adminBenevolesAjouter', methods: ['POST'])]
	public function adminBenevolesAjouterAction(Request $request, UserPasswordHasherInterface $passwordHasher): Response
	{
		// Récupérer les données JSON
		$data = json_decode($request->getContent(), true);

		if (!$data) {
			return new Response('Invalid JSON', Response::HTTP_BAD_REQUEST);
		}

		// Créer un nouvel objet Benevole
		$benevole = new Benevole();
		$benevole->setNom($data['nom_b'] ?? '')
			->setPrenom($data['prenom_b'] ?? '')
			// le mot de passe est généré automatiquement, on ne doit pas recevoir de données depuis le front pour le mdp
			->setMail($data['mail_b'] ?? '')
			->setTel($data['tel_b'] ?? null)
			->setPhoto($data['photo_b'] ?? null)
			->setRoles($data['role_b'] ?? 0);

		// --- Génération du mdp aléatoire
		$randomMdp = random_bytes(10);
		$test = "test";
		// --- Hash du mot de passe
		$hashedPassword = $passwordHasher->hashPassword($benevole, $test);
		// ajout à l'objet Benevole
		$benevole->setPassword($hashedPassword);


		// Sauvegarder dans la base de données
		$this->entityManager->persist($benevole);
		$this->entityManager->flush();

		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Benevole a");
		$benevoles = $query->getArrayResult(); // ou getResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_CREATED);
		//on encode le dernier élément du tableau, il s'agit de celui qu'on vient de créer car on ne peut pas encoder directement l'objet $benevole
		$response->setContent(json_encode($benevoles[sizeof($benevoles)-1]));
		return $response;
	}

	#[Route('/api/benevoles/{id}', name: 'adminBenevolesSupprimer', methods: ['DELETE'])]
    public function adminBenevolesSupprimerAction(String $id): Response
    {
        // Récupérer les données JSON
        $benevole = $this->entityManager->getRepository(Benevole::class)->find($id);

        if ($benevole) {
            $this->entityManager->remove($benevole);
            $this->entityManager->flush();
    
            //return new Response(null, 'benevole resource deleted' . $id); 
            $response = new Response;
            $response->setStatusCode(Response::HTTP_NO_CONTENT);
            $response->setContent(json_encode(array(['message' => 'benevole ressource deleted: benevole was deleted ' . $id])));
            
            return $response;
            // 204 No Content
        } else {
            $response = new Response;
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
            $response->setContent(json_encode(array(['message' => 'Resource not found: No benevole found for id ' . $id])));
            return $response;
            // 404 Not Found
        }
    }


	#[Route('/api/benevoles/{id}', name: 'adminBenevolesModifier', methods: ['PUT'])]
	public function adminBenevolesModifierAction(Request $request, String $id): Response
	{

		$data = json_decode($request->getContent(), true);

		if (!$data) {
			$response = new Response;
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			$response->setContent(json_encode(['message' => 'Invalid or missing JSON data']));
			return $response;
		}

		// Récupérer les données JSON
		$benevole = $this->entityManager->getRepository(Benevole::class)->find($id);

		if ($benevole) {
			$benevole->setPrenom($data['prenom_b'] ?? $benevole->getPrenom())
					  ->setNom($data['nom_b'] ?? $benevole->getNom())
					//   ->setPassword($data['mdp_b'] ?? $benevole->getPassword())
					  ->setMail($data['mail_b'] ?? $benevole->getMail())
					  ->setTel($data['tel_b'] ?? $benevole->getTel())
					  ->setRoles($data['role_b'] ?? $benevole->getRoles());
					//  ->setComp($data[''] ?? $benevole->getComp())
					//  ->setImage($data['photo_b'] ?? $benevole->getPhoto());
			$this->entityManager->persist($benevole);
			$this->entityManager->flush();

			// $query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Benevole a");
			// $benevoles = $query->getArrayResult();

			$response = new Response();
			$response->setStatusCode(Response::HTTP_OK);
			$response->setContent(json_encode(['id_benevole' => $benevole->getId(), 'nom_b' => $benevole->getNom(), 'prenom_b' => $benevole->getPrenom(), 'mail_b' => $benevole->getMail(), 'tel_b' => $benevole->getTel(), 'role_b' => $benevole->getRoles()]), Response::HTTP_CREATED, [
                'Content-Type' => 'application/json',
            ]);
			return $response;
		} else {
			$response = new Response;
			$response->setStatusCode(Response::HTTP_NOT_FOUND);
			$response->setContent(json_encode(array(['message' => 'Bénévole non trouvé'] . $id)));
			return $response;
			// 404 Not Found
		}
	}
	

	//------------------------------------ ACTUALITE ------------------------------------//

	// #[Route('/api/actualites/{id}', name: 'allow-retrieve-actuality', methods: ['OPTIONS'])]
   	// #[Route('/api/actualites', name: 'allow-create-actuality', methods: ['OPTIONS'])]
   	// public function allowActuality(Request $request): Response
   	// {
    //    $response = new Response(); // Action qui autorise le options
    //    $response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
    //    $response->headers->set('Access-Control-Allow-Origin', '*');
    //    $response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
    //    $response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
    //    return $response;
   	// }
	
	#[Route('/api/actualites', name: 'adminActualites', methods: ['GET'])]
	public function adminActualitesAction(): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Actualite a");
		$actualites = $query->getArrayResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK);
		$response->setContent(json_encode($actualites));
		return $response;
	}

	#[Route('/api/actualites', name: 'adminActualitesAjouter', methods: ['POST'])]
	public function adminActualitesAjouterAction(Request $request): Response
	{
		$data = json_decode($request->getContent(), true);

		if (!$data) {
			return new Response('Invalid JSON', Response::HTTP_BAD_REQUEST);
		}
	
		$actualite = new Actualite();
		$actualite->setTitre($data['titre_a'] ?? '')
				  ->setDescription($data['description_a'] ?? '')
				  ->setDate($data['date_a'] ?? '')
				  ->setImage($data['image_a'] ?? '');
	
		$this->entityManager->persist($actualite);
		$this->entityManager->flush();

		$response = new Response();
	    $response->setContent(json_encode(['id_actualite' => $actualite->getId(), 'titre_a' => $actualite->getTitre(), 'description_a' => $actualite->getDescription(), 'date_a' => $actualite->getDate(), 'image_a' => $actualite->getImage()]), Response::HTTP_CREATED, [
			'Content-Type' => 'application/json',
		]);
		$response->setStatusCode(Response::HTTP_CREATED);
		return $response;
	}

	#[Route('/api/actualites/{idActualite}', name: 'adminActualitesSupprimer', methods: ['DELETE'])]
	public function adminActualitesSupprimerAction(string $idActualite): Response
	{

		// Récupérer les données JSON
		$actualite = $this->entityManager->getRepository(Actualite::class)->find($idActualite);

		if ($actualite) {
			$this->entityManager->remove($actualite);
			$this->entityManager->flush();

			//return new Response(null, 'actualite resource deleted' . $id); 
			$response = new Response;
			$response->setContent(json_encode(array(['message' => 'actualite ressource deleted: actualite was deleted ' . $idActualite])));
			$response->setStatusCode(Response::HTTP_NO_CONTENT);
			
			return $response;
			// 204 No Content

		} else {
			$response = new Response;
			$response->setStatusCode(Response::HTTP_NOT_FOUND);
			$response->setContent(json_encode(array(['message' => 'Resource not found: No actualite found for id ' . $idActualite])));
			return $response;
			// 404 Not Found

		}

	}
	

	#[Route('/api/actualites/{idActualite}', name: 'adminActualitesModifier', methods: ['PUT'])]
	public function adminActualitesModifierAction(string $idActualite, Request $request): Response
	{
		$data = json_decode($request->getContent(), true);
	
		if (!$data) {
			$response = new Response;
			$response->setStatusCode(Response::HTTP_BAD_REQUEST);
			$response->setContent(json_encode(['message' => 'Invalid or missing JSON data']));
			return $response;
		}
	
		$actualite = $this->entityManager->getRepository(Actualite::class)->find($idActualite);

		if ($actualite) {
			$actualite->setTitre($data['titre_a'] ?? $actualite->getTitre())
					  ->setDescription($data['description_a'] ?? $actualite->getDescription())
					  ->setDate($data['date_a'] ?? $actualite->getDate())
					  ->setImage($data['image_a'] ?? $actualite->getImage());
	
			$this->entityManager->persist($actualite);
			$this->entityManager->flush();
	
			$response = new Response;
			$response->setStatusCode(Response::HTTP_OK);
			$response->setContent(json_encode(['id_actualite' => $actualite->getId(), 'titre_a' => $actualite->getTitre(), 'description_a' => $actualite->getDescription(), 'date_a' => $actualite->getDate(), 'image_a' => $actualite->getImage()]), Response::HTTP_CREATED, [
				'Content-Type' => 'application/json',
			]);
			return $response;
			
		}else{
			$response = new Response;
			$response->setStatusCode(Response::HTTP_NOT_FOUND);
			$response->setContent(json_encode(['message' => 'Resource not found: No actualite found for id ' . $idActualite]));
			return $response;
		}
	}




		//------------------------------------ PROJET ------------------------------------//

		#[Route('/api/projects/{id}', name: 'allow-retrieve-project', methods: ['OPTIONS'])]
		#[Route('/api/projects', name: 'allow-create-project', methods: ['OPTIONS'])]
		public function allowProject(Request $request): Response
		{
		$response = new Response(); // Action qui autorise le options
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
		$response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
		return $response;
		}
	 
	 #[Route('/api/projects', name: 'adminProjects', methods: ['GET'])]
	 public function adminProjectsAction(): Response
	 {
		 $query = $this->entityManager->createQuery("SELECT p FROM App\Entity\Projet p");
		 $project = $query->getArrayResult();
		 $response = new Response();
		 $response->setStatusCode(Response::HTTP_OK);
		 $response->setContent(json_encode($project));
		 $response->headers->set('Content-Type', 'application/json');
		 $response->headers->set('Access-Control-Allow-Origin', '*');
		 return $response;
	 }
 
	 #[Route('/api/projects', name: 'adminProjectsAjouter', methods: ['POST'])]
	 public function adminProjectsAjouterAction(Request $request): Response
	 {
		 $data = json_decode($request->getContent(), true);
 
		 if (!$data) {
			 return new Response('Invalid JSON', Response::HTTP_BAD_REQUEST);
		 }
	 
		 $project = new Projet();
		 $project->setTitre($data['titre_p'] ?? '')
				   ->setDescription($data['description_p'] ?? '')
				   ->setImage($data['image_p'] ?? '');
	 
		 $this->entityManager->persist($project);
		 $this->entityManager->flush();
 
		 $response = new Response();
		 $response->setContent(json_encode(['id_projet' => $project->getId(), 'titre_p' => $project->getTitre(), 'description_p' => $project->getDescription(), 'image_p' => $project->getImage()]), Response::HTTP_CREATED, [
			 'Content-Type' => 'application/json',
		 ]);
		 $response->setStatusCode(Response::HTTP_CREATED);
		 $response->headers->set('Content-Type', 'application/json');
		 $response->headers->set('Access-Control-Allow-Origin', '*');
		 return $response;
	 }
 
	 #[Route('/api/projects/{idProject}', name: 'adminProjectsSupprimer', methods: ['DELETE'])]
	 public function adminProjectsSupprimerAction(string $idProject): Response
	 {
 
		 // Récupérer les données JSON
		 $project = $this->entityManager->getRepository(Projet::class)->find($idProject);
 
		 if ($project) {
			 $this->entityManager->remove($project);
			 $this->entityManager->flush();
 
			 //return new Response(null, 'project resource deleted' . $id); 
			 $response = new Response;
			 $response->setContent(json_encode(array(['message' => 'project ressource deleted: project was deleted ' . $idProject])));
			 $response->setStatusCode(Response::HTTP_NO_CONTENT);
			 $response->headers->set('Content-Type', 'application/json'); 
			 $response->headers->set('Access-Control-Allow-Origin', '*');
			 
			 return $response;
			 // 204 No Content
 
		 } else {
			 $response = new Response;
			 $response->setStatusCode(Response::HTTP_NOT_FOUND);
			 $response->headers->set('Content-Type', 'application/json'); 
			 $response->headers->set('Access-Control-Allow-Origin', '*');
			 $response->setContent(json_encode(array(['message' => 'Resource not found: No project found for id ' . $idProject])));
			 return $response;
			 // 404 Not Found
 
		 }
	 }
	 
 
	 #[Route('/api/projects/{idProject}', name: 'adminProjectsModifier', methods: ['PUT'])]
	 public function adminProjectsModifierAction(string $idProject, Request $request): Response
	 {
		 $data = json_decode($request->getContent(), true);
	 
		 if (!$data) {
			 $response = new Response;
			 $response->setStatusCode(Response::HTTP_BAD_REQUEST);
			 $response->headers->set('Content-Type', 'application/json');
			 $response->headers->set('Access-Control-Allow-Origin', '*');
			 $response->setContent(json_encode(['message' => 'Invalid or missing JSON data']));
			 return $response;
		 }
	 
		 $project = $this->entityManager->getRepository(Projet::class)->find($idProject);
 
		 if ($project) {
			 $project->setTitre($data['titre_p'] ?? $project->getTitre())
					   ->setDescription($data['description_p'] ?? $project->getDescription())
					   ->setImage($data['image_p'] ?? $project->getImage());
	 
			 $this->entityManager->persist($project);
			 $this->entityManager->flush();
	 
			 $response = new Response;
			 $response->setStatusCode(Response::HTTP_OK);
			 $response->headers->set('Content-Type', 'application/json');
			 $response->headers->set('Access-Control-Allow-Origin', '*');
			 $response->setContent(json_encode(['id_projet' => $project->getId(), 'titre_p' => $project->getTitre(), 'description_p' => $project->getDescription(), 'image_p' => $project->getImage()]), Response::HTTP_CREATED, [
				 'Content-Type' => 'application/json',
			 ]);
			 return $response;
			 
		 }else{
			 $response = new Response;
			 $response->setStatusCode(Response::HTTP_NOT_FOUND);
			 $response->headers->set('Content-Type', 'application/json');
			 $response->headers->set('Access-Control-Allow-Origin', '*');
			 $response->setContent(json_encode(['message' => 'Resource not found: No actualite found for id ' . $idProject]));
			 return $response;
		 }
	 }
}

