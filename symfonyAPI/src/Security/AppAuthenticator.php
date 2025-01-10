<?php

namespace App\Security;

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

    public function __construct(private UrlGeneratorInterface $urlGenerator, private LoggerInterface $logger) {}

    public function authenticate(Request $request): Passport
    {
        $data = json_decode($request->getContent(), true);

        $mailB = $request->request->get('mail_b', '');
        $password = $request->request->get('mdp_b', '');
        $csrfToken = $request->request->get('_csrf_token', '');

        if (isset($data["mail_b"])) {
            $this->logger->info('Changement §§§§§§§§');
            $mailB = $data["mail_b"];
            $password = $data["mdp_b"];
            $csrfToken = $data["_csrf_token"];
        }

        $this->logger->info('Mail requête : ' . $mailB);
        $this->logger->info('Mot de passe requête : ' . $password);
        $this->logger->info('Token de la requête : ' . $csrfToken);

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
        // if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
        //     return new RedirectResponse($targetPath);
        // }

        // Redirigez uniquement si l'utilisateur n'est pas sur /login
        if ($request->getPathInfo() === '/login') {
            return new RedirectResponse('/admin/benevoles');
        }
        
        $response = new Response();
		$response->setStatusCode(Response::HTTP_OK);

        return $response;
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
