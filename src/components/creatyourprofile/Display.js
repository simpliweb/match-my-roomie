// import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

function Display() {
  const {
    control,
    handleSubmit,
    // reset,
    // trigger,
    formState: { errors },
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
    <div className='profile-container'>
      <h2>Create Your Profile</h2>
      <h3>
        Your profile is an important part of the matching process to help others
        get to know you.
      </h3>
      <p>
        The information you share will be used across MatchMyRoomie to help
        potential roommates get to know you.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <input {...field} type='text' placeholder='Emily' />
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
                <input {...field} type='text' placeholder='Huang' />
              )}
            />
            {errors.lastName && (
              <p className='error-message'>{errors.lastName.message}</p>
            )}
          </label>

          {/* age */}
          <label>Age</label>
          <Controller
            name='age'
            control={control}
            defaultValue=''
            rules={{ required: 'Age is required.' }}
            render={({ field }) => (
              <div className='age-label'>
                <select id='age' {...field}>
                  <option value='' disabled>
                    Select an age
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
          {/* <button type='submit' onClick={handleFormValidation}>
            Continue
          </button> */}
          <button type='submit'>Continue</button>
        </div>
      </form>
    </div>
  );
}
export default Display;
