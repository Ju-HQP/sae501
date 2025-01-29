import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectVolunteer } from "../features/volunteer/volunteerSelector";
import { deleteVolunteer } from "../features/volunteer/volunteerAsyncAction";
import DeleteButton from "./DeleteButton";
import { startVolunteerEdit } from "../features/volunteer/volunteerSlice";

function VolunteerListItem({ volunteer, width }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    
    const handleDeleteVolunteer = (id) => {
        dispatch(deleteVolunteer({id}));
    }

    const handlePlay = () => {
        dispatch(startVolunteerEdit(volunteer.id_benevole));
    }

    const competence = [...volunteer.competences];

    return (
        width < 1024
            ?
            <section className="mt-12 grid grid-cols-2 w-full gap-2 max-w-md">
                <img src={volunteer.photo_b} className="col-end-3 m-auto row-start-1 row-end-4 w-24 h-24 rounded-full object-cover"/>
                <p className="col-start-1 text-xl font-semibold">{volunteer.prenom_b} {volunteer.nom_b}</p>
                <p className="col-start-1">{volunteer.tel_b}</p>
                <p className="col-start-1">{volunteer.mail_b}</p>
                <span className="flex col-span-2 m-auto my-2 justify-between gap-4">
                    {competence.map((competence)=><p className="rounded-full px-4 bg-slate-300">{competence.nom_c}</p>)}
                </span>
                <div className="flex col-span-2 m-auto w-full">
                    <button className='primary-btn-small mr-2 w-full' onClick={handlePlay}>Modifier</button>
                    <DeleteButton name={volunteer.nom_b} id={volunteer.id_benevole} deleteVolunteerById={handleDeleteVolunteer}></DeleteButton>
                </div>
            </section>
            :
            <tr className="h-16">
                <td className="flex justify-center">
                    <img src={volunteer.photo_b} className="text-center rounded-full w-12 h-12 object-cover"></img>
                </td>
                <td className="text-center px-2">{volunteer.prenom_b}</td>
                <td className="text-center px-2">{volunteer.nom_b}</td>
                <td className="text-center relative p-2" onMouseOver={()=>{setIsDropdownOpen(true)}} onMouseLeave={()=>{setIsDropdownOpen(false)}}>
                    <p className="rounded-full px-2 bg-slate-300">{competence[0]?.nom_c}{competence.length > 1 && " ..."}</p>
                {
                    isDropdownOpen && competence.length > 1
                    &&
                    <ul className="absolute top-0 left-0 right-0 bg-white z-10 rounded-lg shadow-md p-2 flex flex-col gap-2">
                        {competence.map((competence)=><li className="rounded-full py-1 bg-slate-300">{competence.nom_c}</li>)}
                    </ul>
                }
                    
                </td>
                <td className="text-center px-2">{volunteer.tel_b}</td>
                <td className="text-center px-2">{volunteer.mail_b}</td>
                <td className="text-end p-2">
                    <button className='primary-btn-small m-2' onClick={handlePlay}>Modifier</button>
                    <DeleteButton name={volunteer.nom_b} id={volunteer.id_benevole} deleteVolunteerById={handleDeleteVolunteer}></DeleteButton>
                </td>
            </tr>
    )
};

export default VolunteerListItem;