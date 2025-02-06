import Header from "../components/Header";

function LegalsMention() {
    document.title = "Mentions Légales | May'Humanlab";
    return (<>
        <Header />
        <main className="font-roboto leading-8 mt-20 text-lg p">
            <h1 className="text-center font-jura my-8 font-extralight text-4xl lg:text-6xl lg:my-12">Mentions légales</h1>
            <div class="p-12">
                <p>En vigueur au 30/01/2025</p>

                <p>
                    Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la Confiance en l’économie
                    numérique, il est porté à la connaissance des utilisateurs et visiteurs du site <a href="https://www.mayhumanlab.fr/" className="text-blue-600">https://www.mayhumanlab.fr/</a>, les présentes mentions légales.
                    La connexion et la navigation sur le Site par l’Utilisateur implique acceptation intégrale et sans
                    réserve des présentes mentions légales.
                    Ces dernières sont accessibles sur le Site à la rubrique "Mentions légales".
                </p>

                <strong>EDITION DU SITE</strong>
                <p>
                    L’édition et la direction de la publication du Site est assurée par May'HumanLab, situé au 17, rue de Rastatt, 53000 Laval, dont le numéro de téléphone est
                    07 85 69 86 83, et l'adresse e-mail est contact@mayhumanlab.fr.
                </p>

                <strong>HEBERGEUR</strong>
                <p>
                    L'hébergeur du Site est la société OVH, dont le siège social est situé au 2 rue Kellermann 59100
                    Roubaix .
                </p>

                <strong>ACCES AU SITE</strong>
                <p>
                    Le Site est normalement accessible, à tout moment, à l'Utilisateur. Toutefois, May'HumanLab pourra, à tout moment, suspendre, limiter ou interrompre le Site afin de procéder, notamment, à des mises à jour ou
                    des modifications de son contenu. May'HumanLab ne pourra en aucun cas être tenu responsable des
                    conséquences éventuelles de cette indisponibilité sur les activités de l'Utilisateur.
                </p>

                <strong>COLLECTE DES DONNEES</strong>
                <p>
                    May'HumanLab assure à l'Utilisateur une collecte et un traitement des données personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers aux libertés et dans le respect de la règlementation applicable en matière de traitement des données à caractère personnel conformément au règlement (UE) 2016/679 du Parlement européen et du
                    Conseil du 27 avril 2016 (ci-après, ensemble, la "Règlementation applicable en matière de
                    protection des Données à caractère personnel").
                    En vertu de la Règlementation applicable en matière de protection des Données à caractère
                    personnel, l'Utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de
                    ses données personnelles. L'Utilisateur peut exercer ce droit : par mail à l'adresse email mayhumanlab@gmail.com, 
                    depuis le formulaire de contact
                </p>
                <p>
                    Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou partie du Site,
                    sans autorisation expresse de l’Editeur est prohibée et pourra entraîner des actions et poursuites
                    judiciaires telles que prévues par la règlementation en vigueur.
                </p>

                <p>Rédigé sur <a href="http://legalplace.fr" className="text-blue-600">http://legalplace.fr</a></p>
            </div>
        </main>
    </>)
};

export default LegalsMention;