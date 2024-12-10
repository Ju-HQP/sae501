import React from 'react';
import { stopVolunteerDelete } from '../features/volunteer/volunteerSlice';
import { useDispatch } from 'react-redux';


function DeleteButton({volunteer, deleteVolunteerById}) {
  const dispatch= useDispatch();

  function handleExit() {
    dispatch(stopVolunteerDelete());
  }

  const handleDelete = () => {
    deleteVolunteerById(volunteer.id_benevole);
  }


  
  return (
    <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
      <dialog open onClose={handleExit} className="w-screen shadow-2xl rounded-lg relative px-4 md:m-12 lg:mx-32">
        <span className="flex justify-center items-center flex-col mt-8 lg:mt-12 gap-2 pb-6">
          <h2 className="text-2xl font-bold text-center md:text-4xl">Supprimer un compte</h2>
          <p>Êtes-vous sûr de vouloir supprimer {volunteer.nom_b} ? Cette action est irréversible</p>
          <div>
            <button className='primary-btn-small w-fit text-center mx-2' onClick={handleExit}>Annuler</button>
            <button className='secondary-btn-small w-fit text-center mx-2' onClick={handleDelete}>Supprimer</button>
          </div>
        </span>
      </dialog>
    </div>
  );
}

export default DeleteButton;
