import { useDispatch, useSelector } from "react-redux";
import { selectLoading, selectVolunteer } from "../features/volunteer/volunteerSelector";
import VolunteersChartItem from "../components/VolunteersChartItem";
import { useEffect } from "react";
import { loadVolunteer } from "../features/volunteer/volunteerAsyncAction";
import Header from "../components/Header";
import Grid from '@mui/material/Grid2';


function VolunteersChart() {

    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const volunteerList = useSelector(selectVolunteer);

    useEffect(() => {
        dispatch(loadVolunteer());
    }, []);

    return (
        <>
            <Header />
            <main>
                <h1 className="font-bold text-xl text-center">Trombinoscope</h1>
                <div className="grid lg:grid-cols-2">
                    {loading ? <p>Chargement des données...</p> : volunteerList.map((volunteer) => 
                        <Grid item xs={1} sm={1} md={2} ld={2} key={volunteer.id}>
                        <VolunteersChartItem volunteer={volunteer} />
                        </Grid>
                    )}
                </div>
            </main>
        </>
    )
};

export default VolunteersChart;