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

	// #[Route('/admin/benevoles/{id}', name: 'allow-retrieve-a-product', methods: ['OPTIONS'])]
	#[Route('/admin/benevoles', name: 'allow-create-a-product', methods: ['OPTIONS'])]
	public function allowCreateAProduct(Request $request): Response
	{
		$response = new Response(); // Action qui autorise le options
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
		$response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
		return $response;
	}


	#[Route('/admin/benevoles', name: 'adminBenevoles', methods: ['GET'])]
	public function adminBenevolesAction(): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Benevole a");
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
			->setRoles($data['role_b'] ?? 'ROLE_USER');

		// --- Génération du mdp aléatoire
        $randomMdp= random_bytes(10);
		// --- Hash du mot de passe
        $hashedPassword = $passwordHasher->hashPassword($benevole, $randomMdp);
		// ajout à l'objet Benevole
		$benevole->setPassword($hashedPassword);


		// Sauvegarder dans la base de données
		$this->entityManager->persist($benevole);
		$this->entityManager->flush();

		// Retourner la réponse avec l'ID du nouvel objet
		return new Response(json_encode(['id' => $benevole->getId()]), Response::HTTP_CREATED, [
			'Content-Type' => 'application/json',
		]);
	}

	#[Route('/admin/benevoles/supprimer', name: 'adminBenevolesSupprimer')]
	public function adminBenevolesSupprimerAction(Request $request): Response
	{
		$entityBenevole = $this->entityManager->getReference("App\Entity\Benevole", $request->query->get("id_benevole"));
		if ($entityBenevole !== null) {
			$this->entityManager->remove($entityBenevole);
			$this->entityManager->flush();
		}
		return $this->redirectToRoute("adminBenevoles");
	}


	#[Route('/admin/benevoles/modifier', name: 'adminBenevolesModifier')]
	public function adminBenevolesModifierAction(Request $request): Response
	{
		$entity = $this->entityManager->getReference("App\Entity\Benevole", $request->query->get("id_benevole"));
		if ($entity === null)
			$entity = $this->entityManager->getReference("App\Entity\Benevole", $request->request->get("id_benevole"));
		if ($entity !== null) {
			$formBuilder = $this->createFormBuilder($entity);
			$formBuilder->add("id_benevole", HiddenType::class);
			$formBuilder->add("nom_b", TextType::class);
			$formBuilder->add("prenom_b", TextType::class);
			$formBuilder->add("mdp_b", TextType::class);
			$formBuilder->add("mail_b", TextType::class);
			$formBuilder->add("tel_b", TextType::class);
			$formBuilder->add("photo_b", TextType::class);
			$formBuilder->add("role_b", TextType::class);
			// $formBuilder->add("category", SubmitType::class);
			// Generate form
			$form = $formBuilder->getForm();

			$form->handleRequest($request);

			if ($form->isSubmitted()) {
				$entity = $form->getData();
				$this->entityManager->persist($entity);
				$this->entityManager->flush();
				return $this->redirectToRoute("adminBenevoles");
			} else {
				return $this->render('admin.form.html.twig', [
					'form' => $form->createView(),
				]);
			}
		} else {
			return $this->redirectToRoute("adminBenevoles");
		}
	}

	//------------------------------------ ACTUALITE ------------------------------------//

	#[Route('/admin/actualites/{id}', name: 'allow-retrieve-actuality', methods: ['OPTIONS'])]
   	#[Route('/admin/actualites', name: 'allow-create-actuality', methods: ['OPTIONS'])]
   	public function allowActuality(Request $request): Response
   	{
       $response = new Response(); // Action qui autorise le options
       $response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
       $response->headers->set('Access-Control-Allow-Origin', '*');
       $response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
       $response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
       return $response;
   	}
	
	#[Route('/admin/actualites', name: 'adminActualites', methods: ['GET'])]
	public function adminActualitesAction(): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Actualite a");
		$actualites = $query->getArrayResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK);
		$response->setContent(json_encode($actualites));
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	#[Route('/admin/actualites', name: 'adminActualitesAjouter', methods: ['POST'])]
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
	    $response->setContent(json_encode(['id' => $actualite->getId()]), Response::HTTP_CREATED, [
			'Content-Type' => 'application/json',
		]);
		$response->setStatusCode(Response::HTTP_CREATED);
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	#[Route('/admin/actualites/supprimer', name: 'adminActualitesSupprimer')]
	public function adminActualitesSupprimerAction(Request $request): Response
	{
		$idActualite = $request->query->get("id_actualite");
		$actualite = $this->entityManager->getRepository(Actualite::class)->find($idActualite);

		if ($actualite) {
			$this->entityManager->remove($actualite);
			$this->entityManager->flush();
			return new Response(null, Response::HTTP_NO_CONTENT);
		}

		return new Response('Actualité non trouvée', Response::HTTP_NOT_FOUND);
	}

	#[Route('/admin/actualites/modifier', name: 'adminActualitesModifier')]
	public function adminActualitesModifierAction(Request $request): Response
	{
		$data = json_decode($request->getContent(), true);
		$idActualite = $data['id_actualite'] ?? null;
	
		if (!$idActualite) {
			return new Response('ID manquant', Response::HTTP_BAD_REQUEST);
		}
	
		$actualite = $this->entityManager->getRepository(Actualite::class)->find($idActualite);
	
		if ($actualite) {
			$actualite->setTitre($data['titre_a'] ?? $actualite->getTitre())
					  ->setDescription($data['description_a'] ?? $actualite->getDescription())
					  ->setDate($data['date_a'] ?? $actualite->getDate())
					  ->setImage($data['image_a'] ?? $actualite->getImage());
	
			$this->entityManager->flush();
	
			return new Response('Actualité mise à jour', Response::HTTP_OK);
		}
	
		return new Response('Actualité non trouvée', Response::HTTP_NOT_FOUND);
	}
}

