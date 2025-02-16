import Home from "./pages/Home";
import VolunteersChart from "./pages/VolunteersChart";
import VolunteersListGestion from "./pages/VolunteersListGestion";
import { Route, Routes } from "react-router-dom";
import Agenda from "./pages/Agenda";
import SiteGestion from "./pages/SiteGestion";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "./features/user/connexion";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import MailResetForm from "./pages/MailResetForm";
import ResetPassword from "./pages/ResetPassword";
import ProfileUpdate from "./pages/ProfileUpdate";
import LegalsMentions from "./pages/LegalsMentions";
import { selectUserIsConnected } from "./features/user/userSelector";

function App() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectUserIsConnected);

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
        <Route exact path="/profile" element={isAuth && <Profile />} />
        <Route exact path="/profile/modifier" element={<ProfileUpdate />} />
        <Route exact path="/mentions-legales" element={<LegalsMentions />} />
        <Route
          exact
          path="/gestion-des-benevoles"
          element={<VolunteersListGestion />}
        />
        <Route path="/mail-reinitialiser" element={<MailResetForm />} />
        <Route path="/reset-password/:token?" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
