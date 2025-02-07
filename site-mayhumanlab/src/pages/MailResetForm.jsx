import { useNavigate } from "react-router-dom";
import { required } from "../utils/validators";
import { Field, Form } from "react-final-form";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/connexion";
import { selectSendMailMessage } from "../features/user/userSelector";
import { sendMail } from "../features/user/userAsyncAction";

function MailResetForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messageSendMail = useSelector(selectSendMailMessage);

  const handleSubmit = async (value) => {
    dispatch(sendMail(value));
  };

  const handleBackHome = async () => {
    navigate("/");
    dispatch(logout());
  };

  const handleKeyDown = (e) => {
    // À chaque touché pressée, la fontion est executée
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget;
      if (form) {
        form.requestSubmit(); // déclenche onSubmit du formulaire
      }
    }
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
              <span className="flex justify-center flex-col mt-4 lg:mt-8">
                <h2 className="text-2xl font-bold text-center md:text-4xl mb-4">
                  Mot de passe oublié ?
                </h2>
                <h3 className="text-lg text-start md:text-xl mb-2 md:px-16">
                  Entrez le mail lié à votre compte et nous vous enverrons un
                  lien pour réinitialiser votre mot de passe{" "}
                </h3>
                <Form
                  onSubmit={handleSubmit}
                  render={({ handleSubmit }) => (
                    <form onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
                      <Field
                        validate={required}
                        name="mail_retrieve"
                        render={({ input, meta }) => (
                          <div className="flex flex-col col-start-1 md:px-4">
                            <label
                              htmlFor="mail_retrieve"
                              className="mt-3 mb-2 font-semibold"
                            >
                              Email
                            </label>
                            <input
                              {...input}
                              placeholder="michelle.durand@gmail.com"
                              id="mail_retrieve"
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
                      {messageSendMail && (
                        <div className="flex flex-col col-start-1 md:px-4  my-4">
                          <div className="bg-gray-100 text-gray-700 p-3 rounded">
                            {messageSendMail}
                          </div>
                        </div>
                      )}
                      <div className="w-full flex justify-between col-end-3 mt-8 mb-2 md:mx-0 md:justify-end md:my-10 md:px-4">
                        <button
                          type="button"
                          onClick={handleBackHome}
                          className="secondary-btn-large md:mr-4"
                        >
                          Revenir à l'accueil
                        </button>
                        {!messageSendMail && (
                          <button
                            type="submit"
                            className="primary-btn-large md:ml-4"
                          >
                            Envoyer
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                />
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
