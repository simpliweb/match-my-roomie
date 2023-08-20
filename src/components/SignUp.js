import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import '../assets/styles/SignUp.css';


function SignUp() {  
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [signUpCompleted, setSignUpCompleted] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormValidation = async () => {
    const isValidForm  = await trigger(); // Manually trigger form validation
    setIsFormValid(isValidForm);
    setIsFormSubmitted(true);;
  };

  const onSubmit = async (formData) => {
    try {
      const url = 'http://localhost:8000/user/signup';
      const { data: res } = await axios.post(url, formData);
      console.log(res.message);
 
      // Clear the form after successful submission
      reset();

      // Set sign-up completed to true
      setSignUpCompleted(true);

      // Navigate to another page
      navigate('/createprofile');
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    setIsFormValid(true);
  };

  return (
    <div className='sign-up-container'>
      {/* Display error message if there is an error */}
      {/* {error && <p className='error-message'>{error}</p>} */}

      {/* Display sign-up completed message if sign-up is successful */}
      {/* {signUpCompleted && (
        <p className='success-message'>
          Sign-up successful! You can now sign in.
        </p>
      )} */}
      <div className='account-create'>
        <h2 className='account-create-h2'>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* email */}
          <label className='account-create-label'>
            Email
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address.',
                },
              }}
              render={({ field }) => (
                <input
                  className='account-create-input'
                  {...field}
                  type='email'
                  placeholder='email@matchmyroomie.com'
                />
              )}
            />
            {errors.email && (
              <p className='error-message'>{errors.email.message}</p>
            )}
          </label>

          {/* first name */}
          <div className='account-create-label-name'>
            <label className='account-create-label'>
              First Name
              <Controller
                name='firstName'
                control={control}
                defaultValue=''
                rules={{ required: 'First Name is required.' }}
                render={({ field }) => (
                  <input
                    className='account-create-label-name-input'
                    {...field}
                    type='text'
                    placeholder='Jane'
                  />
                )}
              />
              {errors.firstName && (
                <p className='error-message'>{errors.firstName.message}</p>
              )}
            </label>

            {/* last name */}
            <label className='account-create-label'>
              Last Name
              <Controller
                name='lastName'
                control={control}
                defaultValue=''
                rules={{ required: 'Last Name is required.' }}
                render={({ field }) => (
                  <input
                    className='account-create-label-name-input'
                    {...field}
                    type='text'
                    placeholder='Doe'
                  />
                )}
              />
              {errors.lastName && (
                <p className='error-message'>{errors.lastName.message}</p>
              )}
            </label>
          </div>

          {/* password */}
          <label className='account-create-label'>
            Password
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long.',
                },
                // pattern: {
                //   value: /^(?=.*[!@#$%^&*])/,
                //   message: 'Password must contain at least one symbol.',
                // },
              }}
              render={({ field }) => (
                <div className='password-input'>
                  <input
                    className='account-create-input'
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='*********'
                  />
                  <i
                    className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'}
                    onClick={togglePasswordVisibility}
                    aria-hidden='true'
                  ></i>
                </div>
              )}
            />
            {errors.password && (
              <p className='password-error-message'>
                {errors.password.message}
              </p>
            )}
          </label>
          <div
            className={`signup-button ${
              isFormSubmitted && isValid ? 'filled-button' : ''
            }`}
          >
            <button type='submit' onClick={handleFormValidation}>
              Sign Up
            </button>
          </div>
        </form>
        <div className='account-check'>
          Already have an account? <button>Sign in</button>
        </div>
      </div>

      <div className='account-side'>
        <img src={require('../assets/images/ellipse11.png')} alt='roommates' />
        <p>
          "Thanks to MatchMyRoomie, I<span>found my new best friend!"</span>
          <span>- Tanya, 29</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
