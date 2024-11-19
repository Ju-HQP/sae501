import { useDispatch } from "react-redux";
import { stopVolunteerEdit } from "../features/volunteer/volunteerSlice";
import { Field, Form } from "react-final-form";


function VolunteerForm() {
    const dispatch = useDispatch();

    function handleSubmit() {

    }

    function handleExit() {
        dispatch(stopVolunteerEdit());
    }

    return (
        <>
            <dialog open onClose={handleExit}>
                <Form onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} >
                            <Field
                                validate=''
                                name="title"
                                render={({ input, meta }) => (
                                    <div>
                                        <label for='name'>Prenom</label>
                                        <input id='name' name="name" type='text'></input>
                                    </div>
                                )}
                            >
                            </Field>
                            <Field
                                validate=''
                                name="title"
                                render={({ input, meta }) => (
                                    <div>
                                        <label for='lastname'>Nom</label>
                                        <input id='lastname' name="lastname" type='text'></input>
                                    </div>
                                )}
                            >
                            </Field>

                        </form>
                    )} />

            </dialog>
        </>
    )
}

export default VolunteerForm;