import { useDispatch, useSelector } from 'react-redux';
import { startVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { selectLoading, selectVolunteer, selectVolunteerModifying } from "../features/volunteer/volunteerSelector";
import VolunteerForm from "../components/VolunteerForm";
import Header from '../components/Header';
import VolunteerListItem from '../components/VolunteerListItem';

function VolunteersListGestion() {
    const dispatch = useDispatch();
    const isModifying = useSelector(selectVolunteerModifying);
    const loading = useSelector(selectLoading);
    const volunteerList = useSelector(selectVolunteer);

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
        <ul className='flex flex-col'>
            {
                loading
                    ?
                    <p>Chargement des données</p>
                    :
                    volunteerList.map((volunteer) =>
                        <li><VolunteerListItem key={volunteer.id_b} volunteer={volunteer} /></li>
                    )
            }
        </ul>

    </>)
};

export default VolunteersListGestion;