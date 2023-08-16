import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import './Gender.css';

function Gender() {
  const question = 'Which gender do you identify with?';
  const options = ['Female', 'Male', 'Transgender', 'Nonbinary'];
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState('');

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCustomOptionChange = (event) => {
    setSelectedOption('Other');
    setCustomOption(event.target.value);
  };

  // const handleFormValidation = async () => {
  //   const isValid = await trigger(); // Manually trigger form validation
  //   setIsFormValid(isValid);
  // };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = async () => {
    navigate('/biography');
  };

  return (
    <div className='container'>
      <div className='inner-container'>
        <button className='back-button' onClick={handleGoBack}>
          <i className='fas fa-arrow-left'></i>
          Back
        </button>
        <div className='gender-info-container'>
          <div className='create-progress-bar'>
            <div className='rectangle' id='first-gender'></div>
            <div className='rectangle' id='second-gender'></div>
            <div className='rectangle' id='third-gender'></div>
            <div className='rectangle' id='fourth-gender'></div>
          </div>

          <h2 className='inner-h2'>Create Your Profile</h2>
          <h3 className='inner-h3'>{question}</h3>
          <p className='inner-p'>
            The information will be shown on your MatchMyRoomie
            <span>profile to help potential roommates get to know you.</span>
          </p>
          <form className='gender-form' onSubmit={handleSubmit(onSubmit)}>
            {options.map((option) => (
              <label key={option}>
                <Controller
                  name='gender'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Please select a gender.' }}
                  render={({ field }) => (
                    <div>
                      <input
                        type='radio'
                        value={option}
                        checked={selectedOption === option}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOptionChange(e);
                        }}
                      />
                      {option}
                    </div>
                  )}
                />
                {errors.gender && ( // Display error message
                  <p className='error-message'>{errors.gender.message}</p>
                )}
              </label>
            ))}
            <label>
              <Controller
                name='gender'
                control={control}
                defaultValue=''
                rules={{ required: 'Please select a gender.' }}
                render={({ field }) => (
                  <input
                    className='other-input'
                    type='radio'
                    value='Other'
                    checked={selectedOption === 'Other'}
                    onChange={(e) => {
                      field.onChange(e);
                      handleOptionChange(e);
                    }}
                  />
                )}
              />
              Other{' '}
              <Controller
                name='customOption'
                control={control}
                defaultValue=''
                rules={{
                  required:
                    selectedOption === 'Other'
                      ? 'Custom option is required.'
                      : undefined,
                }}
                render={({ field }) => (
                  <div>
                    <input
                      // className='other-input'
                      type='text'
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleCustomOptionChange(e);
                      }}
                      disabled={selectedOption !== 'Other'}
                    />
                    {errors.customOption && ( // Display error message
                      <p className='error-message'>
                        {errors.customOption.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </label>
            <button
              type='submit'
              className={`continue-button ${isValid ? 'filled' : ''}`}
            >
              Continue
            </button>
          </form>
        </div>
        {/* <button type='submit' onClick={handleFormValidation}>
        Continue
      </button> */}
      </div>
      <div className='info-side'>
        <img
          src={require('../../assets/images/results-card-blurry.png')}
          alt='matched user profile with profile and details'
        />
      </div>
    </div>
  );
}

export default Gender;
