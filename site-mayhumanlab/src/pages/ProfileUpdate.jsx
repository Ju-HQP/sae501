import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userAsyncAction";
import { selectImageEdit, selectUserInfos } from "../features/user/userSelector";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { startImageEdit } from "../features/user/userSlice";
import ImageUpdate from "../components/formulaires/ImageUpdate";


function ProfileUpdate() {
    const dispatch = useDispatch();
    const userInfos = useSelector(selectUserInfos);
    const imageEdit = useSelector(selectImageEdit);

    const handleSubmit = async (values, form) => {
        values.role_b = null;
        console.log(values);
        dispatch(updateProfile(values));
    };

    function handleImageUpdate() {
        dispatch(startImageEdit());
    };

    return (
        <>
            <Header />
            <main>
                {imageEdit && <ImageUpdate id={userInfos.id_benevole} />}
                <img src={userInfos.photo_b} onClick={handleImageUpdate} className="w-32 h-32 rounded-full md:w-40 md:h-40 col-start-1 col-end-2 m-auto" />
                <Form
                    initialValues={userInfos}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form
                            onSubmit={handleSubmit}
                            className="my-4 px-2 md:grid grid-cols-2 lg:px-8"
                        >
                            <Field
                                name="prenom_b"
                                render={({ input, meta }) => (
                                    <div className="flex flex-col md:px-4">
                                        <label
                                            htmlFor="prenom_b"
                                            className="mt-3 mb-2 font-semibold"
                                        >
                                            Prénom
                                        </label>
                                        <input
                                            {...input}
                                            placeholder="Michelle"
                                            id="prenom_b"
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
                            <Field
                                name="nom_b"
                                render={({ input, meta }) => (
                                    <div className="flex flex-col col-start-1 md:px-4">
                                        <label
                                            htmlFor="nom_b"
                                            className="mt-3 mb-2 font-semibold"
                                        >
                                            Nom
                                        </label>
                                        <input
                                            {...input}
                                            placeholder="Durand"
                                            id="nom_b"
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
                            <Field

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
                                //validate={combineValidators(required, phoneValidated)}
                                name="tel_b"
                                render={({ input, meta }) => (
                                    <div className="flex flex-col col-start-2 row-start-2 md:px-4">
                                        <label
                                            htmlFor="tel_b"
                                            className="mt-3 mb-2 font-semibold"
                                        >
                                            Téléphone
                                        </label>
                                        <input
                                            {...input}
                                            placeholder="07 01 02 03 04"
                                            id="tel_b"
                                            type="tel"
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
                                validate=""
                                name="nom_c"
                                render={({ input, meta }) => (
                                    <div className="flex flex-col col-start-2 row-start-3 md:px-4">
                                        <label
                                            htmlFor="nom_c"
                                            className="mt-3 mb-2 font-semibold"
                                        >
                                            Compétences
                                        </label>
                                        <input
                                            {...input}
                                            placeholder="soudeur-graphiste-designer"
                                            id="nom_c"
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
                                <NavLink
                                    variant="contained"
                                    className="secondary-btn-large md:mr-4"
                                    to="/profile"
                                >
                                    Annuler
                                </NavLink>
                                <button
                                    type="submit"
                                    variant="contained"
                                    className="primary-btn-large md:ml-4"
                                    onClick={handleSubmit}
                                >
                                    Valider
                                </button>
                            </div>
                        </form>
                    )}
                />
            </main>

        </>
    );
};

export default ProfileUpdate;