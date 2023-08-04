import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import '../assets/styles/Signin.css';

function SignIn() {
  const [data, setData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',  
  });
  const [err, setErr] = useState({}); // [err, setErr]

  const handleChange = ({currentTarget: input}) => {
    setData({
      ...data,
      [input.name]: input.value
    })
  };

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try{
      const url = "http://localhost:8000/user/signup"; // this is the backend url and it will change after i deploy the backend and i will deply it when frontent is completed.
      const {data:res} = await axios.post(url, data);
      console.log(res.message);
    } catch(err){
      if(
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ){
        setErr(err.response.data.message);
      }
    }
    // console.log(data);
  };

  return (
    <div className='sign-in'>
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
                  value={data.email}
                  onChange={handleChange}
                />
              )}
            />
            {errors.email && <p>{errors.email.message}</p>}
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
                  value={data.firstName}
                  onChange={handleChange}
                  />
                )}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
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
                  value={data.lastName}
                  onChange={handleChange}
                  />
                )}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
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
                  //   message: 'Password must be at least 8 characters long.',
                },
                pattern: {
                  value: /^(?=.*[!@#$%^&*])/, // Requires at least one symbol
                  //   message: 'Password must contain at least one symbol.',
                },
              }}
              render={({ field }) => (
                <div className='password-input'>
                  <input {...field} type='password' placeholder='*********' 
                  value={data.password}
                  onChange={handleChange}
                  />
                  <i
                    className='far fa-eye password-toggle-icon'
                    onClick={() => setShowPassword(!showPassword)}
                    aria-hidden='true'
                  ></i>
                </div>
              )}
            />
            {errors.password && (
              <ul className='password-info'>
                Your password must contain:
                <li>a symbol</li>
                <li>a minimum of 8 characters</li>
              </ul>
            )}
          </label>
          <div className='signup-button'>
            <button onClick={onSubmit}>Sign Up</button>
          </div>
        </form>

        <div className='account-check'>
          Already have an account? <button>Sign in</button>
        </div>
      </div>

      <div className='account-side'>
        <img src={require('../assets/images/Ellipse 11.png')} alt='roommates' />
        <p>
          "Thanks to MatchMyRoomie, I <span>found my new best friend!"</span>
          <span>- Tanya, 29</span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
