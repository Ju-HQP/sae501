import React, { useRef, useState } from 'react';

const PictureFileInput = ({ input, meta }) => {
  var file;
  const [actuPreview, setActuPreview] = useState("/default-picture.png");
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
      reader.onload = () => setActuPreview(reader.result); // On récupère les données au format base64
      reader.readAsDataURL(file);
    } else {
      setActuPreview(null); // Réinitialiser l'aperçu si ce n'est pas une image
    }
  };

  return (
    <div  className='flex flex-col justify-center items-center col-span-2 md:mb-4'>
      <label htmlFor={input.name} className='font-semibold mb-4'>Image de couverture</label>
      <img src={actuPreview} alt="image de couverture par défaut" tabIndex="0"
        className="h-32 w-32 rounded-full object-cover cursor-pointer grayscale focus:filter-none hover:filter-none transition-all" onKeyDown={handleKeyDown} onClick={handleImageUpload}/>
      <input hidden
        id={input.name}
        name={input.name}
        type="file"
        ref={fileUploadRef}
        accept="image/*"
        onChange={handleFileChange}
      />

      {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
    </div>
  );
};

export default PictureFileInput;