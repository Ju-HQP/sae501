import React from "react";
import { useDispatch } from 'react-redux';

function VolunteerListItem({ volunteer }){
    
    return(
        <>
            <div className="grid lg:grid-cols-2">
                <div>
                    <img src={volunteer.photo_b} alt={`${"Photo de "}+${volunteer.prenom_b}+${" "}+${volunteer.nom_b}`}/>
                    <p className="text-base lg:text-lg">{volunteer.prenom_b} {volunteer.nom_b}</p>
                </div>
                <div>
                    <p className="text-md lg:text-base font-semibold">Coordonnées</p>
                    <ul>
                        <li>{volunteer.mail_b}</li>
                        <li>{volunteer.tel_b}</li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default VolunteerListItem;