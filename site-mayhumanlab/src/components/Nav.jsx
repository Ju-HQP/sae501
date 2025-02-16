import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import {
  selectIsAdmin,
  selectUserInfos,
  selectUserIsConnected,
  selectUserIsConnecting,
} from "../features/user/userSelector";
import ConnectionForm from "../pages/ConnectionForm";
import { startConnecting } from "../features/user/userSlice";
import { logout } from "../features/user/connexion";
import { HashLink } from "react-router-hash-link";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfos = useSelector(selectUserInfos);
  const [redirectToAgenda, setRedirectToAgenda] = useState(false);

  // pour l'état de connexion (utilisateur connecté ou non)
  const isConnected = useSelector(selectUserIsConnected);

  // pour le Formulaire de connexion
  const isConnecting = useSelector(selectUserIsConnecting);

  const isAdmin = useSelector(selectIsAdmin);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleConnecting() {
    dispatch(startConnecting()); //isModifying passe à true
    setRedirectToAgenda(true);
  }

  const handleDisconnecting = async () => {
    navigate("/");
    dispatch(logout());
  };

  useEffect(() => {
    // Connexion possible que depuis l'accueil
    if (isConnected && redirectToAgenda) {
      setRedirectToAgenda(false);
      navigate("/agenda");  
    } else if (!isConnected && !(location.pathname=="/mentions-legales")) {
      navigate("/");
    }
  }, [redirectToAgenda, setRedirectToAgenda, isConnected, navigate]);

  return (
    <>
      <nav className="w-full">
        {isConnecting && <ConnectionForm />}
        {/**nav pour les écrans grands */}
        <section className="hidden lg:block">
          {isConnected ? (
            <ul className="text-base flex justify-between items-center">
              <li>
                <NavLink
                  to="/">
                  <img src="/logo.jpg" alt="logo May'humanLab" className="h-14"/>
                </NavLink>
              </li>
              <li className="flex flex-col items-center relative hover:bg-slate-100 rounded">
                <span className="flex justify-between w-28">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-amber-600 underline underline-offset-8 py-2 px-4 "
                        : "py-2 px-4  "
                    }
                    to="/"
                    onMouseOver={() => setIsMenuOpen(true)}
                    onMouseOut={() => setIsMenuOpen(false)}
                  >
                    Accueil
                  </NavLink>
                  <ChevronDownIcon
                    className="w-4"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                  />
                </span>
                {isMenuOpen && (
                  <ul
                    onMouseOver={() => setIsMenuOpen(true)}
                    onMouseOut={() => setIsMenuOpen(false)}
                    className=" absolute top-6 flex flex-col justify-between items-end mt-3 px-2 rounded-md bg-slate-100"
                  >
                    <li className="my-3 hover:bg-slate-200 p-2 rounded w-full">
                      <HashLink className="p-2" to="/#presentation">
                        Présentation
                      </HashLink>
                    </li>
                    <li className="my-3 hover:bg-slate-200 p-2 rounded w-full">
                      <HashLink className="p-2" to="/#axes">
                        Axes
                      </HashLink>
                    </li>
                    <li className="my-3 hover:bg-slate-200 p-2 rounded w-full">
                      <HashLink className="p-2" to="/#actu">
                        Actualités
                      </HashLink>
                    </li>
                    <li className="my-3 hover:bg-slate-200 p-2 rounded w-full">
                      <HashLink className="p-2" to="/#projets">
                        Projets
                      </HashLink>
                    </li>
                  </ul>
                )}
              </li>
              <li className="my-3">
                <NavLink
                  to="/agenda"
                  className={({ isActive }) =>
                    isActive
                      ? "text-amber-600 underline underline-offset-8 py-2 px-4  hover:bg-slate-100 rounded"
                      : "py-2 px-4  hover:bg-slate-100 rounded"
                  }
                >
                  Agenda
                </NavLink>
              </li>
              <li className="my-3">
                <NavLink
                  to="/trombinoscope"
                  className={({ isActive }) =>
                    isActive
                      ? "text-amber-600 underline underline-offset-8 py-2 px-4  hover:bg-slate-100 rounded"
                      : "py-2 px-4  hover:bg-slate-100 rounded"
                  }
                >
                  Trombinoscope
                </NavLink>
              </li>
              <li className="my-3 text-center">
                <NavLink
                  to="/gestion-du-site"
                  className={({ isActive }) =>
                    isActive
                      ? "text-amber-600 underline underline-offset-8 mx-2 py-2 px-4  hover:bg-slate-100 rounded"
                      : "py-2 px-4 hover:bg-slate-100 rounded"
                  }
                >
                  Gestion du site
                </NavLink>
              </li>

              {
                /**QUE POUR LES ADMINS */
                isAdmin && (
                  <li className="my-3 text-center">
                    <NavLink
                      to="/gestion-des-benevoles"
                      className={({ isActive }) =>
                        isActive
                          ? "text-amber-600 underline underline-offset-8 mx-2 py-2 px-4  hover:bg-slate-100 rounded"
                          : "py-2 px-4 hover:bg-slate-100 rounded"
                      }
                    >
                      Gestion des comptes
                    </NavLink>
                  </li>
                )
              }
              <li>
                <NavLink to="/profile"><img className="w-12 h-12 rounded-full" src={userInfos.photo_b} /></NavLink>
              </li>
            </ul>
          ) : (
            /**Nav pour les utilisateurs non connectés */
            <ul className="text-base flex justify-between items-center">
              <li>
                <img src="/logo.jpg" alt="logo May'humanLab" className="h-14"/>
              </li>
              <li className="my-3">
                <HashLink to="/#top">Accueil</HashLink>
              </li>
              <li className="my-3">
                <HashLink to="/#presentation">Présentation</HashLink>
              </li>
              <li className="my-3">
                <HashLink to="/#axes">Axes</HashLink>
              </li>
              <li className="my-3">
                <HashLink to="/#actu">Actualités</HashLink>
              </li>
              <li className="my-3">
                <HashLink to="/#projets">Projets</HashLink>
              </li>
              <li className="my-3">
                <button
                  onClick={handleConnecting}
                  className=" primary-btn-small"
                >
                  Connexion
                </button>
              </li>
            </ul>
          )}
        </section>

        {/**nav mobile */}
        {/*Nav pour les bénévoles et admins*/}
        <section className="lg:hidden flex justify-end">
          {isConnected ? (
            <>
              <Bars3Icon
                className="w-12"
                onClick={() => setIsNavOpen((prev) => !prev)}
              />
              {isNavOpen && (
                <div className="absolute top-0 left-0 bg-white w-full h-screen flex flex-col items-end p-8">
                  <XMarkIcon
                    className="w-12"
                    onClick={() => setIsNavOpen(false)}
                  />
                  <ul className="text-base p-6 flex flex-col justify-between items-end">
                    <li className="flex flex-col items-end mb-3">
                      <span className="flex justify-between w-20">
                        <ChevronDownIcon
                          className="w-4"
                          onClick={() => setIsMenuOpen((prev) => !prev)}
                        />
                        <NavLink
                          to="/"
                          onClick={() => setIsMenuOpen((prev) => !prev)}
                          className={({ isActive }) =>
                            isActive
                              ? "text-amber-600 underline underline-offset-8 "
                              : ""
                          }
                        >
                          Accueil
                        </NavLink>
                      </span>
                      {isMenuOpen && (
                        <ul className="flex flex-col justify-between items-end mt-3 px-6 rounded-md bg-slate-100">
                          <li className="my-3">
                            <HashLink to="/#presentation">
                              Présentation
                            </HashLink>
                          </li>
                          <li className="my-3">
                            <HashLink to="/#axes">Axes</HashLink>
                          </li>
                          <li className="my-3">
                            <HashLink to="/#projets">Projets</HashLink>
                          </li>
                          <li className="my-3">
                            <HashLink to="/#actu">Actualités</HashLink>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="/agenda"
                        className={({ isActive }) =>
                          isActive &&
                          "text-amber-600 underline underline-offset-8 "
                        }
                      >
                        Agenda
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="/trombinoscope"
                        className={({ isActive }) =>
                          isActive &&
                          "text-amber-600 underline underline-offset-8 "
                        }
                      >
                        Trombinoscope
                      </NavLink>
                    </li>
                    <li className="my-3">
                      <NavLink
                        to="/gestion-du-site"
                        className={({ isActive }) =>
                          isActive &&
                          "text-amber-600 underline underline-offset-8 "
                        }
                      >
                        Gestion du site
                      </NavLink>
                    </li>

                    {
                      /**QUE POUR LES ADMINS */
                      isAdmin && (
                        <li className="my-3">
                          <NavLink
                            to="/gestion-des-benevoles"
                            className={({ isActive }) =>
                              isActive &&
                              "text-amber-600 underline underline-offset-8 "
                            }
                          >
                            Gestion des comptes
                          </NavLink>
                        </li>
                      )
                    }

                    <li className="my-3">
                      <NavLink to="/profile" className={({ isActive }) =>
                              isActive &&
                              "text-amber-600 underline underline-offset-8 "
                            }
                          >
                            Mon compte </NavLink>
                    </li>

                    <li className="mt-10">
                      <button
                        onClick={handleDisconnecting}
                        className="secondary-btn-small"
                      >
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            /**Nav pour les utilisateurs non connectés */
            <>
              <Bars3Icon
                className="w-12"
                onClick={() => setIsNavOpen((prev) => !prev)}
              />
              {isNavOpen && (
                <div className="absolute top-0 left-0 bg-white w-full h-screen flex flex-col items-end p-8">
                  <XMarkIcon
                    className="w-12"
                    onClick={() => setIsNavOpen(false)}
                  />
                  <ul className="text-base p-6 flex flex-col justify-between items-end">
                    <li className="my-3">
                      <HashLink to="/#top" onClick={() => setIsNavOpen(false)}>
                        Accueil
                      </HashLink>
                    </li>
                    <li className="my-3">
                      <HashLink
                        to="/#presentation"
                        onClick={() => setIsNavOpen(false)}
                      >
                        Présentation
                      </HashLink>
                    </li>
                    <li className="my-3">
                      <HashLink to="/#axes" onClick={() => setIsNavOpen(false)}>
                        Axes
                      </HashLink>
                    </li>
                    <li className="my-3">
                      <HashLink
                        to="/#projets"
                        onClick={() => setIsNavOpen(false)}
                      >
                        Projets
                      </HashLink>
                    </li>
                    <li className="my-3">
                      <HashLink to="/#actu" onClick={() => setIsNavOpen(false)}>
                        Actualités
                      </HashLink>
                    </li>
                    <li className="my-3">
                      <button
                        onClick={handleConnecting}
                        className="primary-btn-small"
                      >
                        Connexion
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      </nav>
    </>
  );
}

export default Nav;
