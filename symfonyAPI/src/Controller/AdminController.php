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
use Symfony\Component\HttpKernel\Event\ResponseEvent;
// Pour la gestion du mot de passe
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AdminController extends AbstractController
{
	private EntityManagerInterface $entityManager;
	private LoggerInterface $logger;

	public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
	{
		$this->entityManager = $entityManager;
		$this->logger = $logger;
	}
	
	public function onKernelResponse(ResponseEvent $event)
    {
        $response = $event->getResponse();
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

	#[Route('/admin/benevoles', name: 'adminBenevoles', methods: ['GET'])]
	public function adminBenevolesAction(): Response
	{
		// $query = $this->entityManager->createQuery("SELECT b FROM App\Entity\Benevole b JOIN benevole_competence ON benevole.id_benevole == benevole_competence.id_benevole JOIN competence ON benevole_comptence.id_competence == competence.id_competence");
		$query = $this->entityManager->createQuery("SELECT b,c FROM App\Entity\Benevole b LEFT JOIN b.competences c");
		$benevoles = $query->getArrayResult(); // ou getResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->setContent(json_encode($benevoles));
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	#[Route('/admin/benevoles/{id}', name: 'allow-retrieve-a-volunteer', methods: ['OPTIONS'])]
	#[Route('/admin/benevoles', name: 'allow-create-a-volunteer', methods: ['OPTIONS'])]
	public function allowCreateAVolunteer(Request $request): Response
	{
		$response = new Response(); // Action qui autorise le options
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
		$response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
		return $response;
	}

	// Fonction pour l'ajout d'un nouveau Bénévole
	// le paramètre passwordhasher vient du fichier security.yaml

	#[Route('/admin/benevoles', name: 'adminBenevolesAjouter', methods: ['POST'])]
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
        $randomMdp= random_bytes(10);
		// --- Hash du mot de passe
        $hashedPassword = $passwordHasher->hashPassword($benevole, $randomMdp);
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
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	#[Route('/admin/benevoles/{id}', name: 'adminBenevolesSupprimer', methods: ['DELETE'])]
    public function adminBenevolesSupprimerAction(String $id): Response
    {
        // Récupérer les données JSON
        $benevole = $this->entityManager->getRepository(Benevole::class)->find($id);

		if(!$benevole){
			$response = new Response;
			$response->setStatusCode(Response::HTTP_NOT_FOUND);
			$response->setContent(json_encode(array(['message' => 'Bénévole non trouvé'])));
			return $response;
		}

        if ($benevole) {
            $this->entityManager->remove($benevole);
            $this->entityManager->flush();
    
            //return new Response(null, 'benevole resource deleted' . $id); 
            $response = new Response;
			$response->headers->set('Content-Type', 'application/json'); 
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->setStatusCode(Response::HTTP_NO_CONTENT);
            $response->setContent(json_encode(array(['message' => 'benevole ressource deleted: benevole was deleted ' . $id])));
            
            return $response;
            // 204 No Content
        } else {
            $response = new Response;
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
            $response->headers->set('Content-Type', 'application/json'); 
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->setContent(json_encode(array(['message' => 'Resource not found: No benevole found for id ' . $id])));
            return $response;
            // 404 Not Found
        }
    }


	#[Route('/admin/benevoles/{id}', name: 'adminBenevolesModifier', methods: ['PUT'])]
	public function adminBenevolesModifierAction(Request $request, String $id): Response
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
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			$response->setContent(json_encode(['id_benevole' => $benevole->getId(), 'nom_b' => $benevole->getNom(), 'prenom_b' => $benevole->getPrenom(), 'mail_b' => $benevole->getMail(), 'tel_b' => $benevole->getTel(), 'role_b' => $benevole->getRoles()]), Response::HTTP_CREATED, [
                'Content-Type' => 'application/json',
            ]);
			return $response;
		} else {
			$response = new Response;
			$response->setStatusCode(Response::HTTP_NOT_FOUND);
			$response->headers->set('Content-Type', 'application/json'); 
			$response->headers->set('Access-Control-Allow-Origin', '*');
			$response->setContent(json_encode(array(['message' => 'Bénévole non trouvé'] . $id)));
			return $response;
			// 404 Not Found
		}
	}
	
}
