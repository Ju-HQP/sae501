import { formatDate } from '../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { startEditActu } from '../features/actualite/actualiteSlice';
import DeleteModale from './DeleteModale';
import { deleteActu } from '../features/actualite/actualiteAsyncAction';
import DeleteButton from './DeleteButton';

function ActualiteRow({ actualite, width, handleDelete }) {

  const dispatch = useDispatch();

  // Fonction qui sera passé en paramètre du composant DeleteButton
   const handleDeleteActuality = (id) => {
      dispatch(deleteActu({id}));
    };
  
  const handleEdit = () => {
    dispatch(startEditActu(actualite.id_actualite));
  };

  return (
    width < 1024
      ?
      <tr className="h-16">
        <td className="text-center">{actualite.titre_a}</td>
        <td className="text-center">{actualite.date_a}</td>
        <td className="text-center">{actualite.image_a}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteButton
          name={actualite.titre_a}
          id={actualite.id_actualite}
          deleteEntityById={handleDeleteActuality}
        ></DeleteButton>        </td>
      </tr>
      :
      <tr className="h-16">
        <td className="text-center">{actualite.titre_a}</td>
        <td className="text-center">{actualite.date_a}</td>
        <td className="text-center">{actualite.image_a}</td>
        <td className="text-center">{actualite.description_a}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteButton
          name={actualite.titre_a}
          id={actualite.id_actualite}
          deleteEntityById={handleDeleteActuality}
        ></DeleteButton></td>
      </tr>
  );

}

export default ActualiteRow;