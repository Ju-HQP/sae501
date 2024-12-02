import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectVolunteer } from "../features/volunteer/volunteerSelector";
import VolunteersChartItem from "../components/VolunteersChartItem";
import { useEffect } from "react";
import { loadVolunteer } from "../features/volunteer/volunteerAsyncAction";

function VolunteersChart(){

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const volunteerList = useSelector(selectVolunteer);

    useEffect(()=>{
        dispatch(loadVolunteer());
    }, []);

    return(
        <>
            <h1 className="font-bold text-2xl text-center p-6">Trombinoscope</h1>
            <div className="grid gap-x-32 lg:grid-cols-2 p-9 xl:mx-52">
                {loading?<p>Chargement des données...</p>:volunteerList.map((volunteer)=>(
                    <VolunteersChartItem volunteer={volunteer} />
                ))}
            </div>
        </>
    )
};

export default VolunteersChart;