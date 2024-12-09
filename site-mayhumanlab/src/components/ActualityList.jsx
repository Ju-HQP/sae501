import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorDeleteActu, selectSortedActusByReleaseDate } from '../features/actuality/actualitySelector';
import { deleteActu } from '../features/actuality/actualityAsyncAction';
import { startEdit } from '../features/actuality/actualitySlice';
import ActualityRow from './ActualityRow';

function ActualityList() {

  const dispatch = useDispatch();
  const listeActuality = useSelector(selectSortedActusByReleaseDate);
  const errorDelete = useSelector(selectErrorDeleteActu);

  const handleAdd = () => {
    dispatch(startEdit());
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
          onClick={handleAdd}
        >
          Ajouter une actualité
        </button>
      </div>

      {listeActuality.map((actuality) => (
        <li key={actuality.id} className="flex items-center space-x-4 p-2 border rounded shadow-sm">
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <ActualityRow actuality={actuality} handleDelete={handleDelete} />
        </li>
      ))}
    </div>
  );
}

export default ActualityList;
