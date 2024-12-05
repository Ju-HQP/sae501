import React from "react";

function VolunteersItem({ volunteer }){

    return(
        <>
            <div className="grid md:grid-cols-2 gap-2 lg:gap-14 m-6">
                <div id="volunteer_bloc1" className="flex flex-col items-center gap-1">
                    <img src={volunteer.photo_b} className="object-contain w-40 h-40 rounded-lg" alt={`${"Photo de "}+${volunteer.prenom_b}+${" "}+${volunteer.nom_b}`}/>
                    <p className="text-lg text-center">{volunteer.prenom_b} {volunteer.nom_b}</p>
                </div>
                <div id="volunteer_bloc2" className="flex flex-col space-y-4">
                    <div className="my-1">
                        <p className="text-base text-center font-semibold">Coordonnées</p>
                        <ul className="text-center">
                            <li>{volunteer.mail_b}</li>
                            <li>{volunteer.tel_b}</li>
                        </ul>
                    </div>
                    <div className="my-1">
                        <p className="text-base text-center font-semibold">Compétences</p>
                        <ul className="text-center">
                            <li className="bg-gray-200 rounded-full">Oui</li>
                        </ul>
                    </div>
                    
                </div>
            </div>
        </>
        )
};

export default VolunteersItem;