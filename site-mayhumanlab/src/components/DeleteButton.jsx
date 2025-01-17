import React from 'react';
import { useDispatch } from 'react-redux';


function DeleteButton({name, id, deleteVolunteerById}) {
  const dispatch= useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteVolunteerById(id);
    setOpen(false);
  }
  return (
    <>
      <button onClick={handleClickOpen} className='secondary-btn-small ml-2'>Supprimer</button>
      {open &&
        (<div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
          <dialog open onClose={handleClose} className="w-screen shadow-2xl rounded-lg relative px-4 md:m-12 lg:mx-32">
            <span className="flex justify-center items-center flex-col mt-8 lg:mt-12 gap-2 pb-6">
              <h2 className="text-2xl font-bold text-center md:text-4xl">Supprimer un compte</h2>
              <p>Êtes-vous sûr de vouloir supprimer {name} ? Cette action est irréversible</p>
              <div>
                <button className='primary-btn-small w-fit text-center mx-2' onClick={handleClose}>Annuler</button>
                <button className='secondary-btn-small w-fit text-center mx-2' onClick={handleDelete}>Supprimer</button>
              </div>
            </span>
          </dialog>
        </div>
      )}
    </>
    
  );
}

export default DeleteButton;
