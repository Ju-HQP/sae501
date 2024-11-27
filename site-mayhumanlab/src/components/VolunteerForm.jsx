import { useDispatch } from "react-redux";
import { stopVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { Field, Form } from "react-final-form";
import { saveVolunteer } from "../features/volunteer/volunteerAsyncAction";
import { useState } from "react";



function VolunteerForm() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async(values, form) => {
        dispatch(saveVolunteer(values));
        console.log(values);
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
                        <Form
                            onSubmit={handleSubmit}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} >
                                    <Field
                                        validate=''
                                        name="prenom_b"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label htmlFor='prenom_b' className="mt-3 mb-2 font-semibold">Prénom</label>
                                                <input {...input} value={input.value} placeholder="Michelle" id='prenom_b' name="prenom_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="nom_b"
                                        render={({ input, meta }) => (
                                            <div className="flex flex-col">
                                                <label htmlFor='nom_b' className="mt-3 mb-2 font-semibold">Nom</label>
                                                <input {...input} value={input.value} placeholder="Durand" id='nom_b' name="nom_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="mail_b"
                                        render={({ input, meta }) => (
                                            
                                            <div className="flex flex-col">
                                                <label htmlFor='mail_b' className="mt-3 mb-2 font-semibold">Email</label>
                                                <input {...input} value={input.value} placeholder="michelle.durand@gmail.com" id='mail_b' name="mail_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="tel_b"
                                        render={({ input, meta }) => (
                                            
                                            <div className="flex flex-col">
                                                <label htmlFor='tel_b' className="mt-3 mb-2 font-semibold">Téléphone</label>
                                                <input {...input} value={input.value} placeholder="07 01 02 03 04" id='tel_b' name="tel_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="photo_b"
                                        render={({ input, meta }) => (
                                            
                                            <div className="flex flex-col">
                                                <label htmlFor='photo_b' className="mt-3 mb-2 font-semibold">Photo</label>
                                                <input {...input} value={input.value} placeholder="" id='photo_b' name="photo_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                            </div>
                                        )}
                                    >
                                    </Field>
                                    <Field
                                        validate=''
                                        name="role_b"
                                        render={({ input, meta }) => (
                                            
                                            <div className="flex flex-col">
                                                <label htmlFor='role_b' className="mt-3 mb-2 font-semibold">Role</label>
                                                <input {...input} value={input.value} placeholder="Benevole" id='role_b' name="role_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
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