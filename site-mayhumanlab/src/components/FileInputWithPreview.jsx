import React, { useState } from 'react';

const FileInputWithPreview = ({ input, meta }) => {
  var file;
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    file = e.target.files[0];
    input.onChange(file); // Met à jour le formulaire localement
  };

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result); // On récupère les données au format base64
    reader.readAsDataURL(file);
  } else {
    setPreview(null); // Réinitialiser l'aperçu si ce n'est pas une image
  }

  return (
    <div>
      <label htmlFor={input.name}>Télécharger un fichier</label>
      <input
        id={input.name}
        name={input.name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
    </div>
  );
};

export default FileInputWithPreview;