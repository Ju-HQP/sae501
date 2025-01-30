import { useDispatch, useSelector } from "react-redux";
import { startVolunteerEdit } from "../features/volunteer/volunteerSlice";
import {
  selectErrorLoad,
  selectLoading,
  selectVolunteer,
  selectVolunteerModifying,
} from "../features/volunteer/volunteerSelector";
import VolunteerForm from "../components/formulaires/VolunteerForm";
import Header from "../components/Header";
import VolunteerListItem from "../components/VolunteerListItem";
import { loadVolunteer } from "../features/volunteer/volunteerAsyncAction";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

function VolunteersListGestion() {
  const dispatch = useDispatch();
  const isModifying = useSelector(selectVolunteerModifying);
  const loading = useSelector(selectLoading);
  const errorLoading = useSelector(selectErrorLoad);
  const volunteerList = useSelector(selectVolunteer);
  const [width, setWidth] = useState(window.innerWidth);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    dispatch(loadVolunteer());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  function handleAddVolunteer() {
    dispatch(startVolunteerEdit()); //isModifying passe à true
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center p-8">
        <h1 className="text-center my-6 font-bold text-2xl lg:text-4xl">
          Gestion des comptes
        </h1>
        <div className="w-full flex justify-end px-14">
          <button
            onClick={handleAddVolunteer}
            className=" text-white primary-btn-small"
          >
            Créer un bénévole
          </button>
        </div>
        {isModifying && <VolunteerForm />}
        {loading ? (
          <p>Chargement des données...</p>
        ) : errorLoading ? (
          <p>{errorLoading}</p>
        ) : width < 1024 ? (
          /**Pour les écrans inférieurs à 1024px*/
          volunteerList.map((volunteer, id) => (
            <VolunteerListItem key={id} volunteer={volunteer} width={width} />
          ))
        ) : (
          /**Pour les écrans supérieurs à 1024px, les comptes sont présentés sous forme de tableau*/
          <table className="mt-8 w-11/12 min-w-fit border-separate border-spacing-4">
            <thead className="h-16">
              <tr>
                <th>Photo</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Compétences</th>
                <th>Téléphone</th>
                <th>Mail</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteerList.map((volunteer, id) => (
                <VolunteerListItem
                  key={id}
                  volunteer={volunteer}
                  width={width}
                />
              ))}
            </tbody>
          </table>
        )}
      </main>
      <Footer contactVisible={false}/>
    </>
  );
}

export default VolunteersListGestion;
