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
            <nav className="w-full">

                {/**nav pour les écrans grands */}
                <section className="hidden lg:block">
                    {
                        isConnected
                            ?
                            <ul className="text-lg flex justify-between items-center">
                                <li className="flex flex-col items-center relative hover:bg-slate-100 rounded">
                                    <span className="flex justify-between w-28">    
                                        <NavLink className={({isActive})=> isActive ? 'text-pink-600 underline underline-offset-8 py-2 px-4 font-bold' : 'py-2 px-4 font-bold '} to="/" onMouseOver={() => setIsMenuOpen(true)} onMouseOut={() => setIsMenuOpen(false)}>Accueil</NavLink>
                                        <ChevronDownIcon className="w-4" onClick={() => setIsMenuOpen((prev) => !prev)} />
                                    </span>
                                    {
                                        isMenuOpen
                                        &&
                                        <ul onMouseOver={() => setIsMenuOpen(true)} onMouseOut={() => setIsMenuOpen(false)} className=" absolute top-6 flex flex-col justify-between items-end mt-3 px-6 rounded-md bg-slate-100">
                                            <li className="my-3 hover:bg-slate-200 p-2 rounded">
                                                <Link className="p-2" to='/#presentation'>Présentation</Link>
                                            </li>
                                            <li className="my-3 hover:bg-slate-200 p-2 rounded">
                                                <Link className="p-2" to='/#axes'>Axes</Link>
                                            </li>
                                            <li className="my-3 hover:bg-slate-200 p-2 rounded">
                                                <Link className="p-2" to='/#projects'>Projets</Link>
                                            </li>
                                            <li className="my-3 hover:bg-slate-200 p-2 rounded">
                                                <Link className="p-2" to='/#actu'>Actualités</Link>
                                            </li>
                                            <li className="my-3 hover:bg-slate-200 p-2 rounded">
                                                <Link className="p-2" to='/#contacts'>Contacts</Link>
                                            </li>
                                        </ul>
                                    }


                                </li>
                                <li className="my-3">
                                    <NavLink to='/agenda' className={({isActive})=> isActive ? 'text-pink-600 underline underline-offset-8 py-2 px-4 font-bold hover:bg-slate-100 rounded':'py-2 px-4 font-bold hover:bg-slate-100 rounded'}>Agenda</NavLink>
                                </li>
                                <li className="my-3">
                                    <NavLink to='/trombinoscope' className={({isActive})=> isActive ? 'text-pink-600 underline underline-offset-8 py-2 px-4 font-bold hover:bg-slate-100 rounded':'py-2 px-4 font-bold hover:bg-slate-100 rounded'}>Trombinoscope</NavLink>
                                </li>
                                <li className="my-3">
                                    <NavLink to='/gestion-du-site' className={({isActive})=> isActive ? 'text-pink-600 underline underline-offset-8 py-2 px-4 font-bold hover:bg-slate-100 rounded':'py-2 px-4 font-bold hover:bg-slate-100 rounded'}>Gestion du site</NavLink>
                                </li>

                                {/**QUE POUR LES ADMINS */
                                    isAdmin
                                    &&
                                    <li className="my-3">
                                        <NavLink to='/gestion-des-benevoles' className={({isActive})=> isActive ? 'text-pink-600 underline underline-offset-8 py-2 px-4 font-bold hover:bg-slate-100 rounded' : 'py-2 px-4 font-bold hover:bg-slate-100 rounded'}>Gestion des comptes</NavLink>
                                    </li>
                                }

                            </ul>
                            :
                            /**Nav pour les utilisateurs non connectés */
                                <ul className="text-lg flex justify-between items-center">
                                    <li className="my-3 font-bold">
                                        <Link to='/'>Accueil</Link>
                                    </li>
                                    <li className="my-3 font-bold">
                                        <Link to='/#presentation'>Présentation</Link>
                                    </li>
                                    <li className="my-3 font-bold">
                                        <Link to='/#axes'>Axes</Link>
                                    </li>
                                    <li className="my-3 font-bold">
                                        <Link to='/#projects'>Projets</Link>
                                    </li>
                                    <li className="my-3 font-bold">
                                        <Link to='/#actu'>Actualités</Link>
                                    </li>
                                    <li className="my-3 font-bold">
                                        <Link to='/#contacts'>Contacts</Link>
                                    </li>
                                </ul>
                    }

                </section>

                {/**nav mobile */}
                {/*Nav pour les bénévoles et admins*/}
                <section className="lg:hidden flex justify-end">
                    {
                        isConnected
                            ?
                            <>
                                <Bars3Icon className="w-12 " onClick={() => setIsNavOpen((prev) => !prev)} />
                                {
                                    isNavOpen
                                    &&
                                    <div className="absolute top-0 left-0 bg-white w-full h-screen flex flex-col items-end p-8">
                                        <XMarkIcon className="w-12" onClick={() => setIsNavOpen(false)} />
                                        <ul className="text-lg p-6 flex flex-col justify-between items-end">
                                            <li className="flex flex-col items-end mb-3">
                                                <span className="flex justify-between w-20">
                                                    <ChevronDownIcon className="w-4" onClick={() => setIsMenuOpen((prev) => !prev)} />
                                                    <NavLink to='/' onClick={() => setIsMenuOpen((prev) => !prev)} className={({isActive})=> isActive ? 'text-pink-600 underline underline-offset-8 font-bold' :'font-bold'}>Accueil</NavLink>
                                                </span>
                                                {
                                                    isMenuOpen
                                                    &&
                                                    <ul className="flex flex-col justify-between items-end mt-3 px-6 rounded-md bg-slate-100">
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
                                            <li className="my-3 font-bold">
                                                <NavLink to='/agenda' className={({isActive})=> isActive&& 'text-pink-600 underline underline-offset-8 font-bold'}>Agenda</NavLink>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <NavLink to='/trombinoscope' className={({isActive})=> isActive&& 'text-pink-600 underline underline-offset-8 font-bold'}>Trombinoscope</NavLink>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <NavLink to='/gestion-du-site'className={({isActive})=> isActive&& 'text-pink-600 underline underline-offset-8 font-bold'}>Gestion du site</NavLink>
                                            </li>

                                            {/**QUE POUR LES ADMINS */
                                                isAdmin
                                                &&
                                                <li className="my-3 font-bold">
                                                    <NavLink to='/gestion-des-benevoles' className={({isActive})=> isActive&& 'text-pink-600 underline underline-offset-8 font-bold'}>Gestion des comptes</NavLink>
                                                </li>
                                            }

                                        </ul>
                                    </div>
                                }
                            </>
                            :
                            /**Nav pour les utilisateurs non connectés */
                            <>
                                <Bars3Icon className="w-12" onClick={() => setIsNavOpen((prev) => !prev)} />
                                {
                                    isNavOpen
                                    &&
                                    <div className="absolute top-0 left-0 bg-white w-full h-screen flex flex-col items-end p-8">
                                        <XMarkIcon className="w-12" onClick={() => setIsNavOpen(false)} />
                                        <ul className="text-lg p-6 flex flex-col justify-between items-end">
                                            <li className="my-3 font-bold">
                                                <Link to='/' onClick={() => setIsNavOpen(false)}>Accueil</Link>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <Link to='/#presentation' onClick={() => setIsNavOpen(false)}>Présentation</Link>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <Link to='/#axes' onClick={() => setIsNavOpen(false)}>Axes</Link>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <Link to='/#projects' onClick={() => setIsNavOpen(false)}>Projets</Link>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <Link to='/#actu' onClick={() => setIsNavOpen(false)}>Actualités</Link>
                                            </li>
                                            <li className="my-3 font-bold">
                                                <Link to='/#contacts' onClick={() => setIsNavOpen(false)}>Contacts</Link>
                                            </li>
                                        </ul>
                                    </div>
                                }
                            </>

                    }
                </section>
            </nav>
        </>)
};

export default Nav;