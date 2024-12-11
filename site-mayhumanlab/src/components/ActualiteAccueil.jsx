import { useSelector } from "react-redux";
import ActualiteBlock from "./ActualiteBlock";
import { selectSortedActusByReleaseDate } from "../features/actualite/actualiteSelector";

function ActualiteAccueil() {

    const listeActualite = useSelector(selectSortedActusByReleaseDate);

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {listeActualite.map((actualite) => (
                <ActualiteBlock actualite={actualite} />
            ))}
        </div>
    );
}

export default ActualiteAccueil;
