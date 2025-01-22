import React, { useRef, useState } from 'react';

const FileInputWithPreview = ({ input, meta }) => {
  var file;
  const [preview, setPreview] = useState("/default-user.png");
  const fileUploadRef = useRef();

  function handleKeyDown(e){
    if(e.key === "Enter" || e.key === ' '){
      handleImageUpload(e);
    }
  }

  function handleImageUpload(event) {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  const handleFileChange = (e) => {
    file = e.target.files[0];
    input.onChange(file); // Met à jour le formulaire localement

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result); // On récupère les données au format base64
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // Réinitialiser l'aperçu si ce n'est pas une image
    }
  };

  return (
    <div  className='flex flex-col justify-center items-center col-span-2 md:mb-4'>
      <label htmlFor={input.name} className='font-semibold mb-4'>Photo de profil</label>
      <img src={preview} alt="Avatar" tabIndex="0"
        className="h-32 w-32 rounded-full object-cover cursor-pointer grayscale focus:filter-none hover:filter-none transition-all" onKeyDown={handleKeyDown} onClick={handleImageUpload}/>

      <input hidden
        id={input.name}
        name="photo_b"
        type="file"
        ref={fileUploadRef}
        accept="image/*"
        onChange={handleFileChange}
      />

      {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
    </div>
  );
};

export default FileInputWithPreview;