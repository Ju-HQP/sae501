import React, { useEffect, useState } from "react";

function VolunteerListItem({ volunteer, width }) {
    

    return (
        <tr  className="table-row">{width < 1024
                        ?
                        <>
                        {/* <td className="col-start-2">{volunteer.photo_b}</td> */}
      
                            <td className="mr-2">{volunteer.prenom_b}</td>
                            <td>{volunteer.nom_b}</td>
                            <td  className="col-start-1">{volunteer.tel_b}</td>
                            <td  className="col-start-1">{volunteer.mail_b}</td>
                        </>
                        :
                        <>
                            <td className="text-center">1</td>
                            <td className="text-center">hjgiguiiiuv</td>
                            <td className="text-center">{volunteer.prenom_b}</td>
                            <td className="text-center">{volunteer.nom_b}</td>
                            <td className="text-center">bnuoehboiqer</td>
                            <td className="text-center">{volunteer.tel_b}</td>
                            <td className="text-center">{volunteer.mail_b}</td>
                            <td>
                                <button className='primary-btn-small w-full mr-2'>Modifier</button>
                                <button className='secondary-btn-small w-full ml-2'>Supprimer</button>
                            </td>
                        </>
                    }
        </tr>
    )
};

export default VolunteerListItem;