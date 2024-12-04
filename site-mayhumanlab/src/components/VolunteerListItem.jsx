import React from "react";

function VolunteerListItem({ volunteer }) {

    return (
        <>
            <section className="">
                <ul className="grid grid-cols-2">
                    {/* <li className="col-start-2">{volunteer.photo_b}</li> */}
                    <li>{volunteer.prenom_b}</li>
                    <li>{volunteer.nom_b}</li>
                    <li>{volunteer.id_b}</li>
                    <li>{volunteer.mail_b}</li>
                    <li>{volunteer.tel_b}</li>
                </ul>
                <div className="flex justify-between">
                    <button>Modifier</button>
                    <button>Supprimer</button>
                </div>
            </section>
        </>
    )
};

export default VolunteerListItem;