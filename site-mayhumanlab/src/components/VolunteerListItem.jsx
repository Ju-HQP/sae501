import React from "react";
import { useDispatch } from 'react-redux';

function VolunteerListItem({ volunteer }){
    const { name, role, email } = volunteer;
    
    const dispatch = useDispatch();

    return(<></>)
};

export default VolunteerListItem;