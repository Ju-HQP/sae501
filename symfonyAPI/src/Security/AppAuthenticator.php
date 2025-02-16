<?php

namespace App\Security;

use App\Entity\Benevole;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface as LogLoggerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\SecurityRequestAttributes;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Psr\Log\LoggerInterface;

class AppAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager, private UrlGeneratorInterface $urlGenerator, private LoggerInterface $logger)
    {
        $this->entityManager = $entityManager;
    }

    public function authenticate(Request $request): Passport
    {
        $data = json_decode($request->getContent(), true);

        $mailB = $request->request->get('mail_b', '');
        $password = $request->request->get('mdp_b', '');
        $csrfToken = $request->request->get('_csrf_token', '');

        if (isset($data["mail_b"])) {
            $mailB = $data["mail_b"];
            $password = $data["mdp_b"];
            $csrfToken = $data["_csrf_token"];
        }


        $request->getSession()->set(SecurityRequestAttributes::LAST_USERNAME, $mailB);

        return new Passport(
            new UserBadge($mailB),
            new PasswordCredentials($password),
            [
                new CsrfTokenBadge('authenticate', $csrfToken),
            ]
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {

        // Redirigez uniquement si l'utilisateur n'est pas sur /login
        // if ($request->getPathInfo() === '/login') {
        //     return new RedirectResponse('/admin/benevoles');
        // }

        // Récupération de l'utilisateur (User)

        $userMail = $token->getUserIdentifier();

        $benevoleConnecte = $this->entityManager->getRepository(Benevole::class)->findOneBy(['mail_b' => $userMail]);

        $response = new Response();
        $benevoleInfos = [
            'id_benevole' => $benevoleConnecte->getId(),
            'photo_b' => $benevoleConnecte->getPhoto(),
            'nom_b' => $benevoleConnecte->getNom(),
            'prenom_b' => $benevoleConnecte->getPrenom(),
            'mail_b' => $benevoleConnecte->getMail(),
            'tel_b' => $benevoleConnecte->getTel(),
            'competences' => $benevoleConnecte->getComp()->map(function ($competence) {
                return [
                    'id_competence' => $competence->getId(),
                    'nom_c' => $competence->getNom()
                ];
            })->toArray(),
            'role_b' => $benevoleConnecte->getRoles(),
        ];

        $response->setContent(json_encode(['message' => 'Connexion réussie', 'utilisateur' => $benevoleInfos]));

        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_OK);

        return $response;
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
