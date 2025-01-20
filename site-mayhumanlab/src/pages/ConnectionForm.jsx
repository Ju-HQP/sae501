import { useDispatch, useSelector } from "react-redux";
import { stopConnecting } from "../features/user/userSlice";
import { Field, Form } from "react-final-form";
import { required } from "../utils/validators";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { login } from "../features/user/connexion.js";
import { selectErrorLogin } from "../features/user/userSelector.js";

function ConnectionForm() {
  const dispatch = useDispatch();
  const errorLogin = useSelector(selectErrorLogin);

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
          className="w-full md:w-7/12 shadow-2xl rounded-lg relative px-4 mx-2"
        >
          <span className="flex justify-center flex-col mt-8 lg:mt-12">
            <h2 className="text-2xl font-bold text-center md:text-4xl mb-4">
              Connexion
            </h2>
            {errorLogin && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {errorLogin}
              </div>
            )}
            <Form
              onSubmit={handleSubmit}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}
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
                      onClick={handleExit}
                      variant="contained"
                      className="secondary-btn-large md:mr-4"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      variant="contained"
                      className="primary-btn-large md:ml-4"
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
