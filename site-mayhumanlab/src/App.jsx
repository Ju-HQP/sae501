import Home from "./pages/Home";
import VolunteersListGestion from "./pages/VolunteersListGestion";
import { Route, Routes } from "react-router-dom";

function App(){

    return(
    <>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/gestion-des-benevoles" element={<VolunteersListGestion/>} />
        </Routes>
    </>)
};

export default App;