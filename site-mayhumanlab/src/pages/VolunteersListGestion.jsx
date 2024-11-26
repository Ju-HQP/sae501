import { useDispatch, useSelector } from 'react-redux';
import { startVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { selectVolunteerModifying } from "../features/volunteer/volunteerSelector";
import VolunteerForm from "../components/VolunteerForm";
import Header from '../components/Header';

function VolunteersListGestion() {
    const dispatch = useDispatch();
    const isModifying = useSelector(selectVolunteerModifying);

    function handleAddVolunteer() {
        dispatch(startVolunteerEdit()) //isModifying passe à true
    }

    return (<>
        <Header />
        <main className='flex flex-col items-center p-4 '>
            <h1 className='text-center my-6 font-bold text-2xl'>Gestion des comptes</h1>

            <div className='w-full flex justify-end'>
                <button onClick={handleAddVolunteer} variant="contained" className=' text-white text-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center'>Créer un bénévole</button>
            </div>
        </main>
        {
            isModifying && <VolunteerForm />
        }

    </>)
};

export default VolunteersListGestion;