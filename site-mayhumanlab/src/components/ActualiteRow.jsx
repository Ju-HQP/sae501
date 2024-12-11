import { formatDate } from '../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { startEditActu } from '../features/actualite/actualiteSlice';
import DeleteModale from './DeleteModale';

function ActualiteRow({ actualite, width, handleDelete }) {

  const dispatch = useDispatch();

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
          <DeleteModale title={actualite.titre_a} id={actualite.id_actualite} handleDelete={handleDelete}/>
        </td>
      </tr>
      :
      <tr className="h-16">
        <td className="text-center">{actualite.titre_a}</td>
        <td className="text-center">{actualite.date_a}</td>
        <td className="text-center">{actualite.image_a}</td>
        <td className="text-center">{actualite.description_a}</td>
        <td className="text-end">
          <button className='primary-btn-small mr-2' onClick={handleEdit}>Modifier</button>
          <DeleteModale title={actualite.titre_a} id={actualite.id_actualite} handleDelete={handleDelete}/>
        </td>
      </tr>
  );

}

export default ActualiteRow;