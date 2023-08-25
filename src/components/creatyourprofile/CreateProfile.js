import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Display from './Display';
import Gender from './Gender';
import Biography from './Biography';
import ProfilePhoto from './ProfilePhoto';
import './CreateProfile.css';

function CreateProfile() {
  const [page, setPage] = useState(0);
  const [imageBuffer, setImageBuffer] = useState(null);
  const navigate = useNavigate(); 
  const isLastPage = page === 3;
  const { userId } = useParams();

  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();


  const handleGoBack = () => {
    if (page > 0) {
      setPage(page - 1);
    } 
  };

  const handleContinue = async () => {
    console.log('next-button');
    const isValid = await trigger();
    console.log(isValid);
    if (page < 3 && isValid) {
      setPage(page + 1);
    } else if (isValid) {
      if (page === 3) {
        handleSubmit(onSubmit)();
      } else {
        navigate('/success');
      }
    }
  };

  const handleImageReady = (imageBuffer) => {
    // Store the image buffer in the state
    setImageBuffer(imageBuffer);
  };

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Display
          formMethods={{
            control,
            trigger,
            handleSubmit,
            formState: { isValid, errors },
          }}
        />
      );
    } else if (page === 1) {
      return (
        <Gender
          formMethods={{
            control,
            trigger,
            handleSubmit,
            formState: { isValid, errors },
          }}
        />
      );
    } else if (page === 2) {
      return (
        <Biography
          formMethods={{
            control,
            trigger,
            handleSubmit,
            formState: { isValid, errors },
          }}
        />
      );
    } else {
      return (
        <ProfilePhoto
          formMethods={{
            control,
            trigger,
            handleSubmit,
            formState: { isValid, errors },
          }}
          onImageReady={handleImageReady}
        />
      );
    }
  }; 

  const onSubmit = async (formData) => {
    // Add userID to the formData object
   formData.userId = userId;

   // Attach image buffer to formData
   if (imageBuffer) {
     formData.photo = {
       type: 'Buffer', // Indicate that the data is a buffer
       data: Array.from(new Uint8Array(imageBuffer)), // Convert buffer to an array of integers
       contentType: 'image/jpeg', // Replace with the appropriate content type
     };
   }

   console.log('Form Data:', formData);
   try {
     let token = localStorage.getItem('token');
     token = JSON.parse(token)?.authToken;

     const response = await fetch('https://mmr2.onrender.com/createprofile', {
       method: 'POST',   
       body: JSON.stringify(formData),
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
     });

     if (response.ok) {
       const result = await response.json();
       console.log(result);
       navigate(`/success/${result.newProfile.user}`); // Navigate on success
      } else {
        console.error('Server error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
 
  const handleSkip = async () => {
    if (page === 2) {
      // Skip the Biography page
      setPage(page + 1); // Skip to the ProfilePhoto page
    } else if (page === 3) {
      // Check if an image is uploaded before skipping
      if (imageBuffer) {
        // Submit the form with image on the ProfilePhoto page
        await handleSubmit(onSubmit)();
      } else {
        // User clicked 'Not Now' without uploading image
        await onSubmit({}); // Call onSubmit with an empty object
      }
    }
  };


  return (
    <form className='create-profile-forms-container'>
      {/* <div className='progress-indicator-container'></div> */}
      {page !== 0 && (
        <button className='back-button' onClick={handleGoBack}>
          <i className='fas fa-arrow-left'></i>
          Back
        </button>
      )}
      <div className='all-forms'>{PageDisplay()}</div>
      <div className='button-group'>
        <button
          type='button'
          className={`continue-button ${isLastPage ? 'submit-button' : ''} ${isValid ? 'valid' : 'invalid'}`}
          onClick={handleContinue}
        >
          {isLastPage ? 'Submit' : 'Continue'}
        </button>
        {page === 2 || page === 3 ? (
          <button type='button' className='skip-button' onClick={handleSkip}>
            Not Now
          </button>
        ) : null}
      </div>
    </form>
  );
}
export default CreateProfile;