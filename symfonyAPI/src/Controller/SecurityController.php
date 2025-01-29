<?php

namespace App\Controller;

use App\Entity\Benevole;
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
    #[Route('/debug/csrf', name: 'debug_csrf', methods: ['POST'])]
    public function debugCsrf(Request $request, CsrfTokenManagerInterface $csrfTokenManager): JsonResponse
    {
        $sentToken = $request->request->get('_csrf_token');
        $expectedToken = $csrfTokenManager->getToken('authenticate')->getValue();

        return new JsonResponse([
            'sentToken' => $sentToken,
            'expectedToken' => $expectedToken,
            'isValid' => $csrfTokenManager->isTokenValid(new CsrfToken('authenticate', $sentToken)),
        ]);
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
