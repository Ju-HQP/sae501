import Header from "../components/Header";
import ProjectsItemAccueil from "../components/ProjectItemAccueil";
import projects from '../projects.json';

function Home() {

    return (
        <>
            <Header />
            <main className="font-roboto leading-8">
                {/* {width < 1024
                    ? */}
                <>
                    <div className="w-full">
                        <img className="w-full h-96 object-cover" src="/accueil/banner.jpg" alt="bannière" />
                    </div>
                    <section className="px-12 my-8 max-w-6xl m-auto">
                        <h1 className='text-center my-8 font-thin text-4xl lg:text-5xl  lg:my-12'>May'HumanLab</h1>
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
                    <section className="px-12 my-8 max-w-6xl m-auto">
                        <h2 className="text-4xl font-thin text-center my-8">Projets</h2>
                        <ul>{projects.map((project, id) => <ProjectsItemAccueil project={project} key={id} />)}</ul>
                    </section>
                </>
                {/*  :
                    <></>
                }  */}
            </main>
        </>)
};

export default Home;