<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
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
            echo "Début de sessions \n";
        }
        //dd($session);

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
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('admin_dashboard');
        // }

        //$sentToken = $request->request->get('_csrf_token');

        // Récupérer le token attendu
        // $expectedToken = $csrfTokenManager->getToken('authenticate')->getValue();

        // Debug: Afficher les tokens
        // var_dump('Sent Token:', $sentToken);
        // var_dump('Expected Token:', $expectedToken);

        $error = $authenticationUtils->getLastAuthenticationError();
        $identifiant = $authenticationUtils->getLastUsername();

        if ($error) {
            return new JsonResponse(['error' => $error->getMessageKey()], 401);
        }

        return new JsonResponse(['message' => 'Connecté en tant que'], 200);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        $response = new Response();
        $response->headers->clearCookie('PHPSESSID');
        $response->send();

        
        // throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');

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
