import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { stopEditActu } from '../features/actualite/actualiteSlice';
import { saveActu } from '../features/actualite/actualiteAsyncAction';
import { selectErrorSave, selectFormTitle, selectInitialFormValues } from '../features/actualite/actualiteSelector';

const ActualiteForm = () => {

    const initialValues = useSelector(selectInitialFormValues);
    const title = useSelector(selectFormTitle);
    const errorSave = useSelector(selectErrorSave);

    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(stopEditActu());
    };

    const handleSubmit = async (values, form) => {
        const dataToSend = { ...values };
        console.log(values);
        dispatch(saveActu(dataToSend));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
            <dialog open className="w-screen shadow-2xl rounded-lg relative p-4">
                <div className="flex flex-col justify-center mt-8 lg:mt-10">
                    <h2 className="text-2xl font-bold text-center md:text-4xl mb-4">{title}</h2>

                    {errorSave && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {errorSave}
                        </div>
                    )}

                    <Form
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <Field
                                    name="titre_a"
                                    render={({ input, meta }) => (
                                        <div className="flex flex-col">
                                            <label htmlFor="titre_a" className="mt-3 mb-2 font-semibold">Titre</label>
                                            <input
                                                {...input}
                                                id="titre_a"
                                                type="text"
                                                placeholder="Titre de l'actualité"
                                                className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"
                                            />
                                            {meta.touched && meta.error && (
                                                <span className="text-red-500 text-sm">{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="image_a"
                                    render={({ input, meta }) => (
                                        <div className="flex flex-col">
                                            <label htmlFor="image_a" className="mt-3 mb-2 font-semibold">Image</label>
                                            <input
                                                {...input}
                                                id="image_a"
                                                type="text"
                                                placeholder="Image d'illustration de l'actualité"
                                                className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"
                                            />
                                            {meta.touched && meta.error && (
                                                <span className="text-red-500 text-sm">{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="description_a"
                                    render={({ input, meta }) => (
                                        <div className="flex flex-col">
                                            <label htmlFor="description_a" className="mt-3 mb-2 font-semibold">Description</label>
                                            <textarea
                                                {...input}
                                                id="description_a"
                                                rows="5"
                                                placeholder="Brève description"
                                                className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"
                                            ></textarea>
                                            {meta.touched && meta.error && (
                                                <span className="text-red-500 text-sm">{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />

                                <Field
                                    name="date_a"
                                    render={({ input, meta }) => (
                                        <div className="flex flex-col">
                                            <label htmlFor="date_a" className="mt-3 mb-2 font-semibold">Date</label>
                                            <input
                                                {...input}
                                                id="date_a"
                                                type="date"
                                                className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"
                                            />
                                            {meta.touched && meta.error && (
                                                <span className="text-red-500 text-sm">{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />

                                <div className="flex justify-between mt-8">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="font-bold text-xl border-2 border-black hover:border-pink-600 hover:text-pink-600 rounded-lg px-5 py-3 text-center"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white font-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center"
                                    >
                                        Soumettre
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </dialog>
        </div>
    );
};

export default ActualiteForm;
