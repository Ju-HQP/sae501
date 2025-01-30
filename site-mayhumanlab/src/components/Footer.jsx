function Footer({ contactVisible }) {
    return (
        <>
            <footer className="absolute left-0 right-0 px-8 py-4 flex flex-col justify-between z-50 bg-sky-800 font-roboto text-white">
                {
                    contactVisible
                    &&
                    <div className="flex flex-col lg:flex-row justify-between"> {/* Ajout de flex-col pour mobile */}
                        <section className="my-4 lg:px-12">
                            <h2 className="font-jura text-4xl lg:text-4xl font-extralight text-center mb-8 lg:text-left">Nous contacter</h2>
                            <ul className="w-fit m-4">
                                <li>Maison des associations</li>
                                <li>17, rue de Rastatt</li>
                                <li>53000 Laval</li>
                                <li>Tél: 07 85 69 86 83</li>
                                <li>E-mail: contact@mayhumanlab.fr</li>
                            </ul>
                        </section>

                        <section className="flex justify-center items-center space-x-4 my-4 lg:px-12 lg:justify-center">
                            <a href="https://www.facebook.com/mayhumanlab/" target="_blank">
                                <img src="/logo-facebook.png" alt="Bouton menant vers Facebook" className="w-12 h-12" />
                            </a>
                            <a href="https://www.instagram.com/mayhumanlab/" target="_blank">
                                <img src="/logo-instagram.png" alt="Bouton menant vers Instagram" className="w-16 h-16" />
                            </a>
                        </section>
                    </div>
                }
                <p className="text-center my-4">© May'HumanLab - 2022 - May'HumanLab est une association à but non lucratif (loi 1901) basé à Laval en Mayenne (53)</p>
            </footer>
        </>
    );
};

export default Footer;