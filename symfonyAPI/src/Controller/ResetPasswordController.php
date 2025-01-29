<?php

namespace App\Controller;

use App\Entity\Benevole;
use App\Form\ChangePasswordFormType;
use App\Form\ResetPasswordRequestFormType;
use App\Service\PasswordMailerService;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Log\Logger;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use SymfonyCasts\Bundle\ResetPassword\Controller\ResetPasswordControllerTrait;
use SymfonyCasts\Bundle\ResetPassword\Exception\ResetPasswordExceptionInterface;
use SymfonyCasts\Bundle\ResetPassword\ResetPasswordHelperInterface;

class ResetPasswordController extends AbstractController
{
    use ResetPasswordControllerTrait;

    public function __construct(
        private ResetPasswordHelperInterface $resetPasswordHelper,
        private EntityManagerInterface $entityManager,
        private LoggerInterface $logger,
        private RequestStack $requestStack,
    ) {
        $this->logger = $logger;
        $this->requestStack = $requestStack;
    }
    /**
     * Confirmation page after a user has requested a password reset.
     */
    #[Route('/forgot-password', name: 'app_forgot_password', methods:['POST'])]
    public function checkEmail(PasswordMailerService $passwordMailerService, Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        $mailResetPassword = $data['mail_retrieve'];

        if ($mailResetPassword){
            $linkMailRequest = $passwordMailerService->processSendingOnlyLinkResetPasswordEmail($mailResetPassword);
        }
        $response = new Response();
			$response->setStatusCode(Response::HTTP_OK);
			$response->setContent(json_encode(['message' => "Un e-mail pour réinitialiser votre mot de passe a été envoyé à l'adresse associée à votre compte, si celui-ci existe. Si vous ne le recevez pas, pensez à verifier dans vos spamms."]));
			return $response;
    }

    #[Route('/reset-password/{token}', name: 'app_reset_password', methods: ['GET', 'POST'])]
    public function resetPassword(
        RequestStack $requestStack, Request $request,
        UserPasswordHasherInterface $passwordHasher,
        string $token = null
    ): Response {
        // GET : Stock le token en session et le retire de l'URL (en front)
        if ($request->isMethod('GET')) {
            if ($token) {
                // Stocker le token en session et rediriger pour nettoyer l'URL
                $session = $requestStack->getSession();
                $session->start();
                $session->set('ResetPasswordPublicToken', $token);
                return new JsonResponse([
                    'message' => 'Token stocké en session.',
                    'redirect' => $this->generateUrl('app_reset_password'),
                ], Response::HTTP_OK);
            }

            // Récupérer le token depuis la session
            $token = $this->getTokenFromSession();
            if (!$token) {
                $this->logger->info("Aucun token trouvé dans l’URL ou la session.");
                return new JsonResponse([
                    'valid' => false,
                    'message' => 'Aucun token trouvé dans l’URL ou la session.'
                ], Response::HTTP_BAD_REQUEST);
            }

            try {
                // Valider le token
                $this->resetPasswordHelper->validateTokenAndFetchUser($token);
                // Token valide donc affichage du formulaire en front
                return new JsonResponse(['valid' => true], Response::HTTP_OK);
            } catch (ResetPasswordExceptionInterface $e) {
                $this->logger->info("Catch Error Reset Mot de passe :");
                $this->logger->info($e->getReason());
                return new JsonResponse([
                    'valid' => false,
                    'message' => 'Token invalide ou expiré.',
                    'error' => $e->getReason(),
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        // POST : Reset du mot de passe avec le formulaire reçu
        if ($request->isMethod('POST')) {

            // Récupérer le token depuis la session
            $token = $this->getTokenFromSession();

            if (!$token) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Aucun token trouvé en session.'
                ], Response::HTTP_BAD_REQUEST);
            }

            $data = json_decode($request->getContent(), true);

            // Géré également en front
            if (!isset($data['new_password'])) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Mot de passe manquant.'
                ], Response::HTTP_BAD_REQUEST);
            }

            try {
                // Valider le token et récupérer l'utilisateur
                $user = $this->resetPasswordHelper->validateTokenAndFetchUser($token);

                // Supprimer le token après validation
                $this->resetPasswordHelper->removeResetRequest($token);

                // Hash du nouveau mot de passe
                $plainPassword = $data['new_password'];
                $user->setPassword($passwordHasher->hashPassword($user, $plainPassword));
                $this->entityManager->flush();

                // Nettoyer la session après réinitialisation
                $this->cleanSessionAfterReset();

                return new JsonResponse([
                    'success' => true,
                    'message' => 'Mot de passe réinitialisé avec succès.'
                ], Response::HTTP_OK);
            } catch (ResetPasswordExceptionInterface $e) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Échec de la réinitialisation du mot de passe.',
                    'error' => $e->getReason(),
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        return new JsonResponse(['message' => 'Méthode non autorisée.'], Response::HTTP_METHOD_NOT_ALLOWED);
    }

    // private function processSendingPasswordResetEmail(string $emailFormData, MailerInterface $mailer): RedirectResponse
    // {
    //     $user = $this->entityManager->getRepository(Benevole::class)->findOneBy([
    //         'mail_b' => $emailFormData,
    //     ]);

    //     // Do not reveal whether a user account was found or not.
    //     if (!$user) {
    //         return $this->redirectToRoute('app_check_email');
    //     }

    //     try {
    //         $resetToken = $this->resetPasswordHelper->generateResetToken($user);
    //     } catch (ResetPasswordExceptionInterface $e) {
    //         // If you want to tell the user why a reset email was not sent, uncomment
    //         // the lines below and change the redirect to 'app_forgot_password_request'.
    //         // Caution: This may reveal if a user is registered or not.
    //         //
    //         // $this->addFlash('reset_password_error', sprintf(
    //         //     '%s - %s',
    //         //     ResetPasswordExceptionInterface::MESSAGE_PROBLEM_HANDLE,
    //         //     $e->getReason()
    //         // ));

    //         return $this->redirectToRoute('app_check_email');
    //     }

    //     $email = (new TemplatedEmail())
    //         ->from(new Address('adressepoursiteinutile.fr@gmail.com', 'Mail Temp Dev'))
    //         ->to((string) $user->getMail())
    //         ->subject('Your password reset request')
    //         ->htmlTemplate('reset_password/email.html.twig')
    //         ->context([
    //             'resetToken' => $resetToken,
    //         ]);

    //     $mailer->send($email);

    //     // Store the token object in session for retrieval in check-email route.
    //     $this->setTokenObjectInSession($resetToken);

    //     return $this->redirectToRoute('app_check_email');
    // }
}
