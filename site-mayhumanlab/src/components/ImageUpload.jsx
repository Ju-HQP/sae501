import { useRef, useState } from "react";


function ImageUpload({avatarURL, setAvatarURL}) {
    const fileUploadRef = useRef();

    function handleImageUpload(event) {
        event.preventDefault();
        fileUploadRef.current.click();
    }

    async function uploadImageDisplay() {
        const uploadedFile = fileUploadRef.current.files[0]; //on récupère le premier fichier de l'input
        const cachedURL = URL.createObjectURL(uploadedFile);
        console.log(cachedURL);
        setAvatarURL(cachedURL);

        const formData = new FormData();
        formData.append("photo_b", uploadedFile);
        console.log(formData);
    }

    return (
        <div className="relative">
            <img
                src={avatarURL}
                alt="Avatar"
                className="h-32 w-32 rounded-full" />

            <form id="form" encType='multipart/form-data'>
                <button
                    type='submit'
                    className='flex-center absolute bottom-0 left-32 h-9 w-9 rounded-full'
                    onClick={handleImageUpload}>
                    <img
                        src='/edit.png'
                        alt="Edit"
                        className='w-8' />
                </button>
                <input
                    type="file"
                    id="file"
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    hidden />
            </form>
        </div>
    )
}

export default ImageUpload;