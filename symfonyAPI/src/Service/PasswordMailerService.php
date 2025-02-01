<?php

namespace App\Service;

use App\Entity\Benevole;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;
class PasswordMailerService
{

    private $requestStack;
    
    public function __construct(
        private MailerInterface $mailer,
        private ResetPasswordHelperInterface $resetPasswordHelper,
        private EntityManagerInterface $entityManager,
        private LoggerInterface $logger,
        RequestStack $requestStack
    ) {
        $this->requestStack = $requestStack;
    }

    public function processSendingPasswordEmail(string $mailUser, string $passwordUser): Response
    {
        $user = $this->entityManager->getRepository(Benevole::class)->findOneBy([
            'mail_b' => $mailUser,
        ]);

        if (!$user) {
            $response = new Response();
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
            $response->setContent(json_encode(['message' => 'Le bénévole n\'a pas été crée correctement. Pour obtenir le mot de passe, merci d\'utiliser la fonction de mot de passe oublié.']));
            return $response;
        }

        try {
            // J'utilise le générateur de token de ResetPasswordHelper pour générer un lien
            $token = $this->resetPasswordHelper->generateResetToken($user);

            $email = (new TemplatedEmail())
                ->from(new Address('do-not-answer-pls@gmail.com', 'MayHumanLab Admin'))
                ->to((string) $user->getMail())
                ->subject('Obtention du mot de passe de votre compte')
                ->htmlTemplate('password_manager/first_email.html.twig')
                ->context([
                    'token' => $token,
                    'password' => $passwordUser,
                ]);

            $this->mailer->send($email);
            // $this->requestStack->getSession()->set('reset_password_token', $token);
            $response = new Response();
            $response->setStatusCode(Response::HTTP_OK); // Error 200
            $response->setContent(json_encode(['message' => 'Le lien d\'obtention du mot de passe a été envoyé à l\'adresse mail indiquée.']));
            return $response;

        } catch (ResetPasswordExceptionInterface $e) {
            $response = new Response();
            $response->setStatusCode(Response::HTTP_EXPECTATION_FAILED); // Error 417
            $response->setContent(json_encode(['message' => 'Le lien d\'obtention du mot de passe ne s\'est pas généré correctement, merci d\'utiliser la fonction de mot de passe oublié.']));
            return $response;
        }
    }

    public function processSendingOnlyLinkResetPasswordEmail(string $mailUser): Response
    {

        $user = $this->entityManager->getRepository(Benevole::class)->findOneBy([
            'mail_b' => $mailUser,
        ]);

        if (!$user) {
            $response = new Response();
            $response->setStatusCode(Response::HTTP_NOT_FOUND);
            $response->setContent(json_encode(['message' => 'Le bénévole n\'existe pas.']));
            return $response;
        }

        try {
            // J'utilise le générateur de token de ResetPasswordHelper pour générer un lien
            $token = $this->resetPasswordHelper->generateResetToken($user);
            $email = (new TemplatedEmail())
                ->from(new Address('do-not-answer-pls@gmail.com', 'MayHumanLab Admin'))
                ->to((string) $user->getMail())
                ->subject('Obtention du mot de passe de votre compte')
                ->htmlTemplate('password_manager/reset_email.html.twig')
                ->context([
                    'token' => $token,
                ]);

            $this->mailer->send($email);
            $response = new Response();
            $response->setStatusCode(Response::HTTP_OK); // Error 200
            $response->setContent(json_encode(['message' => 'Le lien d\'obtention du mot de passe a été envoyé à l\'adresse mail indiquée.']));
            return $response;

        } catch (ResetPasswordExceptionInterface $e) {

            $response = new Response();
            $response->setStatusCode(Response::HTTP_EXPECTATION_FAILED); // Error 417
            $response->setContent(json_encode(['message' => 'Le lien d\'obtention du mot de passe ne s\'est pas généré correctement, merci d\'utiliser la fonction de mot de passe oublié.']));
            return $response;
        }
    }
    // GET Lien temporaire avec token Retourne le premier mot de passe à afficher en front
}
