import React from "react";

function VolunteersItem({ volunteer }){

    return(
        <>
            <div className="grid md:grid-cols-2 m-6">
                <div id="volunteer_bloc1" className="flex flex-col items-center gap-1 self-center">
                    <img src={volunteer.photo_b} className="flex object-cover w-40 h-40 rounded-lg text-center justify-center" alt={`Photo de ${volunteer.prenom_b} ${volunteer.nom_b}`}/>
                    <p className="text-lg text-center mb-0">{volunteer.prenom_b}</p>
                    <p className="text-lg text-center">{volunteer.nom_b}</p>
                </div>
                <div id="volunteer_bloc2" className="flex flex-col space-y-4">
                    <div className="my-1">
                        <p className="text-base text-center font-semibold">Coordonnées</p>
                        <ul className="text-center">
                            <li>{volunteer.mail_b}</li>
                            <li>{volunteer.tel_b}</li>
                        </ul>
                    </div>
                    <div className="my-1 flex flex-col gap-2 items-center">
                        <p className="text-base text-center font-semibold">Compétences</p>
                        <ul className="text-center w-max grid gap-3 xl:grid-cols-2">
                            <li className="bg-gray-200 rounded-full p-2 min-w-4 xl:max-w-48 truncate">Oui</li>
                            <li className="bg-gray-200 rounded-full p-2 min-w-4 xl:max-w-48 truncate">Untrucsuperlongonvoitequeçado</li>
                            <li className="bg-gray-200 rounded-full p-2 min-w-4 xl:max-w-48 truncate">Fraiseur</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </>
        )
};

export default VolunteersItem;