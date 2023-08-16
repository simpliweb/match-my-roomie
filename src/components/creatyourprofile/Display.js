// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';import { FaArrowDown } from 'react-icons/fa';
import './Display.css';


function Display() {
  const {
    control,
    handleSubmit,
    // reset,
    // trigger,
    formState: { errors, isValid },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [signUpCompleted, setSignUpCompleted] = useState(false);

//   const handleFormValidation = async () => {
//     const isValid = await trigger(); // Manually trigger form validation
//     setIsFormValid(isValid);
//   };  
  const onSubmit = async () => {
    navigate('/gender');
  };
  
//   const onSubmit = async (formData) => {
//     // console.log(data)
//     try {
//       const url = 'http://localhost:8000/user/signup';
//       const { data: res } = await axios.post(url, formData);
//       console.log(res.message);

//       // Clear the form after successful submission
//       //reset(); // Call the reset function

//       // Set sign-up completed to true
//       setSignUpCompleted(true);

//       // Navigate to another page
//       navigate('/gender');
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         setError(error.response.data.message);
//       }
//     }
//     setIsFormValid(true);
//   };

  return (
    <div className='container'>
      <div className='profile-create-info'>
        <div className='display-progress-bar'>
          <div className='rectangle' id='first'></div>
          <div className='rectangle' id='second'></div>
          <div className='rectangle' id='third'></div>
          <div className='rectangle' id='fourth'></div>
        </div>

        <h2 className='profile-create-info-h2'>Create Your Profile</h2>
        <h3 className='profile-create-info-h3'>
          Your profile is an important part of the
          <span>matching process to help others get to </span>
          <span>know you.</span>
        </h3>
        <p className='profile-create-info-p'>
          The information you share will be used across
          <span>MatchMyRoomie to help potential roommates get to know</span>
          <span>you.</span>
        </p>
        <form className='display-form' onSubmit={handleSubmit(onSubmit)}>
          {/* first name */}
          <div className='name'>
            <div className='label-name-container'>
              <label className='label-name'>
                First Name
                <Controller
                  name='firstName'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'First Name is required.' }}
                  render={({ field }) => (
                    <input
                      className='label-name-input'
                      {...field}
                      type='text'
                      placeholder='Emily'
                    />
                  )}
                />
                {errors.firstName && (
                  <p className='error-message'>{errors.firstName.message}</p>
                )}
              </label>

              {/* last name */}
              <label className='label-name'>
                Last Name
                <Controller
                  name='lastName'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Last Name is required.' }}
                  render={({ field }) => (
                    <input
                      className='label-name-input'
                      {...field}
                      type='text'
                      placeholder='Huang'
                    />
                  )}
                />
                {errors.lastName && (
                  <p className='error-message'>{errors.lastName.message}</p>
                )}
              </label>
            </div>

            {/* age */}
            <div className='age-label-container'>
              <label className='age'>
                Age
                <Controller
                  name='age'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Age is required.' }}
                  render={({ field }) => (
                    <div className='age-label'>
                      <select id='age' {...field}>
                        <option value='' disabled>
                          {/* <FaArrowDown size={50} color='black' /> */}
                        </option>
                        <option value='18-22'>18-22</option>
                        <option value='23-27'>23-27</option>
                        <option value='28-32'>28-32</option>
                        <option value='33-37'>33-37</option>
                        <option value='38-42'>38-42</option>
                        <option value='43-47'>43-47</option>
                        <option value='48-52'>48-52</option>
                        <option value='53+'>53+</option>
                      </select>
                      {errors.age && (
                        <p className='error-message'>{errors.age.message}</p>
                      )}
                    </div>
                  )}
                />
              </label>
            </div>
            {/* <button type='submit' onClick={handleFormValidation}>
              Continue
            </button> */}
            <p className='age-info'>
              All users must be at leats 18 years or older. We use age to ensure
              the most accurate matches.
            </p>
            <button
              className={`profile-continue-button ${
                isValid ? 'completed' : ''
              }`}
              type='submit'
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      {/* <div className='profile-info-side'> */}
      <div className='info-side'>
        <img
          src={require('../../assets/images/results-card-blurry.png')}
          alt='matched user profile with profile and details'
        />
      </div>
    </div>
  );
}
export default Display;
