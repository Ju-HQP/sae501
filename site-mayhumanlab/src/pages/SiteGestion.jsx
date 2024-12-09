import Header from "../components/Header";
import { useSelector } from "react-redux";
import ActualityForm from "../components/ActualityForm";
import ActualityList from "../components/ActualityList";
import { selectEditActu, selectLoadingActu } from "../features/actuality/actualitySelector";

function SiteGestion(){
    
    const editActu = useSelector(selectEditActu);
    const loadingActu = useSelector(selectLoadingActu);

    return(
    <>
        <Header />
        <main>
          <h1 className='text-center my-6 font-bold text-2xl'>Gestion du site</h1>

          {editActu ? <ActualityForm/> : null}
          {loadingActu ? <p>Chargement des actualités...</p> : <ActualityList/>}   
        </main>
    </>)
};

export default SiteGestion;