import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

function Gender() {
  const question = 'Which gender do you identify with?';
  const options = ['Female', 'Male', 'Transgender', 'Nonbinary'];
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState('');

  const navigate = useNavigate();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedOption('Other');
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
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    navigate('/biography');
  };

  return (
    <div className='gender-container'>
      <h3>{question}</h3>
      <p>
        The information will be shwon on your MatchMyRoomie profile to help
        potential roommates get to know you.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Other:{' '}
          <Controller
            name='customOption'
            control={control}
            defaultValue=''
            rules={{
              required: selectedOption === 'Other' ? 'Custom option is required.' : undefined,
            }}
            render={({ field }) => (
              <div>
                <input
                  type='text'
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCustomOptionChange(e);
                  }}
                  disabled={selectedOption !== 'Other'}
                />
                {errors.customOption && ( // Display error message
                  <p className='error-message'>{errors.customOption.message}</p>
                )}
              </div>
            )}
          />
        </label>
        <button type='submit'>Continue</button>
      </form>
      {/* <button type='submit' onClick={handleFormValidation}>
        Continue
      </button> */}
    </div>
  );
}

export default Gender;
