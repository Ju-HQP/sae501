import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  selectVolunteer,
} from "../features/volunteer/volunteerSelector";
import VolunteersChartItem from "../components/VolunteersChartItem";
import { useEffect } from "react";
import { loadVolunteer } from "../features/volunteer/volunteerAsyncAction";
import Header from "../components/Header";

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
        <div className="grid grid-cols-1 md:grid-cols-2">
          {loading ? (
            <p>Chargement des données...</p>
          ) : (
            volunteerList.map((volunteer,item) => (
              <VolunteersChartItem
                item
                key={item}
                volunteer={volunteer}
              />
            ))
          )}
        </div>
      </main>
    </>
  );
}

export default VolunteersChart;
