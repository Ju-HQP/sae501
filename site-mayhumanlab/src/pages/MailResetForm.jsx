import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL_API_PASSWORD } from "../utils/config";
import { required } from "../utils/validators";
import { Field, Form } from "react-final-form";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { logout } from "../features/user/connexion";

function MailResetForm() {
  const { token } = useParams(); // Récupère le token dans l'URL
  const [isValidToken, setIsValidToken] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = token ? `${URL_API_PASSWORD}/${token}` : URL_API_PASSWORD;
  
  const handleSubmit = async (value) => {
   dispatch(sendMail(value));
  };

  const handleBackHome = async () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <>
      <main className="font-roboto leading-8">
        <div>
          <div className="w-full overflow-hidden">
            <img
              className="w-full h-screen object-cover"
              src="/accueil/banner.jpg"
              alt="bannière"
            />
          </div>
          <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
            <dialog
              open
              className="w-3/4 md:w-1/2 shadow-2xl rounded-lg relative p-4"
            >
              <span className="flex justify-center flex-col mt-8 lg:mt-12">
                <h2 className="text-2xl font-bold text-center md:text-4xl mb-4">
                 Mot de passe oublié ?
                </h2>
                <h3 className="text-2xl font-bold text-center md:text-4xl mb-4">
                 Mot de passe oublié ?
                </h3>

                {isValidToken && (
                  <Form
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Field
                          validate={required}
                          name="new_password"
                          render={({ input, meta }) => (
                            <div className="flex flex-col col-start-1 md:px-4">
                              <label
                                htmlFor="new_password"
                                className="mt-3 mb-2 font-semibold"
                              >
                                Nouveau Mot de passe
                              </label>
                              <input
                                {...input}
                                placeholder="Votre mot de passe"
                                id="new_password"
                                type="password"
                                className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"
                              ></input>
                              {meta.touched && meta.invalid && (
                                <div className="flex px-2">
                                  <ExclamationTriangleIcon className="w-6 text-red-900" />
                                  <p className="text-red-900 text-sm p-2">
                                    {meta.error}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        ></Field>
                        <div className="w-full flex justify-between col-end-3 mt-8 mb-2 md:mx-0 md:justify-end md:my-10 md:px-4">
                          <button
                            type="button"
                            onClick={handleBackHome}
                            className="secondary-btn-large md:mr-4"
                          >
                            Revenir à l'accueil
                          </button>
                          <button
                            type="submit"
                            className="primary-btn-large md:ml-4"
                          >
                            Réinitialiser
                          </button>
                        </div>
                      </form>
                    )}
                  />
                )}
              </span>
            </dialog>
          </div>
        </div>
      </main>
      <Footer contactVisible={false} />
    </>
  );
}

export default MailResetForm;
