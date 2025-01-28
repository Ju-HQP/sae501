import { useDispatch, useSelector } from "react-redux";
import { stopVolunteerEdit } from "../../features/volunteer/volunteerSlice";
import { Field, Form } from "react-final-form";
import { saveVolunteer } from "../../features/volunteer/volunteerAsyncAction";
import { useState } from "react";
import {
    combineValidators,
    phoneValidated,
    required,
} from "../../utils/validators";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import {
    selectErrorSave,
    selectFormTitle,
    selectIdVolunteerModifying,
    selectInitialFormValues,
    selectLoading,
} from "../../features/volunteer/volunteerSelector";
import FileInputWithPreview from "./FileInputWithPreview";

function VolunteerForm() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const initialValues = useSelector(selectInitialFormValues);
    const errorSave = useSelector(selectErrorSave);
    const title = useSelector(selectFormTitle);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const options = [
        { value: 0, label: "Bénévole" },
        { value: 1, label: "Administrateur" },
    ];
    const [selectedValue, setSelectedValue] = useState(initialValues ? options[initialValues.role_b] : '');
    const initialPicture = initialValues ? initialValues.photo_b : null;

    function handleSelect(value) {
        setSelectedValue(value);
    }

    const handleSubmit = async (values, form) => {
        values.role_b = selectedValue.value;
        dispatch(saveVolunteer(values));
        form.reset();
    };

    function handleExit() {
        dispatch(stopVolunteerEdit());
    }

    function handlePassChange() {
        setPassword();
    }

    function handleConfirmPassChange() {
        setConfirmPassword();
    }

    return (
        <>
            <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
                {loading ? (
                    <div className="h-fit bg-white shadow-xl rounded flex flex-col items-center justify-center w-fit p-4">
                        <p className="font-semibold mb-3">
                            Requête en cours de traitement...
                        </p>
                        <img src="/loading.svg" className="w-16" />
                    </div>
                ) : (
                    <dialog
                        open
                        onClose={handleExit}
                        className="w-screen shadow-2xl rounded-lg relative px-4 md:m-12 lg:mx-32"
                    >
                        <span className="flex justify-center flex-col mt-8 lg:mt-12">
                            <h2 className="text-2xl font-bold text-center md:text-4xl mb-4">
                                {title}
                            </h2>
                            {errorSave && (
                                <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                                    {errorSave}
                                </div>
                            )}
                            <Form
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                render={({ handleSubmit }) => (
                                    <form
                                        onSubmit={handleSubmit}
                                        className="my-4 px-2 md:grid grid-cols-2 lg:px-8"
                                        enctype="multipart/form-data"
                                    >
                                        <Field name="photo_b" id="photo_b" component={FileInputWithPreview} picture={initialPicture}/>
                                        <Field
                                            validate={required}
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
                                            validate={required}
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
                                            validate={combineValidators(required, phoneValidated)}
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
                                        <Field
                                            //   validate={required}
                                            name="role_b"
                                            render={({ input, meta }) => (
                                                <div className="flex flex-col col-start-2 md:px-4">
                                                    <label
                                                        htmlFor="role_b"
                                                        className="mt-3 mb-2 font-semibold"
                                                    >
                                                        Rôle
                                                    </label>
                                                    <Select
                                                        {...input}
                                                        value={selectedValue}
                                                        options={options}
                                                        onChange={handleSelect}
                                                    />
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
                )}
            </div>
        </>
    );
}

export default VolunteerForm;
