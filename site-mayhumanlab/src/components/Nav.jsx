import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectAdmin, selectConnected } from "../features/volunteer/volunteerSelector";

function Nav() {
    const isConnected = useSelector(selectConnected);
    const isAdmin = useSelector(selectAdmin);

    return (
        <>

            {/*Nav pour les bénévoles et admins*/}
            {isConnected &&
                <ul>
                    <li>
                        <Link to='/'>Accueil</Link>
                        <ul>
                            <li>
                                <Link to='/#presentation'>Présentation</Link>
                            </li>
                            <li>
                                <Link to='/#axes'>Axes</Link>
                            </li>
                            <li>
                                <Link to='/#projects'>Projets</Link>
                            </li>
                            <li>
                                <Link to='/#actu'>Actualités</Link>
                            </li>
                            <li>
                                <Link to='/#contacts'>Contacts</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink to='/agenda'>Agenda</NavLink>
                    </li>
                    <li>
                        <NavLink to='/trombinoscope'>Trombinoscope</NavLink>
                    </li>
                    <li>
                        <NavLink to='/trombinoscope'>Trombinoscope</NavLink>
                    </li>
                    <li>
                        <NavLink to='/gestion-du-site'>Gestion du site</NavLink>
                    </li>

                    {/**QUE POUR LES ADMINS */}
                    <li>
                        <NavLink to='/gestion-des-benevoles'>Gestion des comptes</NavLink>
                    </li>
                </ul>
            }

            {/*Nav pour les utilisateurs */}
            <ul>
                <li>
                    <Link to='/'>Accueil</Link>
                </li>
                <li>
                    <Link to='/#presentation'>Présentation</Link>
                </li>
                <li>
                    <Link to='/#axes'>Axes</Link>
                </li>
                <li>
                    <Link to='/#projects'>Projets</Link>
                </li>
                <li>
                    <Link to='/#actu'>Actualités</Link>
                </li>
                <li>
                    <Link to='/#contacts'>Contacts</Link>
                </li>
            </ul>
        </>)
};

export default Nav;