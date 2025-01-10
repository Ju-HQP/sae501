import Header from "../components/Header";
import ProjectsItemAccueil from "../components/ProjectItemAccueil";
import projects from '../projects.json';

function Home() {

    return (
        <>
            <Header />
            <main className="font-roboto leading-8">
                {/* <div className="fixed top-12 w-full h-32 bg-url[('/accueil/bg-banniere.webp')]"></div> */}
                <img className="w-full" src="/accueil/banner.jpg" alt="bannière" />
                <section className="px-12">
                    <h1 className='text-center my-6 font-bold text-2xl lg:text-4xl'>May'HumanLab</h1>
                    <p className="">Le LAB-LAB devient May'HumanLab pour plusieurs raisons :

                        - Revendiquer l'appartenance à un territoire
                        - Une meilleure compréhension de nos actions
                        - La certification HumanLab (convention des fablabs handicap)


                    </p>
                    <p className="mt-4">
                        Notre association conserve son authenticité, ses équipes, ses actions, rien ne change, juste le nom.
                    </p>
                    <p className="mt-4">
                        L'association May'HumanLab crée des aides techniques sur-mesure pour les personnes en situation de handicap.

                        Nous sommes le premier Fablab orienté handicap en Mayenne.

                        Notre volonté est de se rapprocher du 100% inclusif dans le département en apportant un savoir-faire technologique, des aides techniques créatives et pertinentes, de l'innovation sociale et environnementale, de la valorisation et la connaissance du handicap par la culture, du militantisme pour une équité sociétale.
                    </p>
                </section>
                <section className="px-12">
                    <h2>Projets</h2>
                    {projects.map((project, id)=><ProjectsItemAccueil project={project} key={id}/>)}
                </section>
            </main>
        </>)
};

export default Home;