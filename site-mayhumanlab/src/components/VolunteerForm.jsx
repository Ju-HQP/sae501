import { useDispatch } from "react-redux";
import { stopVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { Field, Form } from "react-final-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { saveVolunteer } from "../features/volunteer/volunteerAsyncAction";
import { useState } from "react";



function VolunteerForm() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async(values, form) => {
        dispatch(saveVolunteer(values))
        console.log('ok')
    }

    function handleExit() {
        dispatch(stopVolunteerEdit());
    }

    function handlePassChange(){
        setPassword()
    }

    function handleConfirmPassChange(){
        setConfirmPassword()
    }

    return (
        <>
            <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
                <dialog open onClose={handleExit} className="w-screen shadow-2xl rounded-lg relative p-4">
                    <span className="flex justify-center flex-col">
                        <h2 className="text-2xl font-bold text-center">Créer un compte</h2>
                        <Form onSubmit={handleSubmit}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} >
                                    <Field
                                        validate=''
                                        name="name"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label for='name' className="mt-3 mb-2 font-semibold">Prénom</label>
                                                <input placeholder="Michelle" id='name' name="name" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="lastname"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label for='lastname' className="mt-3 mb-2 font-semibold">Nom</label>
                                                <input placeholder="Durand" id='lastname' name="lastname" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="email"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label for='email' className="mt-3 mb-2 font-semibold">Email</label>
                                                <input placeholder="michelle.durand@gmail.com" id='email' name="email" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="password"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label onChange={handlePassChange} for='password' className="mt-3 mb-2 font-semibold">Mot de passe</label>
                                                <input placeholder="••••••••" id='password' name="password" type='password' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="password-confirm"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label onChange={handleConfirmPassChange} for='password-confirm' className="mt-3 mb-2 font-semibold">Confirmer le mot de passe</label>
                                                <input placeholder="••••••••" id='password-confirm' name="password-confirm" type='password' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <div className="flex justify-between m-8">
                                        <button onClick={handleExit} variant="contained" className='font-bold text-xl border-2 border-black hover:border-pink-600 hover:text-pink-600 rounded-lg px-5 py-3 text-center'>Annuler</button>
                                        <button type="submit" variant="contained" className='text-white font-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center'>Valider</button>
                                    </div>
                                </form>
                            )} />
                    </span>

                </dialog>
            </div>
        </>
    )
}

export default VolunteerForm;