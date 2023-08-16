import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Questions from './Questions';
import './Quiz.css';


// Import the icon images
import houseIcon from '../../assets/images/icon/House.png';
import apartmentIcon from '../../assets/images/icon/Apartment.png';
import bedIcon from '../../assets/images/icon/Single Bed.png';

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  // const currentQuestion = Questions[currentQuestionIndex];
  // const progressPercentage =
  //   (currentQuestionIndex / (Questions.length - 1)) * 100;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsContinueDisabled(false);
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setIsContinueDisabled(true);
    
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Navigate to the results page when all questions are answered
      navigate('/results');
    }
  };

  const handlePreviousQuestion = () => {
    setSelectedOption('');
    setIsContinueDisabled(true);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Create a mapping of options to icon images
  const optionIcons = {
    'House': houseIcon,
    'Apartment': apartmentIcon,
    'A bed in a Shared Bedroom': bedIcon
  };

  return (
    <div className='container'>
      <div className='inner-container'>
        <button className='back-button' onClick={handlePreviousQuestion}>
          <i className='fas fa-arrow-left'></i>
          Back
        </button>
        <div className='quiz-questions'>
          <div className='progress-indicator-container'>
            {Questions.map((_, index) => (
              <div
                key={index}
                className={`progress-indicator ${
                  index <= currentQuestionIndex ? 'completed' : ''
                }`}
              ></div>
            ))}
          </div>
          {currentQuestionIndex < Questions.length ? (
            <div className='inner-inner-container'>
              <h2 className='inner-h2'>Roommate Preferences</h2>
              <h3 className='quiz-h3'>
                {Questions[currentQuestionIndex].question}
              </h3>
              <p className='inner-p'>
                This information helps us find a roommate that will be a 
                <span>
                  good match for you. 
                </span>
              </p>
              <form className='quiz-form'>
                {Questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label key={index} className='option-label'>
                      <input
                        type='radio'
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                      />
                      {optionIcons[option] && (
                        <img
                          className='icon'
                          src={optionIcons[option]}
                          alt={option}
                        />
                      )}
                      <span className='option-text'>{option}</span>
                    </label>
                  )
                )}
              </form>
              <div className='next-button'>
                <button
                  onClick={handleNextQuestion}
                  disabled={isContinueDisabled}
                  className=                   {`continue-button ${isContinueDisabled ? 'disabled' : 'filled-button'}`}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : (
            <div>{/* navigate to results page? */}</div>
          )}
        </div>
      </div>
      <div className='quiz-image'>
        {currentQuestionIndex <= 1 && (
          <img
            src={require('../../assets/images/' + Questions[0].image)}
            alt='buildings'
          />
        )}
        {currentQuestionIndex >= 2 && (
          <img
            src={require('../../assets/images/' +
              Questions[currentQuestionIndex].image)}
            alt={`female playing game and hodlign a box`}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
