import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FaArrowDown } from 'react-icons/fa';
import './Biography.css';

function Biography() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (data) => {
     console.log('Submitted value:', data.textInput);
     navigate('/profilephoto');

  };

  const handleSkip = () => {
    navigate('/profilephoto');
  };

  // const handleFormValidation = async () => {
  //   const isValid = await trigger(); // Manually trigger form validation
  //   setIsFormValid(isValid);
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className='biography-container'>
      <button className='back-button' onClick={handleGoBack}>
        <i className='fas fa-arrow-left'></i>
        Back
      </button>

      <div className='biography-info-container'>
        <div className='progress-bar'>
          <div className='rectangle' id='first-bio'></div>
          <div className='rectangle' id='second-bio'></div>
          <div className='rectangle' id='third-bio'></div>
          <div className='rectangle' id='fourth-bio'></div>
        </div>

        <h2 className='biography-h2'>Create Your Profile</h2>
        <h3>Write a brief introductory biography about yourself</h3>
        <p>
          The information will be shown on your MatchMyRoomie
          <span>profile to help potential roommates get to know you.</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            About Me
            <Controller
              name='textInput'
              control={control}
              defaultValue=''
              rules={{ required: 'Please fill out your biography.' }}
              render={({ field }) => (
                <input
                  type='text'
                  {...field}
                  placeholder='Where are you moving from? What do you do for work? What hobbies do you have? Describe your cleaning habits, social habits. Do you have any Pets? Do you smoke or drink? How do you tolerate overnight guests?'
                  onChange={(e) => {
                    field.onChange(e);
                    handleInputChange(e); // Update inputValue state
                  }}
                />
              )}
            />
            {errors.textInput && (
              <p className='error-message'>{errors.textInput.message}</p>
            )}
          </label>
          <div className='button-group'>
            <button
              type='submit'
              className={`submit-button ${
                inputValue.trim() !== '' ? 'filled' : ''
              }`}
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </button>
            <button type='button' onClick={handleSkip}>
              Not Now
            </button>
          </div>
        </form>
        {/* <button type='submit' onClick={handleFormValidation}>
        Continue
      </button> */}
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

export default Biography;
