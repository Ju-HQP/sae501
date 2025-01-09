import Header from "../components/Header";

function Home() {

    return (
        <>
            <Header />
            <main className="fixed top-0 parallax">
                {/* <div className="fixed top-12 w-full h-32 bg-url[('/accueil/bg-banniere.webp')]"></div> */}
                <img className="w-full" src="" alt="bannière" />
                <section>
                    <h1 className='text-center my-6 font-bold text-2xl lg:text-4xl'>May'HumanLab</h1>
                    <p className="px-8">Le LAB-LAB devient May'HumanLab pour plusieurs raisons :

                        - Revendiquer l'appartenance à un territoire
                        - Une meilleure compréhension de nos actions
                        - La certification HumanLab (convention des fablabs handicap)

                        Notre association conserve son authenticité, ses équipes, ses actions, rien ne change, juste le nom.
                    </p>
                    <p className="px-8 mt-4">
                        L'association May'HumanLab crée des aides techniques sur-mesure pour les personnes en situation de handicap.

                        Nous sommes le premier Fablab orienté handicap en Mayenne.

                        Notre volonté est de se rapprocher du 100% inclusif dans le département en apportant un savoir-faire technologique, des aides techniques créatives et pertinentes, de l'innovation sociale et environnementale, de la valorisation et la connaissance du handicap par la culture, du militantisme pour une équité sociétale.
                    </p>
                </section>
            </main>
        </>)
};

export default Home;