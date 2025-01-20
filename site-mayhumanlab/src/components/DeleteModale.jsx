import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectIdVolunteerModifying } from '../features/volunteer/volunteerSelector';
import { startVolunteerEdit, stopVolunteerEdit } from '../features/volunteer/volunteerSlice';

function DeleteModale({ title, id, handleDelete }){

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const idDeleting = useSelector(selectIdVolunteerModifying);

    const handleClickOpen = () => {
      dispatch(startVolunteerEdit(idDeleting));
      setOpen(true);
    };
  
    const handleClose = () => {
      dispatch(stopVolunteerEdit());
      setOpen(false);
     };
  
    const handleDeleteItem = () => {
      handleDelete(id);
      dispatch(stopVolunteerEdit());
    };
  
    return (
      <>
        <button onClick={handleClickOpen} className='secondary-btn-small ml-2'>Supprimer</button>
  
        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-lg font-bold mb-4">Confirmer la suppression de {title}</h2>
              <p className="text-sm text-gray-700 mb-6">
                Êtes-vous sûr de vouloir supprimer cet élément ? Cette action ne peut pas être annulée.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDeleteItem}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default DeleteModale;