import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorDeleteActu, selectSortedActusByReleaseDate } from '../features/actualite/actualiteSelector';
import { deleteActu } from '../features/actualite/actualiteAsyncAction';
import { startEditActu } from '../features/actualite/actualiteSlice';
import ActualiteRow from './ActualiteRow';

function ActualiteList() {

  const dispatch = useDispatch();
  const listeActualite = useSelector(selectSortedActusByReleaseDate);
  const errorDelete = useSelector(selectErrorDeleteActu);

  const handleAddActu = () => {
    dispatch(startEditActu());
  };

  const handleDelete = (id) => {
    dispatch(deleteActu({ id }));
  };

  return (
    <div className="space-y-4">
      {errorDelete && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          <p>{errorDelete}</p>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600"
          onClick={handleAddActu}
        >
          Ajouter une actualité
        </button>
      </div>

      {listeActualite.map((actualite) => (
        <ActualiteRow key={actualite.id_actualite} actualite={actualite} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default ActualiteList;
