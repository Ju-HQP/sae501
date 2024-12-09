import React from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { stopEdit } from '../features/actuality/actualitySlice';
import { saveActu } from '../features/actuality/actualityAsyncAction';
import { selectErrorSave, selectFormTitle, selectInitialFormValues } from '../features/actuality/actualitySelector';

const ActualityForm = () => {

    const initialValues = useSelector(selectInitialFormValues);
    const title = useSelector(selectFormTitle);
    const errorSave = useSelector(selectErrorSave);

    const dispatch = useDispatch();
    const handleClose = () => {
      dispatch(stopEdit());
    };

    const handleSubmit = async (values, form) => {
        const dataToSend = { ...values };
        dispatch(saveActu(dataToSend));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
                <div className="relative border-b p-4">
                    <h2 className="text-xl font-bold text-center">{title}</h2>
                    <button
                        onClick={handleClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4">
                    {errorSave && (
                        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                            {errorSave}
                        </div>
                    )}

                    <Form
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Field
                                        name="title"
                                        render={({ input, meta }) => (
                                            <div>
                                                <label className="block font-medium text-gray-700">Titre</label>
                                                <input
                                                    {...input}
                                                    type="text"
                                                    className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                                />
                                                {meta.touched && meta.error && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="overview"
                                        render={({ input, meta }) => (
                                            <div>
                                                <label className="block font-medium text-gray-700">Synopsis</label>
                                                <textarea
                                                    {...input}
                                                    rows="5"
                                                    className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                                ></textarea>
                                                {meta.touched && meta.error && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                <div>
                                    <Field
                                        name="releaseDate"
                                        render={({ input, meta }) => (
                                            <div>
                                                <label className="block font-medium text-gray-700">Date</label>
                                                <input
                                                    {...input}
                                                    type="date"
                                                    className="mt-1 block w-full border border-gray-300 rounded shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                                                />
                                                {meta.touched && meta.error && (
                                                    <span className="text-red-500 text-sm">{meta.error}</span>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        Soumettre
                                    </button>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActualityForm;
