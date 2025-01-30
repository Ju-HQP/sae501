import { useEffect } from "react";
import Header from "../components/Header";
import ProjectsItemAccueil from "../components/accueil/ProjectItemAccueil";
import axes from "../axes.json";
import { useDispatch, useSelector } from "react-redux";
import {
    selectLoadingActu,
    selectSortedActusByReleaseDate,
} from "../features/actualite/actualiteSelector";
import { loadActus } from "../features/actualite/actualiteAsyncAction";
import ActualiteItemAccueil from "../components/accueil/ActualiteItemAccueil";
import Axe from "../components/accueil/Axe";
import {
    selectLoadingProject,
    selectProjects,
} from "../features/project/projectSelector";
import { loadProjects } from "../features/project/projectAsyncAction";
import partenaires from '../partenaires.json';
import Footer from "../components/Footer";
import { datasSQL } from "../features/user/connexion";

function Home() {
    const dispatch = useDispatch();
    const loadingActu = useSelector(selectLoadingActu);
    const listeActualite = useSelector(selectSortedActusByReleaseDate);
    const loadingProject = useSelector(selectLoadingProject);
    const listeProjets = useSelector(selectProjects);

    // dispatch(datasSQL());

    useEffect(() => {
        dispatch(loadActus());
        dispatch(loadProjects());
    }, []);

    return (
        <>
            <Header />
            <main className="font-roboto leading-8 mb-12">
                <>
                    <div className="w-full">
                        <img
                            className="w-full h-96 object-cover"
                            src="/accueil/banner.jpg"
                            alt="bannière"
                        />
                    </div>
                    <section id="presentation" className="px-12 my-8 max-w-6xl m-auto">
                        <h1 className="text-center font-montserrat my-8 font-extralight text-4xl lg:text-6xl lg:my-12">
                            May'HumanLab
                        </h1>
                        <p className="mt-4">
                            Le LAB-LAB devient May'HumanLab pour plusieurs raisons :
                            <p className="ml-2">- Revendiquer l'appartenance à un territoire </p>
                            <p className="ml-2">- Une meilleure compréhension de nos actions </p>
                            <p className="ml-2">- La certification HumanLab (convention des fablabs handicap)</p>
                        </p>
                        <p className="mt-4">
                            Notre association conserve son authenticité, ses équipes, ses
                            actions, rien ne change, juste le nom.
                        </p>
                        <p className="mt-4">
                            L'association May'HumanLab crée des aides techniques sur-mesure
                            pour les personnes en situation de handicap. Nous sommes le
                            premier Fablab orienté handicap en Mayenne. Notre volonté est de
                            se rapprocher du 100% inclusif dans le département en apportant un
                            savoir-faire technologique, des aides techniques créatives et
                            pertinentes, de l'innovation sociale et environnementale, de la
                            valorisation et la connaissance du handicap par la culture, du
                            militantisme pour une équité sociétale.
                        </p>
                    </section>
                    <section id="axes" className="px-6 mt-12 mb-16 max-w-6xl m-auto">
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-8 lg:my-12">
                            Nos Axes
                        </h2>
                        <div className="relative bg-white w-full p-6 rounded-lg">
                            <ul className="lg:flex">
                                {axes.map((axe, id) => (
                                    <Axe axe={axe} key={id} />
                                ))}
                            </ul>
                            <div
                                aria-hidden="true"
                                className="rounded-lg bottom-0 absolute -z-10 inset-x-0 inset-y-4 lg:rounded-3xl blur-md bg-gradient-to-br from-pink-600 via-cyan-500 to-violet-500 opacity-50"
                            ></div>
                        </div>
                    </section>
                    <section id="actu" className="px-16 my-12 max-w-7xl m-auto">
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-8 lg:my-12">
                            Actualités
                        </h2>

                        {loadingActu ? (
                            <p>Chargement des actualités...</p>
                        ) : (
                            <ul className="lg:grid lg:grid-cols-4">
                                {listeActualite.map((actualite, id) => (
                                    <ActualiteItemAccueil actualite={actualite} key={id} />
                                ))}
                            </ul>
                        )}
                    </section>
                    <section id="projets" className="px-12 my-8 max-w-6xl m-auto">
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-8 lg:my-12">
                            Projets
                        </h2>
                        {loadingProject ? (
                            <p>Chargement des projets...</p>
                        ) : (
                            <ul>
                                {listeProjets.map((project, id) => (
                                    <ProjectsItemAccueil project={project} key={id} />
                                ))}
                            </ul>
                        )}
                    </section>
                    <section id='projets' className="px-12 my-12 max-w-6xl m-auto">
                        <h2 className="font-montserrat text-4xl lg:text-6xl font-extralight text-center my-16 lg:my-12">Partenaires</h2>
                        <ul className="grid grid-cols-2 gap-y-4 md:grid-cols-5">{partenaires.map((partenaire, id) =>
                            <li key={id} className="flex">
                                <img src={"/accueil/logo-partenaires/" + partenaire.nom + ".webp"} className="m-auto max-w-24" />
                            </li>
                        )}
                        </ul>
                    </section>
                </>
            </main>
            <Footer contactVisible={true}/>
        </>
    );
}

export default Home;
