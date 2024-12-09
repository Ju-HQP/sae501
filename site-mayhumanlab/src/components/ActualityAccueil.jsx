import { useSelector } from "react-redux";
import ActualityBlock from "./ActualityBlock";
import { selectSortedActusByReleaseDate } from "../features/actuality/actualitySelector";

function ActualityAccueil() {

    const listeActuality = useSelector(selectSortedActusByReleaseDate);

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {listeActuality.map((actuality) => (
                <ActualityBlock actuality={actuality} />
            ))}
        </div>
    );
}

export default ActualityAccueil;
