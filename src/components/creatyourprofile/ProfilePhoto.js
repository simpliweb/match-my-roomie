import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './ProfilePhoto.css';

function ProfilePhoto({ formMethods }) {

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='container'>
      {/* <div className='inner-container'>        */}
        <div className='profilephoto-info-container'>
          <div className='create-progress-bar'>
            <div className='rectangle' id='all-profilephoto'></div>
            <div className='rectangle' id='all-profilephoto'></div>
            <div className='rectangle' id='all-profilephoto'></div>
            <div className='rectangle' id='all-profilephoto'></div>
          </div>

          <h2 className='inner-h2'>Create Your Profile</h2>
          <h3 className='inner-h3'>Upload a picture of yourself</h3>
          <p className='inner-p'>
            The information will be shown on your MatchMyRoomie
            <span>profile to help potential roommates get to know you.</span>
          </p>
          <div className='profilephoto-form'>
            <div className='image-preview'>
              {uploadedImage && <img src={uploadedImage} alt='Uploaded' />}
            </div>
            <label className='custom-file-upload'>
              <Controller
                name='photo'
                control={formMethods.control}
                defaultValue=''
                rules={{ required: 'Image is required.' }}
                render={({ field }) => (
                  <div className='upload-photo-button'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => {
                        field.onChange(e);
                        handleImageChange(e);
                      }}
                      placeholder='Upload Photo'
                    />
                    <span>{formMethods.isValid ? 'Upload' : 'Upload Photo'}</span>
                    {formMethods.isValid && formMethods.formState.errors.image && (
                      <p className='error-message'>
                        {formMethods.formState.errors.image.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </label>   
          </div>
        </div>
      {/* </div> */}

      <div className='info-side'>
        <img
          src={require('../../assets/images/results-card.png')}
          alt='matched user profile with profile and details'
        />
      </div>
    </div>
  );
}
export default ProfilePhoto;
