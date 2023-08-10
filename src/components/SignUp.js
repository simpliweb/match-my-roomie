import axios from 'axios';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import '../assets/styles/Signup.css';


function Signup() {
	const [error, setError] = useState('');
  // const [data, setData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password: '',
  // });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormValidation = async () => {
    const isValid = await trigger(); // Manually trigger form validation
    setIsFormValid(isValid);  
  };

  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    // console.log(data)
    try {
      const url = 'http://localhost:8000/user/signup';
      const { data: res } = await axios.post(url, formData);
      console.log(res.message);

      // Clear the form after successful submission
      reset(); // Call the reset function
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
    <div className='sign-up'>
      <div className='account-create'>
        <h2>Create an Account</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className='container'
        >
          {/* email */}
          <label className='email'>
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
                  {...field}
                  type='email'
                  placeholder='email@matchmyroomie.com'
                  // value={data.email}
                  // onChange={handleChange}
                />
              )}
            />
            {errors.email && (
              <p className='error-message'>{errors.email.message}</p>
            )}
          </label>

          {/* first name */}
          <div className='label-name'>
            <label>
              First Name
              <Controller
                name='firstName'
                control={control}
                defaultValue=''
                rules={{ required: 'First Name is required.' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    placeholder='Jane'
                    // value={data.firstName}
                    // onChange={handleChange}
                  />
                )}
              />
              {errors.firstName && (
                <p className='error-message'>{errors.firstName.message}</p>
              )}
            </label>

            {/* last name */}
            <label>
              Last Name
              <Controller
                name='lastName'
                control={control}
                defaultValue=''
                rules={{ required: 'Last Name is required.' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type='text'
                    placeholder='Doe'
                    // value={data.lastName}
                    // onChange={handleChange}
                  />
                )}
              />
              {errors.lastName && (
                <p className='error-message'>{errors.lastName.message}</p>
              )}
            </label>
          </div>

          {/* password */}
          <label>
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
                pattern: {
                  value: /^(?=.*[!@#$%^&*])/,
                  message: 'Password must contain at least one symbol.',
                },
              }}
              render={({ field }) => (
                <div className='password-input'>
                  <input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    // value={password}
                    // onChange={handlePasswordChange}
                    placeholder='*********'
                    // value={data.password}
                    // onChange={handleChange}
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
            {/* {errors.password && (
              <ul className='password-error-message'>
                Your password must contain:
                <li>a symbol</li>
                <li>a minimum of 8 characters</li>
              </ul>
            )} */}
          </label>
          <div className={`signup-button ${isFormValid ? 'blue-button' : ''}`}>
            <button type='submit' onClick={handleFormValidation}>Sign Up</button>
          </div>
        </form>

        <div className='account-check'>
          Already have an account? <button>Sign in</button>
        </div>
      </div>

      <div className='account-side'>
        <img src={require('../assets/images/Ellipse 11.png')} alt='roommates' />
        <p>
          "Thanks to MatchMyRoomie, I<span>found my new best friend!"</span>
          <span>- Tanya, 29</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
