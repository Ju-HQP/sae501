import { formatDate } from '../utils/dateUtils';
import { useDispatch } from 'react-redux';
import { startEditActu } from '../features/actualite/actualiteSlice';
import DeleteModale from './DeleteModale';
import { deleteActu } from '../features/actualite/actualiteAsyncAction';
import DeleteButton from './DeleteButton';

function ActualiteRow({ actualite, width, handleDelete }) {

  const dispatch = useDispatch();

  const formattedDate = formatDate(actualite.date_a);

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
      <section className="mt-12 grid grid-cols-2 w-full gap-2 max-w-md">
          <img src={actualite.image_a} className="col-end-3 m-auto row-start-1 row-end-4 w-24 h-24 rounded-lg bg-slate-500"></img>
          <p className="col-start-1 text-xl font-semibold">{actualite.titre_a}</p>
          <p className="col-start-1">{formattedDate}</p>
          <p className="col-start-1">{actualite.description_a}</p>
          <div className="flex col-span-2 m-auto w-full">
              <button className='primary-btn-small mr-2 w-full' onClick={handleEdit}>Modifier</button>
              <DeleteButton
          name={actualite.titre_a}
          id={actualite.id_actualite}
          deleteEntityById={handleDeleteActuality}
        ></DeleteButton>          </div>
      </section>
      :
      <tr className="h-16">
        <td className="text-left max-w-[150px] truncate p-2">{actualite.titre_a}</td>
        <td className="text-center max-w-[150px] truncate p-2">{formattedDate}</td>
        <td className="text-left p-2"><img src={actualite.image_a} className="mx-auto text-center w-12 h-12 rounded-lg object-cover"></img></td>
        <td className="text-left max-w-[300px] truncate p-2">{actualite.description_a}</td>
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