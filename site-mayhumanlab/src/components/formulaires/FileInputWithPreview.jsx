import React, { useRef, useState } from 'react';

const FileInputWithPreview = ({ input, meta, picture }) => {
  var file;
  const [avatarPreview, setAvatarPreview] = useState(picture ?? "/default-user.png");
  const [imagePreview, setImagePreview] = useState(picture);
  const fileUploadRef = useRef();

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ' ') {
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
      if (input.name === 'photo_b') {
        reader.onload = () => setAvatarPreview(reader.result); // On récupère les données au format base64
      } else {
        reader.onload = () => setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);

    } else {
      setAvatarPreview(null); // Réinitialiser l'aperçu si ce n'est pas une image
    }
  };

  return (
    <>
      {
        input.name === 'photo_b'
          ?
          <div className='flex flex-col justify-center items-center col-span-2 md:mb-4'>

            {
              !picture
              &&
              <>
                <label htmlFor={input.name} className='font-semibold mb-4'>Photo de profil</label>
                <img src={avatarPreview} alt="Avatar" tabIndex="0"
                  className="h-32 w-32 rounded-full object-cover cursor-pointer grayscale focus:filter-none hover:filter-none transition-all" onKeyDown={handleKeyDown} onClick={handleImageUpload} />
              </>
            }
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
          :
          input.name === 'image'
            ?
            (
              !picture
              &&
              <div className='flex flex-col justify-end mt-3 col-start-2 row-start-1 row-span-2'>

                <>
                  <label htmlFor={input.name} className='font-semibold mb-4'>Image de couverture</label>
                  <div className='h-40 w-full md:h-56 border-2 border-dashed flex justify-center items-center'>
                    {imagePreview
                      ?
                      <img src={imagePreview} alt="image de couverture par défaut" tabIndex="0"
                        className="h-40 w-full md:h-56 object-cover cursor-pointer grayscale focus:filter-none hover:filter-none transition-all" onKeyDown={handleKeyDown} onClick={handleImageUpload} />
                      :
                      <button className='primary-btn-small' type='submit' onKeyDown={handleKeyDown} onClick={handleImageUpload}>Sélectionner une image</button>
                    }
                    <input hidden
                      id={input.name}
                      name={input.name}
                      type="file"
                      ref={fileUploadRef}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
                {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>}
              </div>
            )
            :
            <div className='flex flex-col'>
              <label htmlFor={input.name} className='font-semibold mb-4'>Photo de Profil</label>
              <div className='h-40 w-full md:h-56 border-2 border-dashed flex justify-center items-center'>
                {imagePreview
                  ?
                  <img src={imagePreview} alt="image de couverture par défaut" tabIndex="0"
                    className="h-40 w-40 rounded-full object-cover cursor-pointer grayscale focus:filter-none hover:filter-none transition-all" onKeyDown={handleKeyDown} onClick={handleImageUpload} />
                  :
                  <button className='primary-btn-small' type='submit' onKeyDown={handleKeyDown} onClick={handleImageUpload}>Sélectionner une image</button>
                }
                <input hidden
                  id={input.name}
                  name={input.name}
                  type="file"
                  ref={fileUploadRef}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {meta.touched && meta.error && <span style={{ color: 'red' }}>{meta.error}</span>
              }
            </div>

      }
    </>
  );
};

export default FileInputWithPreview;