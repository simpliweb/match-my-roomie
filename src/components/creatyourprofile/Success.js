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
      <button className='back-button' onClick={handleGoBack}>
        <i className='fas fa-arrow-left'></i>
        Back
      </button>

      <h2>Success!</h2>
      <h3>
        Next, take our proven roommate matching quiz to speed up your search!
      </h3>

      <button type='button' onClick={onSubmit}>
        Continue
      </button>
    </div>
  );
}
export default Success;
