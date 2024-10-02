import { createBrowserRouter } from "react-router-dom";

import AddProject from "./pages/AddProject";
import Projects from "./pages/Projects";
import ModifyProject from "./pages/ModifyProject";
import VolunteersChart from "./pages/VolunteersChart";
import VolunteersList from "./pages/VolunteersList";
import AddVolunteer from "./pages/AddVolunteer";
import Profile from "./pages/Profile";
import ModifyVolunteer from "./pages/ModifyVolunteer";
import ConnectionForm from "./pages/ConnectionForm";
import Home from "./pages/Home";
import App from "./App";

export const router = createBrowserRouter([
        {
            element: <App/>,
            // errorElement:<Page404/>,
            children:[
                {
                path:"/" ,
                element: <Home />
                },
                {
                path:"/projets" ,
                element: <Projects/>
                },
                {
                    path: "/projets/ajouter-un-projet",
                    element: <AddProject/>
                },
                {
                    path: "/projets/modifier-un-projet/:titre",
                    element: <ModifyProject/>
                },
                {
                    path: "/trombinoscope",
                    element: <VolunteersChart/>
                },
                {
                    path: "/gestion-des-bénévoles",
                    element: <VolunteersList/>
                },
                {
                    path: "/gestion/ajouter-un-bénévole",
                    element: <AddVolunteer/>
                },
                {
                    path: "/gestion/modifier-un-bénévole:id",
                    element: <ModifyVolunteer/>
                },
                {
                    path: "/connexion",
                    element: <ConnectionForm/>
                },
                {
                    path: "/compte",
                    element: <Profile/>
                }]
        }
])