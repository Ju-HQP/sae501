import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectVolunteer } from "../features/volunteer/volunteerSelector";
import { deleteVolunteer } from "../features/volunteer/volunteerAsyncAction";
import DeleteButton from "./DeleteButton";

function VolunteerListItem({ volunteer, width }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    
    const handleDeleteVolunteer = (id) => {
        dispatch(deleteVolunteer({id}));
    }

    /*constante de TEST */
    const competences = [
        "Soudeur", "Graphiste", "Designeur"
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
                    <DeleteButton name={volunteer.nom_b} id={volunteer.id_benevole} deleteVolunteerById={handleDeleteVolunteer}></DeleteButton>
                </div>
            </section>
            :
            <tr className="h-16">
                <td className="text-center">164574518456</td>
                <td className="text-center">hjgiguiiiuv</td>
                <td className="text-center">{volunteer.prenom_b}</td>
                <td className="text-center">{volunteer.nom_b}</td>
                <td className="text-center relative font-semibold" onMouseOver={()=>{setIsDropdownOpen(true)}} onMouseLeave={()=>{setIsDropdownOpen(false)}}>
                    <p className="rounded-full py-2 bg-slate-300">{competences[0]} ...</p>
                {
                    isDropdownOpen
                    &&
                    <ul className="absolute top-0 left-0 right-0 bg-white z-10 rounded-lg shadow-md p-4 flex flex-col gap-2">
                        {competences.map((comp)=><li className="rounded-full px-4 py-2 bg-slate-300">{comp}</li>)}
                    </ul>
                }
                    
                </td>
                <td className="text-center">{volunteer.tel_b}</td>
                <td className="text-center">{volunteer.mail_b}</td>
                <td className="text-end">
                    <button className='primary-btn-small mr-2'>Modifier</button>
                    <DeleteButton name={volunteer.nom_b} id={volunteer.id_benevole} deleteVolunteerById={handleDeleteVolunteer}></DeleteButton>
                </td>
            </tr>
    )
};

export default VolunteerListItem;