import React from 'react';
import { Controller } from 'react-hook-form';
import './Display.css';


function Display({ formMethods }) {  
  return (
    <div className='container'>
      <div className='profile-create-info'>     
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
        <div className='display-form'>          
          <div className='name'>
            <div className='label-name-container'>
              <label className='label-name'>
                First Name
                <Controller
                  name='firstName'
                  control={formMethods.control}
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
                {formMethods.formState.errors.firstName && (
                  <p className='error-message'>
                    {formMethods.formState.errors.firstName.message}
                  </p>
                )}
              </label>

              {/* last name */}
              <label className='label-name'>
                Last Name
                <Controller
                  name='lastName'
                  control={formMethods.control}
                  defaultValue=''
                  rules={{ required: 'Last Name is required.' }}
                  render={({ field }) => (
                    <input
                      className='label-name-input'
                      {...field}
                      type='text'
                    />
                  )}
                />
                {formMethods.formState.errors.lastName && (
                  <p className='error-message'>
                    {formMethods.formState.errors.lastName.message}
                  </p>
                )}
              </label>
            </div>

            {/* age */}
            <div className='age-label-container'>
              <label className='age'>
                Age
                <Controller
                  name='age'
                  control={formMethods.control}
                  defaultValue=''
                  rules={{ required: 'Age is required.' }}
                  render={({ field }) => (
                    <div className='age-label'>
                      <select id='age' {...field}>
                        <option value='' disabled></option>
                        <option value='18-22'>18-22</option>
                        <option value='23-27'>23-27</option>
                        <option value='28-32'>28-32</option>
                        <option value='33-37'>33-37</option>
                        <option value='38-42'>38-42</option>
                        <option value='43-47'>43-47</option>
                        <option value='48-52'>48-52</option>
                        <option value='53+'>53+</option>
                      </select>
                      {formMethods.formState.errors.age && (
                        <p className='error-message'>
                          {formMethods.formState.errors.age.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </label>
            </div>           
            <p className='age-info'>
              All users must be at leats 18 years or older. We use age to ensure
              the most accurate matches.
            </p>           
          </div>
        </div>
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
export default Display;
