import { useDispatch, useSelector } from 'react-redux';
import { startVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { selectVolunteerModifying } from "../features/volunteer/volunteerSelector";
import VolunteerForm from "../components/VolunteerForm";

function VolunteersListGestion(){
    const dispatch = useDispatch();
    const isModifying = useSelector(selectVolunteerModifying);

    function handleAddVolunteer(){
        dispatch(startVolunteerEdit()) //isModifying passe à true
    }

    return(<>
    <button onClick={handleAddVolunteer} variant="contained">Créer un bénévole</button>
    {
        isModifying && <VolunteerForm/>
    }
    
    </>)
};

export default VolunteersListGestion;