import { Field, Form } from "react-final-form"
import { useDispatch, useSelector } from "react-redux";
import { updatePicture } from "../../features/user/userAsyncAction";
import { stopImageEdit, stopRedirect } from "../../features/user/userSlice";
import FileInputWithPreview from "./FileInputWithPreview";
import { selectErrorImageUpdate, selectLoading, selectRedirectToProfile } from "../../features/user/userSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingModale from "../LoadingModale";

const ImageUpdate = ({ id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirect = useSelector(selectRedirectToProfile);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectErrorImageUpdate);

    const handleSubmit = async (image, form) => {
        const formData = new FormData();
        formData.append('new_image', image.new_image);
        formData.append('id', id);
        dispatch(updatePicture(formData));
    };

    function handleExit() {
        dispatch(stopImageEdit());
    }
    console.log(loading);

    useEffect(() => {
        if (redirect) {
            navigate("/profile");
            dispatch(stopRedirect());
        }
    }, [selectRedirectToProfile, redirect, dispatch]);

    return (
        <>{
            loading && <LoadingModale />
        }

            <div className="bg-[rgba(0,0,0,0.5)] p-4 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full flex">

                <dialog open className="w-2xl shadow-2xl rounded-lg relative p-4 md:mx-12">
                    <Form
                        onSubmit={handleSubmit}
                        render={({ handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className=' md:p-4 lg:px-8 gap-8 gap-y-4'
                                encType="multipart/form-data"
                            >
                                {error && (
                                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                                        {error}
                                    </div>
                                )}
                                <Field name="new_image" id="new_image" component={FileInputWithPreview} />
                                <div className="flex justify-between m-8 col-end-3 md:justify-end md:mx-0 md:px-4">
                                    <button
                                        onClick={handleExit}
                                        variant="contained"
                                        className="secondary-btn-small md:mr-4"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        variant="contained"
                                        className="primary-btn-small md:ml-4"
                                    >
                                        Valider
                                    </button>
                                </div>

                            </form>
                        )} />

                </dialog>
            </div>
        </>
    )

}

export default ImageUpdate;