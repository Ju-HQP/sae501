import Header from "../components/Header";
import { useSelector } from "react-redux";
import ActualityForm from "../components/ActualityForm";
import ActualityList from "../components/ActualityList";
import { selectEditActu } from "../features/actuality/actualitySelector";

function SiteGestion(){
    
    const edit = useSelector(selectEditActu);

    return(
    <>
        <Header />
        <main>
          {edit ? <ActualityForm/> : null}
          <ActualityList/>
        </main>
    </>)
};

export default SiteGestion;