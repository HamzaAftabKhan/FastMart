import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa6';
import { toast } from 'react-toastify';

export default function CategoryForm({item, setFetchTrigger}) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateName = name.trim() !== '';
    const validateDescription = description.trim() !== '';
    const validateImage = image !== null;

    setIsNameValid(validateName);
    setIsDescriptionValid(validateDescription);
    setIsImageValid(validateImage);

    // Form is valid if all fields are valid
    setIsFormValid(validateName && validateDescription && validateImage);
  }, [name, description, image]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const createCategory = async () => {
    if (!isFormValid) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) {
        // Convert image URL to file if needed
        formData.append('image', image); // Update as necessary based on your API
      }

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/category/create`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Category creation failed.');
      }
      toast.success('Category created successfully!');
      setFetchTrigger(prev => !prev);
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };

  const handleSubmit = () => {
    createCategory();
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-subHeading dark:text-light-primaryText text-xl mb-4'>Category Form</h2>

      <div className="w-full max-w-md">
        <div className='mb-4'>
          <input 
            type="text"
            className={`placeholder:italic placeholder:text-slate-400 block bg-secondary dark:bg-light-sidebarBackground w-full rounded-md p-3 text-subHeading dark:text-light-primaryText focus:outline-none focus:ring-blue-600 focus:ring-1 sm:text-sm ${!isNameValid ? 'border-red-500' : ''}`}
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Category Name'
          />
          {!isNameValid && <p className='text-light-danger text-sm'>This cannot be empty</p>}
        </div>

        <div className='mb-4'>
          <textarea 
            className={`placeholder:italic placeholder:text-slate-400 block bg-secondary dark:bg-light-sidebarBackground w-full rounded-md py-3 pl-3 text-subHeading dark:text-light-primaryText focus:outline-none focus:ring-blue-600 focus:ring-1 sm:text-sm ${!isDescriptionValid ? 'border-red-500' : ''}`}
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Enter Description'
          />
          {!isDescriptionValid && <p className='text-light-danger text-sm'>This cannot be empty</p>}
        </div>

        <div className='flex flex-col items-center mt-3'>
          <div className='w-40 h-40 rounded-lg bg-secondary dark:bg-light-sidebarBackground flex justify-center items-center relative cursor-pointer mb-4'>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Selected" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <FaImage className='text-subHeading dark:text-light-primaryText' size={40} />
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange} 
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          {!isImageValid && <p className='text-light-danger text-sm'>Please select an image</p>}
        </div>

        <div className='flex justify-evenly mt-3'>
        <button 
            className='bg-secondary dark:bg-light-sidebarBackground text-subHeading dark:text-light-primaryText p-2 cursor-pointer rounded-md w-1/3 mr-2' 
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Save
          </button>
          <button 
            className='bg-light-danger text-subHeading p-2 rounded-md w-1/3 ml-2' 
            onClick={() => {
              setName('');
              setDescription('');
              setImage(null);
              toast.info('Form reset');
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
