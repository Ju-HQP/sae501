import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import { selectConnected } from "../features/volunteer/volunteerSelector";
import Header from "../components/Header";


function ConnectionForm(){
    const dispatch = useDispatch();
    const isConnected = useSelector(selectConnected);

    const handleSubmit = async(values, form) => {
        
    }

    function handleExit() {
        
    }

    return(
        <>
        <Header />
        <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">
            <span className="flex justify-center flex-col w-2/5">
                <h1 className='text-center my-6 font-bold text-2xl'>Connexion</h1>
                <Form
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} >
                            <Field
                                validate=''
                                name="mail_b"
                                render={({ input, meta }) => (
                                                
                                    <div className="flex flex-col">
                                        <label htmlFor='mail_b' className="mt-3 mb-2 font-semibold">Email</label>
                                        <input {...input} value={input.value} placeholder="exemple.mail@gmail.com" id='mail_b' name="mail_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                    </div>
                                )}
                            >
                            </Field>
                            <Field
                                validate=''
                                name="mdp_b"
                                render={({ input, meta }) => (
                                    <div className="flex flex-col">
                                        <label htmlFor='mdp_b' className="mt-3 mb-2 font-semibold">Mot de passe</label>
                                        <input {...input} value={input.value} placeholder="Mot de passe" id='mdp_b' name="mdp_b" type='text' className="border shadow-inner border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:shadow-none"></input>
                                    </div>
                                )}
                            >
                            </Field>
                            <div className="flex flex-col justify-center my-2 md:mx-8 lg:mx-16">
                                <a href="/" className='px-5 py-3 text-center text-base hover:text-pink-600'>Mot de passe oublié</a>
                                <button type="submit" variant="contained" className='text-white font-bold text-xl bg-black hover:bg-pink-600 rounded-lg px-5 py-3 text-center'>Connexion</button>
                            </div>
                        </form>
                    )} />
            </span>
        </div>
        </>
    )
};

export default ConnectionForm;