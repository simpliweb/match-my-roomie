import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './ProfilePhoto.css';

function ProfilePhoto() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
    navigate('/success');
  };

  const handleSkip = () => {
    navigate('/success');
  };

  return (
    <div className='profilephoto-container'>
      <button className='back-button' onClick={handleGoBack}>
        <i className='fas fa-arrow-left'></i>
        Back
      </button>

      <div className='profilephoto-info-container'>
        <div className='progress-bar'>
          <div className='rectangle' id='all-profilephoto'></div>
          <div className='rectangle' id='all-profilephoto'></div>
          <div className='rectangle' id='all-profilephoto'></div>
          <div className='rectangle' id='all-profilephoto'></div>
        </div>

        <h2 className='gender-h2'>Create Your Profile</h2>
        <h3>Upload a picture of yourself</h3>
        <p>
          The information will be shown on your MatchMyRoomie
          <span>profile to help potential roommates get to know you.</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='image-preview'>
            {uploadedImage && <img src={uploadedImage} alt='Uploaded' />}
          </div>
          <label className='custom-file-upload'>
            <Controller
              name='image'
              control={control}
              defaultValue=''
              rules={{ required: 'Image is required.' }}
              render={({ field }) => (
                <div>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      field.onChange(e);
                      handleImageChange(e);
                    }}
                    placeholder='Upload Photo'
                  />
                  <span>{isDirty ? 'Uploaded' : 'Upload Photo'}</span>
                  {isDirty && errors.image && (
                    <p className='error-message'>{errors.image.message}</p>
                  )}
                </div>
              )}
            />
          </label>
          <div className='button-group'>
            <button
              type='submit'
              className={`upload-button ${isDirty ? 'uploaded' : ''}`}
              disabled={!isDirty}
            >
              {isDirty ? 'Uploaded' : 'Upload'}
              {/* Continue */}
            </button>
            <button type='button' onClick={handleSkip}>
              Not Now
            </button>
          </div>
        </form>
      </div>

      <div className='info-side'>
        <img
          src={require('../../assets/images/results-card-blurry.png')}
          alt='matched user profile with image and details'
        />
      </div>
    </div>
  );
}
export default ProfilePhoto;
