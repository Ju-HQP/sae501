function Footer({ contactVisible }) {

    return (
        <>

            <footer className="px-8 py-4 flex flex-col justify-between z-50 bg-gray-800 font-roboto text-white">
                {
                    contactVisible
                    &&
                    <section className="my-4 lg:px-12">
                        <h2 className="font-jura text-4xl lg:text-4xl font-extralight text-center mb-8 lg:text-left">Nous contacter</h2>
                        <ul className="w-fit">
                            <li>Maison des associations</li>
                            <li>17, rue de Rastatt</li>
                            <li>53000 Laval</li>

                            <li>Tél: 07 85 69 86 83</li>

                            <li>E-mail: contact@mayhumanlab.fr</li>
                        </ul>
                    </section>
                }
                <p className="text-center my-4">© May'HumanLab - 2022 - May'HumanLab est une association à but non lucratif (loi 1901) basé à Laval en Mayenne (53)</p>
            </footer>
        </>)
};

export default Footer;