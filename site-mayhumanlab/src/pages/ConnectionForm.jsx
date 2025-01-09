import { useDispatch } from "react-redux";
import { stopConnecting } from "../features/volunteer/volunteerSlice";
import { Field, Form } from "react-final-form";
import {
  required,
} from "../utils/validators";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { login } from "../features/connexion.js";

function ConnectionForm() {
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(stopConnecting());
  };

  const handleSubmit = async (values, form) => {
    dispatch(login(values));
  };

  return (
    <>
      <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
        <dialog
          open
          onClose={handleExit}
          className="w-screen shadow-2xl rounded-lg relative px-4 md:m-12 lg:mx-32"
        >
          <span className="flex justify-center flex-col mt-8 lg:mt-12">
            <h2 className="text-2xl font-bold text-center md:text-4xl">
              Connexion
            </h2>
            <Form
              onSubmit={handleSubmit}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
                  className="my-4 px-2 md:grid grid-cols-2 lg:px-8"
                >
                  <Field
                    validate={required}
                    name="mail_b"
                    render={({ input, meta }) => (
                      <div className="flex flex-col col-start-1 md:px-4">
                        <label
                          htmlFor="mail_b"
                          className="mt-3 mb-2 font-semibold"
                        >
                          Email
                        </label>
                        <input
                          {...input}
                          placeholder="michelle.durand@gmail.com"
                          id="mail_b"
                          type="email"
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
                  <Field
                    validate={required}
                    name="mdp_b"
                    render={({ input, meta }) => (
                      <div className="flex flex-col col-start-1 md:px-4">
                        <label
                          htmlFor="mdp_b"
                          className="mt-3 mb-2 font-semibold"
                        >
                          Mot de passe
                        </label>
                        <input
                          {...input}
                          placeholder="Votre mot de passe"
                          id="mdp_b"
                          type="text"
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
                  <div className="flex justify-between m-8 col-end-3 md:justify-end md:mx-0 md:px-4">
                    <button
                      onClick={handleExit}
                      variant="contained"
                      className="font-bold text-xl border-2 border-black hover:border-pink-600 hover:text-pink-600 rounded-lg px-5 py-3 text-center md:mr-4"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      variant="contained"
                      className="text-white font-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center md:ml-4"
                    >
                      Valider
                    </button>
                  </div>
                </form>
              )}
            />
          </span>
        </dialog>
      </div>
    </>
  );
}

export default ConnectionForm;
