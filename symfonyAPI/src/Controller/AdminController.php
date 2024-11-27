<?php

namespace App\Controller;

use App\Entity\Benevole;
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

use Doctrine\ORM\EntityManagerInterface;

class AdminController extends AbstractController
{
	private EntityManagerInterface $entityManager;
	private LoggerInterface $logger;

	public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
	{
		$this->entityManager = $entityManager;
		$this->logger = $logger;
	}

	#[Route('/admin/benevoles', name: 'adminBenevoles',  methods: ['GET'])]
	public function adminBenevolesAction(Request $request): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM use App\Entity\Benevole a");
		$benevoles = $query->getResult();
		return $this->render('admin.benevoles.html.twig', [
			'benevoles' => $benevoles,
		]);
	}

	#[Route('/admin/benevoles/{id}', name: 'allow-retrieve-a-product', methods: ['OPTIONS'])]
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

	#[Route('/admin/benevoles', name: 'adminBenevolesAjouter', methods: ['POST'])]
	public function adminBenevolesAjouterAction(Request $request): Response
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
			->setMdp($data['mdp_b'] ?? '')
			->setMail($data['mail_b'] ?? '')
			->setTel($data['tel_b'] ?? null)
			->setPhoto($data['photo_b'] ?? null)
			->setRole($data['role_b'] ?? 'ROLE_USER');

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
}
