<?php

namespace App\Controller;

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

class SecurityController extends AbstractController
{
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
        
        $token = $csrfTokenManager->getToken('authenticate')->getValue();
        return new JsonResponse(['csrfToken' => $token,]);
    }

    #[Route(path: '/login', name: 'app_login1', methods: ["GET"])]
    public function login1(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('admin_dashboard');
        // }

        return $this->render('security/login.html.twig', [
            'last_username' => $authenticationUtils->getLastUsername(),
            'error' => $authenticationUtils->getLastAuthenticationError(),
        ]);
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

        return new JsonResponse(['message' => 'Connecté en tant que'], 200);
    }


    // Fonction executée pour la deconnexion simple
    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(Request $request, TokenStorageInterface $tokenStorage): Response
    {
        try {
            // Invalide la session
            $session = $request->getSession();
            if ($session && $session->isStarted()) {
                $session->invalidate();
            }
            $tokenStorage->setToken(null);

            $response = new Response();
            // Supprimer le cookie PHPSESSID
            $response->headers->clearCookie('PHPSESSID');
            $response->setContent(json_encode(['message' => 'Déconnexion réussie']));
            $response->headers->set('Content-Type', 'application/json');

            return $response;
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Erreur lors de la déconnexion', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Fonction pour renvoyer un message JSON au front au lieu d'une redirection (par défaut)
    #[Route(path: '/logout_msg', name: 'app_logout_msg')]
    public function logoutmsg(Request $request, TokenStorageInterface $tokenStorage): JsonResponse
    {
        try {
            // La session et le token sont déjà invalidés par la route /logout
            return new JsonResponse(['message' => 'Déconnexion réussie'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => 'Erreur lors de la déconnexion', 'error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/auth', name: 'api_auth', methods: ['GET'])]
    public function authStatus(Security $security): JsonResponse
    {
        $user = $security->getUser();

        if (!$user) {
            return new JsonResponse(['isAuthenticated' => false], 200);
        }

        return new JsonResponse(['isAuthenticated' => true, 'user' => $user->getUserIdentifier()], 200);
    }
    // #[Route(path: '/auth', name: 'app_auth', methods: ['GET'])]
    // public function auth(AuthenticationUtils $authenticationUtils): Response
    // {


    //     if ($this->getUser()) {
    //         $identifiant = $authenticationUtils->getLastUsername();
    //         return new JsonResponse(['message' => 'Connecté en tant que' . $identifiant], 200);
    //     }

    //     return new JsonResponse(['error' => "Vous n'êtes pas connecté"], 401);
    // }
}
