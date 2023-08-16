import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

function Success() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const onSubmit = () => {
    navigate('/quiz');
  };

  return (
    <div className='success-container'>
      <div className='success-inner-container'>
        <button className='back-button' onClick={handleGoBack}>
          <i className='fas fa-arrow-left'></i>
          Back
        </button>

        <h2 className='success-h2'>Success!</h2>
        <h3 className='success-h3'>
          Next, take our proven
          <span className='success-h3-middle'>
            roommate matching quiz
          </span>
          <span> to speed up your search!</span>
        </h3>

        <button type='button' className='submit-button' onClick={onSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
}
export default Success;
