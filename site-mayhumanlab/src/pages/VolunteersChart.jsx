import { useDispatch, useSelector } from "react-redux";
import {
  selectErrorLoad,
  selectLoading,
  selectVolunteer,
} from "../features/volunteer/volunteerSelector";
import VolunteersChartItem from "../components/VolunteersChartItem";
import { useEffect } from "react";
import { loadVolunteer } from "../features/volunteer/volunteerAsyncAction";
import Header from "../components/Header";
import Footer from "../components/Footer";

function VolunteersChart() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const errorLoading = useSelector(selectErrorLoad);
  const volunteerList = useSelector(selectVolunteer);

  useEffect(() => {
    dispatch(loadVolunteer());
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1 className="text-center my-6 font-bold text-2xl lg:text-4xl">
          Trombinoscope
        </h1>
        {loading ? (
          <p className="text-center">Chargement des données...</p>
        ) : errorLoading ? (
          <p className="text-center">{errorLoading}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {volunteerList.map((volunteer, id) => (
              <VolunteersChartItem key={id} volunteer={volunteer} />
            ))}
          </div>
        )}
      </main>
      <Footer contactVisible={false}/>
    </>
  );
}

export default VolunteersChart;
