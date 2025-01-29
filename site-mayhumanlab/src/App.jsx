import Home from "./pages/Home";
import VolunteersChart from "./pages/VolunteersChart";
import VolunteersListGestion from "./pages/VolunteersListGestion";
import { Route, Routes } from "react-router-dom";
import Agenda from "./pages/Agenda";
import SiteGestion from "./pages/SiteGestion";
import { useDispatch } from "react-redux";
import { getAuth } from "./features/user/connexion";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import PasswordPage from "./pages/PasswordPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/agenda" element={<Agenda />} />
        <Route exact path="/trombinoscope" element={<VolunteersChart />} />
        <Route exact path="/gestion-du-site" element={<SiteGestion />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route
          exact
          path="/gestion-des-benevoles"
          element={<VolunteersListGestion />}
        />
        <Route path="/reset-password/:token?" element={<PasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
