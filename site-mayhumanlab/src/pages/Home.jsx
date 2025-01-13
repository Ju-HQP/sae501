
import { useEffect } from "react";
import Header from "../components/Header";
import ProjectsItemAccueil from "../components/accueil/ProjectItemAccueil";
import projects from '../projects.json';
import axes from '../axes.json';
import { useDispatch, useSelector } from "react-redux";
import { selectLoadingActu, selectSortedActusByReleaseDate } from "../features/actualite/actualiteSelector";
import { loadActus } from "../features/actualite/actualiteAsyncAction";
import ActualiteItemAccueil from "../components/accueil/ActualiteItemAccueil";
import Axe from "../components/accueil/Axe";

function Home() {
    const dispatch = useDispatch();
    const loadingActu = useSelector(selectLoadingActu);
    const listeActualite = useSelector(selectSortedActusByReleaseDate);

    useEffect(() => {
        dispatch(loadActus());
    }, []);

    return (
        <>
            <Header />
            <main className="font-roboto leading-8 mb-12">
                <>
                    <div className="w-full">
                        <img className="w-full h-96 object-cover" src="/accueil/banner.jpg" alt="bannière" />
                    </div>
                    <section className="px-12 my-8 max-w-6xl m-auto">
                        <h1 className='text-center font-montserrat my-8 font-extralight text-4xl lg:text-6xl lg:my-12'>May'HumanLab</h1>
                        <p className="">Le LAB-LAB devient May'HumanLab pour plusieurs raisons :
                            <ul>

                                <li>- Revendiquer l'appartenance à un territoire</li>
                                <li>- Une meilleure compréhension de nos actions</li>
                                <li>- La certification HumanLab (convention des fablabs handicap)</li>
                            </ul>

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
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-8 lg:my-12">Nos Axes</h2>
                        <ul>{axes.map((axe, id) => <Axe axe={axe} key={id} />)}</ul>
                    </section>
                    <section className="px-16 my-12 max-w-7xl m-auto">
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-8 lg:my-12">Actualités</h2>

                        {loadingActu
                            ?
                            <p>Chargement des actualités...</p>
                            :
                            <ul className="lg:grid lg:grid-cols-4">{listeActualite.map((actualite, id)=> <ActualiteItemAccueil actualite={actualite} key={id}/>)}</ul>
                        }
                    </section>
                    <section className="px-12 my-8 max-w-6xl m-auto">
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-8 lg:my-12">Projets</h2>
                        <ul>{projects.map((project, id) => <ProjectsItemAccueil project={project} key={id} />)}</ul>
                    </section>
                </>
            </main>
        </>)
};

export default Home;