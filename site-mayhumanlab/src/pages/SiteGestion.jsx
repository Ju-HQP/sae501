import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import ActualiteForm from "../components/ActualiteForm";
import ActualiteList from "../components/ActualiteList";
import { selectEditActu, selectLoadingActu } from "../features/actualite/actualiteSelector";
import { loadActus } from "../features/actualite/actualiteAsyncAction";
import { useEffect, useState } from "react";
import { selectSortedActusByReleaseDate } from "../features/actualite/actualiteSelector";
import { selectErrorDeleteActu } from "../features/actualite/actualiteSelector";
import { startEditActu } from '../features/actualite/actualiteSlice';
import { deleteActu } from "../features/actualite/actualiteAsyncAction";
import ActualiteRow from "../components/ActualiteRow";

function SiteGestion(){
    
  const dispatch = useDispatch();  
  const editActu = useSelector(selectEditActu);
  const loadingActu = useSelector(selectLoadingActu);
  const listeActualite = useSelector(selectSortedActusByReleaseDate);
  const errorDelete = useSelector(selectErrorDeleteActu);
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth)
  }

  const handleAddActu = () => {
    dispatch(startEditActu());
  };

  const handleDelete = (id) => {
    dispatch(deleteActu({ id }));
  };

  useEffect(() => {
    dispatch(loadActus());
    window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
  <>
      <Header />
      <main className='flex flex-col items-center p-8'>
        
      <h1 className='text-center my-6 font-bold text-2xl lg:text-4xl'>Gestion du site</h1>
        
        <div className='w-full flex justify-end'>
          <button onClick={handleAddActu} className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-600">
            Créer une nouvelle actualité
          </button>
        </div>
        
        {editActu ? <ActualiteForm/> : null}

        {loadingActu 
        
          ? 
          <p>Chargement des actualités...</p> 
          : 

          width < 1024 
          ?
            <table className='mt-8 w-11/12 min-w-fit'>
              <thead className='h-16'>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Image</th>
                  <th className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
              {listeActualite.map((actualite) => (
                <ActualiteRow key={actualite.id_actualite} actualite={actualite} handleDelete={handleDelete} />
              ))}
              </tbody>
            </table>
          :
            <table className='mt-8 w-11/12 min-w-fit'>
              <thead className='h-16'>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th className='text-end'>Actions</th>
                </tr>
              </thead>
              <tbody>
              {listeActualite.map((actualite) => (
                <ActualiteRow key={actualite.id_actualite} actualite={actualite} handleDelete={handleDelete} />
              ))}
              </tbody>
            </table>
        }
      </main>
  </>)

};

export default SiteGestion;