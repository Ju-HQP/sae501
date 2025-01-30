import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfos } from "../features/user/userSelector";
import { selectVolunteerModifying } from "../features/volunteer/volunteerSelector";
import VolunteerForm from "../components/formulaires/VolunteerForm";
import { logout } from "../features/user/connexion";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfos = useSelector(selectUserInfos);
    const isModifying = useSelector(selectVolunteerModifying);

    /*constante de TEST */
    const competences = [
        "Soudeur", "Graphiste", "Designer"
    ]

    const handleDisconnecting = async () => {
        navigate("/");
        dispatch(logout());
    };

    

    return (<>
        <Header />
        <main className="font-roboto leading-8 mt-20 text-lg">
            <h1 className="text-center font-montserrat my-8 font-extralight text-4xl lg:text-6xl lg:my-12">Mon compte</h1>
            <div className="flex flex-col items-center m-auto md:grid grid-cols-2 md:max-w-xl">
                <img src={userInfos.photo_b} className="w-32 h-32 object-cover rounded-full md:w-40 md:h-40 col-start-1 col-end-2 m-auto" />
                <span className="font-semibold flex text-2xl my-4 md:block md:text-center md:text-3xl md:font-normal col-start-1 col-end-2">
                    <p className="mr-2">{userInfos.prenom_b}</p>
                    <p>{userInfos.nom_b}</p>
                </span>
                <span className="col-start-2 row-start-1 md:text-center">
                    <p>Mail : {userInfos.mail_b}</p>
                    <p className="my-4">Téléphone : {userInfos.tel_b}</p>
                </span>
                <ul className="grid grid-cols-2 gap-3">
                    {competences.map((comp) => <li className="rounded-full px-4 py-1 bg-slate-300 text-center">{comp}</li>)}
                </ul>
                <div className="col-span-2 md:text-end">
                    <button className="mt-8 secondary-btn-small mr-4" onClick={handleDisconnecting}>Déconnexion</button>
                    <NavLink to="/profile/modifier" className="mt-8 primary-btn-small">Modifier</NavLink>
                </div>
            </div>

        </main>
        {isModifying && <VolunteerForm />}
    </>)
};

export default Profile;