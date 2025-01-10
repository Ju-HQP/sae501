import { useRef, useState } from "react";

function ImageUpload({ avatarURL, setAvatarURL }) {
//function ImageUpload({ input, meta }) {
    const fileUploadRef = useRef();
    const [preview, setPreview] = useState(null);

    function handleImageUpload(event) {
         event.preventDefault();
         fileUploadRef.current.click();
     }

     async function uploadImageDisplay() {
         const uploadedFile = fileUploadRef.current.files[0]; //on récupère le premier fichier de l'input
         const cachedURL = window.URL.createObjectURL(uploadedFile);
         console.log(cachedURL);
         setAvatarURL(cachedURL);

         const formData = new FormData();
         formData.append("photo_b", uploadedFile);
         console.log(formData);
     }

    /* const handleFileChange = (e) => {
        const file = e.target.files[0];
        input.onChange(file); // Met à jour le formulaire localement

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result); // On récupère les données au format base64
            reader.readAsDataURL(file);
        } else {
            setPreview(null); // Réinitialiser l'aperçu si ce n'est pas une image
        }
    }; */

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

        //  <div>
        //     <label htmlFor={input.name}>Télécharger un fichier</label>
        //     <input
        //         id={input.name}
        //         name={input.name}
        //         type="file"
        //         accept="image/*"
        //         onChange={handleFileChange}
        //     />
        //     {preview && (
        //         <div>
        //             <img src={preview} alt="Aperçu" />
        //         </div>
        //     )}
        //     {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
        // </div>
    )
}

export default ImageUpload;