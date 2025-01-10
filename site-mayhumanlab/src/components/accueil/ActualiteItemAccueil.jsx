function ActualiteItemAccueil({ actualite }) {

    return (
        <li className="w-full h-2/3 pt-4 mb-8 lg:m-0 lg:pt-0">
            
            <div className="p-6">
                <h3 className="font-montserrat font-extralight text-3xl text-center mb-4">
                    {actualite.titre_a}
                </h3>
                <img src={actualite.image_a} className="object-cover h-44 w-48 m-auto rounded-lg my-6" />
                <p className="mt-6 lg:mx-8">{actualite.date_a}</p>
                <p className="my-4 lg:mx-8 lg:leading-7">
                    {actualite.description_a}
                </p>
                
            </div>            
        </li>)
};

export default ActualiteItemAccueil;