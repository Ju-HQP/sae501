import React from "react";

function VolunteerListItem({ volunteer, width }) {
    const competences = [
        "soudeur", "graphiste", "designeur"
    ]


    return (
        width < 1024
            ?
            <section className="mt-12 grid grid-cols-2 w-full gap-2 max-w-md">
                <p className="col-end-3 m-auto row-start-1 row-end-4 w-24 h-24 rounded-full bg-slate-500"></p>
                <p className="col-start-1 text-xl font-semibold">{volunteer.prenom_b} {volunteer.nom_b}</p>
                <p className="col-start-1">164574518456</p>
                <p className="col-start-1">{volunteer.tel_b}</p>
                <p className="col-start-1">{volunteer.mail_b}</p>
                <span className="flex col-span-2 m-auto my-2 justify-between gap-4">
                    <p className="rounded-full px-4 py-2 bg-slate-300">Compétence 1</p>
                    <p className="rounded-full px-4 py-2 bg-slate-300">Compétence 2</p>
                </span>
                <div className="flex col-span-2 m-auto w-full">
                    <button className='primary-btn-small mr-2 w-full'>Modifier</button>
                    <button className='secondary-btn-small ml-2 w-full'>Supprimer</button>
                </div>
            </section>
            :
            <tr className="h-16">
                <td className="text-center">164574518456</td>
                <td className="text-center">hjgiguiiiuv</td>
                <td className="text-center">{volunteer.prenom_b}</td>
                <td className="text-center">{volunteer.nom_b}</td>
                <td className="text-center">bnuoehboiqer</td>
                <td className="text-center">{volunteer.tel_b}</td>
                <td className="text-center">{volunteer.mail_b}</td>
                <td className="text-end">
                    <button className='primary-btn-small mr-2'>Modifier</button>
                    <button className='secondary-btn-small ml-2'>Supprimer</button>
                </td>
            </tr>
    )
};

export default VolunteerListItem;