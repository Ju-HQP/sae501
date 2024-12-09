import { formatDate } from '../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { startEdit } from '../features/actuality/actualitySlice';
import DeleteModale from './DeleteModale';

function ActualityRow({ actuality, handleDelete }) {

  const { title, date } = actuality; /* Récupération des informations utiles de l'actualité */
  const formattedDate = formatDate(date); /* Formatte la date sous la forme jour nom du mois année */

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(startEdit(actuality.id));
  };

  return (
    <div className="flex items-center justify-between border-b py-2 px-4">
      <p className="text-sm text-gray-500">{formattedDate}</p>
      <h2 className="text-lg font-bold flex-grow mx-4">{title}</h2>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Modifier" onClick={handleEdit}
      >
        Modifier
      </button>
      <DeleteModale title={title} id={actuality.id} handleDelete={handleDelete}/>
    </div>
  );

}

export default ActualityRow;