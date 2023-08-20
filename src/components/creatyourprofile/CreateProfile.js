import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Display from './Display';
import Gender from './Gender';
import Biography from './Biography';
import ProfilePhoto from './ProfilePhoto';
// import Success from './Success';

function CreateProfile() {
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const isLastPage = page === 3;
//   const formMethods = useForm();

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
        />
      );
    }
  }; 

  const onSubmit = async (formData) => {
    console.log('Form Data:', formData);
    try {
      let token = localStorage.getItem('token');
      token = JSON.parse(token)?.authToken;

      const response = await fetch('http://localhost:8000/createprofile', {
        method: 'POST',
        // body: JSON.stringify({
        //   questionIndex: currentQuestionIndex,
        //   selectedOption: selectedOption,
        // }),
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate('/success'); // Navigate on success
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
     // Submit the form on the ProfilePhoto page
     await handleSubmit(onSubmit)();
   } 
  };

  return (
    <form className='create-profile-forms-container'>
      <div className='progress-indicator-container'></div>
      <button className='back-button' onClick={handleGoBack}>
        <i className='fas fa-arrow-left'></i>
        Back
      </button>
      <div>{PageDisplay()}</div>
      <div className='button-group'>
        <button
          type='button'
          className={`continue-button ${isLastPage ? 'submit-button' : ''}`}
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