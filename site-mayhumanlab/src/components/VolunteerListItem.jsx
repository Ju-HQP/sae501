import React from "react";

function VolunteerListItem({ volunteer }) {

    return (
        <>
            <section className="p-4 text-lg">
                <ul className="grid grid-cols-2 gap-2">
                    {/* <li className="col-start-2">{volunteer.photo_b}</li> */}
                    <span className="flex font-semibold text-xl">
                        <li className="mr-2">{volunteer.prenom_b}</li>
                        <li>{volunteer.nom_b}</li>
                    </span>
                    <li>{volunteer.id_b}</li>
                    <li>{volunteer.mail_b}</li>
                    <li className="col-start-1">{volunteer.tel_b}</li>
                </ul>
                <div className="flex justify-between mt-4">
                    <button className='primary-btn-small w-full mr-2'>Modifier</button>
                    <button className='secondary-btn-small w-full ml-2'>Supprimer</button>
                </div>
            </section>
        </>
    )
};

export default VolunteerListItem;