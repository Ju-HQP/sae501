import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { stopEditActu } from '../../features/actualite/actualiteSlice';
import { saveActu } from '../../features/actualite/actualiteAsyncAction';
import { selectErrorSave, selectFormTitle, selectInitialFormValues } from '../../features/actualite/actualiteSelector';
import { required } from '../../utils/validators';
import FileInputWithPreview from './FileInputWithPreview';

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
        dispatch(saveActu(dataToSend));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
            <dialog open className="w-screen shadow-2xl rounded-lg relative p-4 md:mx-12">
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
                            <form onSubmit={handleSubmit} className='md:grid grid-cols-2 md:p-4 lg:px-8 gap-8 gap-y-4'>
                                <Field
                                    validate={required}
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

                                <Field name="image" id="image" component={FileInputWithPreview}/>

                                <Field
                                    validate={required}
                                    name="description_a"
                                    render={({ input, meta }) => (
                                        <div className="flex flex-col row-span-2">
                                            <label htmlFor="description_a" className="mt-3 mb-2 font-semibold">Description</label>
                                            <textarea
                                                {...input}
                                                id="description_a"
                                                rows="5"
                                                placeholder="Brève description"
                                                className="md:h-full border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"
                                            ></textarea>
                                            {meta.touched && meta.error && (
                                                <span className="text-red-500 text-sm">{meta.error}</span>
                                            )}
                                        </div>
                                    )}
                                />

                                <Field
                                    validate={required}
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

                                <div className="flex justify-between mt-8 col-span-2 md:justify-end">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="secondary-btn-large"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="primary-btn-large md:ml-4"
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
