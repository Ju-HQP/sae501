<?php

namespace App\Controller;

use App\Entity\Actualite;
use App\Entity\Benevole;
use App\Entity\Competence;
use App\Entity\Projet;
use Doctrine\Common\Lexer\Token;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

#[Route('/api')]
class SecurityController extends AbstractController
{

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    //temp 
    #[Route('/sql', name: 'create_data', methods: ['GET'])]
    public function debugCsrf(): JsonResponse
    {
        if (count($this->entityManager->getRepository("App\Entity\Benevole")->findAll()) == 0) {

			$benevole = new Benevole();
			$benevole->setNom("Beta");
			$benevole->setPrenom("Test");
			$benevole->setPassword("$2y$08\$z5cHfGcwwPoahQ7q3QXHI.1BLjzOXIzfxQrpCFpBMdaeNYQ39QqPy");
			$benevole->setMail("test@free.fr");
			$benevole->setTel("0764412869");
			$benevole->setPhoto("https://thispersondoesnotexist.com/");
			$benevole->setRoles(1);
			$this->entityManager->persist($benevole);

			$this->entityManager->flush();
		}

		if (count($this->entityManager->getRepository("App\Entity\Projet")->findAll()) == 0) {
			$project = new Projet();
			$project->setTitre('Orthèse');
			$project->setDescription("Réalisation d'une orthèse pour une personne amputée des 2 bras, avec support pour stylo et couvert (fourchette, cuillère...), sur la base d'un scan 3D du bras, modélisation et impression 3D");
			$project->setImage('https://www.mayhumanlab.fr/wp-content/themes/lablab/img/projet_orthese.jpg');
			$this->entityManager->persist($project);

			$project = new Projet();
			$project->setTitre('Projet Cendrillon');
			$project->setDescription("Réalisation d'un dispositif d'assistance à l'enfilage de chaussure pour une personne en fauteuil roulant, conception, modélisation, impression 3D et découpe bois");
			$project->setImage('https://www.mayhumanlab.fr/wp-content/themes/lablab/img/projet_cendrillon.jpg');
			$this->entityManager->persist($project);

			$this->entityManager->flush();
		}

		if (count($this->entityManager->getRepository("App\Entity\Actualite")->findAll()) == 0) {

			$actualite = new Actualite();
			$actualite->setTitre("Actu 1");
			$actualite->setDate("2012-12-12");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$this->entityManager->persist($actualite);

			$actualite = new Actualite();
			$actualite->setTitre("Actu 2");
			$actualite->setDate("2011-11-11");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1737&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$this->entityManager->persist($actualite);

			$actualite = new Actualite();
			$actualite->setTitre("Actu 3");
			$actualite->setDate("2010-10-10");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1598520106830-8c45c2035460?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$this->entityManager->persist($actualite);

			$actualite = new Actualite();
			$actualite->setTitre("Actu 4");
			$actualite->setDate("2009-09-09");
			$actualite->setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. ");
			$actualite->setImage("https://images.unsplash.com/photo-1706700722877-1b014f34f383?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
			$this->entityManager->persist($actualite);

            $this->entityManager->flush();
		}
	
        return new JsonResponse([
            'message' => 'Données générées',
        ],200);
    }


    #[Route('/csrf_token', name: 'api_csrf_token', methods: ['GET'])]
    public function getCsrfToken(RequestStack $requestStack, CsrfTokenManagerInterface $csrfTokenManager): JsonResponse
    {
        // Démarrer la session si nécessaire
        $session = $requestStack->getSession();
        if (!$session->isStarted()) {
            $session->start();
        }
        // Récupération de l'origine de la requête (annulée car dangereux si laisser en prod)

        $token = $csrfTokenManager->getToken('authenticate')->getValue();
        $res = new JsonResponse(['csrfToken' => $token,]);

        return $res;
    }

    // Utile quand les identifiants sont incorrects
    #[Route(path: '/login', name: 'app_login1', methods: ["GET"])]
    public function loginErrorMsg(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('admin_dashboard');
        // }

        $response = new Response();
        $response->setContent(json_encode(['message' => 'Identifiants invalides']));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_UNAUTHORIZED); // 401 Error Pas authentifié

        return $response;

        // return $this->render('security/login.html.twig', [
        //     'last_username' => $authenticationUtils->getLastUsername(),
        //     'error' => $authenticationUtils->getLastAuthenticationError(),
        // ]);
    }

    #[Route(path: '/login', name: 'app_login', methods: ['POST'])]
    public function login(Request $request, CsrfTokenManagerInterface $csrfTokenManager, AuthenticationUtils $authenticationUtils): Response
    {

        //$sentToken = $request->request->get('_csrf_token');

        // Récupérer le token attendu
        // $expectedToken = $csrfTokenManager->getToken('authenticate')->getValue();

        $error = $authenticationUtils->getLastAuthenticationError();
        $identifiant = $authenticationUtils->getLastUsername();

        if ($error) {
            return new JsonResponse(['error' => $error->getMessageKey()], 401);
        }
        return new JsonResponse(['message' => 'Connecté en tant que']);
    }

    // Fonction executée pour la deconnexion simple
    #[Route(path: '/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(Request $request, TokenStorageInterface $tokenStorage): JsonResponse
    {
        try {
            // Invalide la session
            $session = $request->getSession();
            if ($session && $session->isStarted()) {
                $session->invalidate();
            }
            $tokenStorage->setToken(null);

            $response = new JsonResponse(['message' => 'Déconnexion réussie']);

            // Supprimer le cookie PHPSESSID
            $response->headers->clearCookie('PHPSESSID');

            return $response;
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Erreur lors de la déconnexion', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Fonction pour renvoyer un message JSON au front au lieu d'une redirection (par défaut)
    #[Route(path: '/logout_msg', name: 'app_logout_msg', methods: ['GET'])]
    public function logoutmsg(Request $request, TokenStorageInterface $tokenStorage): JsonResponse
    {
        try {
            // La session et le token sont déjà invalidés par la route /logout
            $res = new JsonResponse(['message' => 'Déconnexion réussie'], Response::HTTP_OK);
            $res->headers->set('Content-Type', 'application/json');
            return $res;
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Erreur lors de la déconnexion', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/auth', name: 'api_auth', methods: ['GET'])]
    public function authStatus(Security $security): ?Response
    {
        $user = $security->getUser();
        $mail = $user->getUserIdentifier();

        $benevoleConnecte = $this->entityManager->getRepository(Benevole::class)->findOneBy(['mail_b' => $mail]);

        $response = new Response();
        $benevoleInfos = [
            'id' => $benevoleConnecte->getId(),
            'photo' => $benevoleConnecte->getPhoto(),
            'nom' => $benevoleConnecte->getNom(),
            'prenom' => $benevoleConnecte->getPrenom(),
            'mail' => $benevoleConnecte->getMail(),
            'tel' => $benevoleConnecte->getTel(),
            'role' => $benevoleConnecte->getRoles()
        ];

        $response->setContent(json_encode(['isAuthenticated' => true, 'user' => $user->getUserIdentifier(), 'utilisateur' => $benevoleInfos], 200));

        if (!$user) {
            $response->setContent(json_encode(['isAuthenticated' => false], 404));
            //return new JsonResponse(['isAuthenticated' => false], 404);
        }

        //return new JsonResponse(['isAuthenticated' => true, 'user' => $user->getUserIdentifier()], 200);
        return $response;
    }
}
