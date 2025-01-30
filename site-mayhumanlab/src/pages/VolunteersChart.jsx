import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectErrorLoad,
  selectLoading,
  selectVolunteer,
} from "../features/volunteer/volunteerSelector";
import VolunteersChartItem from "../components/VolunteersChartItem";
import { loadVolunteer } from "../features/volunteer/volunteerAsyncAction";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterForm from "../components/FilterForm";

function VolunteersChart() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const errorLoading = useSelector(selectErrorLoad);
  const volunteerList = useSelector(selectVolunteer);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.title = "Trombinoscope | May'Humanlab";
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  const [filters, setFilters] = useState([]);

  const memorizedValues = useMemo(() => {
    if (filters.length === 0) {
      return volunteerList;
    }
    return volunteerList.filter((volunteer) =>
      filters.every((filter) => filter(volunteer))
    );
  }, [filters, volunteerList]);

  function onFilter(filters) {
    setFilters(filters);
  }

  useEffect(() => {
    dispatch(loadVolunteer());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="p-8">
        <h1 className="text-center my-6 mb-14 font-bold text-2xl lg:text-4xl">
          Trombinoscope
        </h1>

        <FilterForm onFilter={onFilter} width={width} />

        {loading ? (
          <p className="text-center m-16">Chargement des données...</p>
        ) : errorLoading ? (
          <p className="text-center">{errorLoading}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {memorizedValues.map((volunteer, id) => (
              <VolunteersChartItem key={id} volunteer={volunteer} />
            ))}
          </div>
        )}
      </main>
      <Footer contactVisible={false} />
    </>
  );
}

export default VolunteersChart;