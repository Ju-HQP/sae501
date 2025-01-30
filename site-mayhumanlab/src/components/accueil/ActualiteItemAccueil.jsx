import { formatDate } from "../../utils/dateUtils";

function ActualiteItemAccueil({ actualite }) {

    const formattedDate = formatDate(actualite.date_a);

    return (
        <li className="w-full h-2/3 pt-4 mb-8 lg:m-0 lg:pt-0">
            
            <div className="p-6">
                <img src={actualite.image_a} className="object-cover h-44 w-48 m-auto rounded-lg my-6" />
                <h3 className="font-jura font-extralight text-3xl text-center mb-4">
                    {actualite.titre_a}
                </h3>
                <p className="mt-6 lg:mx-8">{formattedDate}</p>
                <p className="my-4 lg:mx-8 lg:leading-7">
                    {actualite.description_a}
                </p>
                
            </div>            
        </li>)
};

export default ActualiteItemAccueil;