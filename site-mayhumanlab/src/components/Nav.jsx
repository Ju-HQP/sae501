import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectAdmin, selectConnected } from "../features/volunteer/volunteerSelector";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Nav() {
    const isConnected = useSelector(selectConnected);
    const isAdmin = useSelector(selectAdmin);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <>
            <nav className="">

                {/*Nav pour les bénévoles et admins*/}
                {
                    isConnected
                        ?
                        <section>
                            <Bars3Icon className="w-12" onClick={() => setIsNavOpen((prev) => !prev)} />
                            {
                                isNavOpen
                                &&
                                <div className="absolute top-0 left-0 bg-white w-full h-screen flex flex-col items-end p-8">
                                    <XMarkIcon className="w-12" onClick={() => setIsNavOpen(false)} />
                                    <ul className="text-lg p-6 flex flex-col justify-between items-end">
                                        <li className="flex flex-col items-end">
                                            <span className="flex justify-between w-20">
                                                <button onClick={() => setIsMenuOpen((prev) => !prev)}>Accueil</button>
                                                <ChevronDownIcon className="w-4" onClick={() => setIsMenuOpen((prev) => !prev)} />
                                            </span>
                                            {
                                                isMenuOpen
                                                &&
                                                <ul className="flex flex-col justify-between items-end pt-3">
                                                    <li className="my-3">
                                                        <Link to='/#presentation'>Présentation</Link>
                                                    </li>
                                                    <li className="my-3">
                                                        <Link to='/#axes'>Axes</Link>
                                                    </li>
                                                    <li className="my-3">
                                                        <Link to='/#projects'>Projets</Link>
                                                    </li>
                                                    <li className="my-3">
                                                        <Link to='/#actu'>Actualités</Link>
                                                    </li>
                                                    <li className="my-3">
                                                        <Link to='/#contacts'>Contacts</Link>
                                                    </li>
                                                </ul>
                                            }


                                        </li>
                                        <li className="my-3">
                                            <NavLink to='/agenda'>Agenda</NavLink>
                                        </li>
                                        <li className="my-3">
                                            <NavLink to='/trombinoscope'>Trombinoscope</NavLink>
                                        </li>
                                        <li className="my-3">
                                            <NavLink to='/gestion-du-site'>Gestion du site</NavLink>
                                        </li>

                                        {/**QUE POUR LES ADMINS */
                                            isAdmin
                                            &&
                                            <li className="my-3">
                                                <NavLink to='/gestion-des-benevoles'>Gestion des comptes</NavLink>
                                            </li>
                                        }

                                    </ul>
                                </div>
                            }
                        </section>
                        :
                        /**Nav pour les utilisateurs non connectés */
                        <section>
                            <Bars3Icon className="w-12" onClick={() => setIsNavOpen((prev) => !prev)} />
                            {
                                isNavOpen
                                &&
                                <div className="absolute top-0 left-0 bg-white w-full h-screen flex flex-col items-end p-8">
                                    <XMarkIcon className="w-12" onClick={() => setIsNavOpen(false)} />
                                    <ul className="text-lg p-6 flex flex-col justify-between items-end">
                                        <li className="my-3">
                                            <Link to='/'>Accueil</Link>
                                        </li>
                                        <li className="my-3">
                                            <Link to='/#presentation'>Présentation</Link>
                                        </li>
                                        <li className="my-3">
                                            <Link to='/#axes'>Axes</Link>
                                        </li>
                                        <li className="my-3">
                                            <Link to='/#projects'>Projets</Link>
                                        </li>
                                        <li className="my-3">
                                            <Link to='/#actu'>Actualités</Link>
                                        </li>
                                        <li className="my-3">
                                            <Link to='/#contacts'>Contacts</Link>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </section>
                }
            </nav>
        </>)
};

export default Nav;