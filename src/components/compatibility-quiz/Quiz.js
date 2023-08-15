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
  const currentQuestion = Questions[currentQuestionIndex];
  const progressPercentage =
    (currentQuestionIndex / (Questions.length - 1)) * 100;

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
    <div className='quiz-container'>
      <div className='button-group'>
        <button onClick={handlePreviousQuestion}>
          <i className='fas fa-arrow-left'></i>
          Back
        </button>
      </div>
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
          <div>
            <h2>Quiz</h2>
            <p>
              Question {currentQuestionIndex + 1}/{Questions.length}
            </p>

            <p>{Questions[currentQuestionIndex].question}</p>
            <form>
              {Questions[currentQuestionIndex].options.map((option, index) => (
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
              ))}
            </form>
            <div className='button-group'>
              <button
                onClick={handleNextQuestion}
                disabled={isContinueDisabled}
                className={
                  isContinueDisabled
                    ? 'continue-button disabled'
                    : 'continue-button'
                }
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div>{/* navigate to results page? */}</div>
        )}
      </div>
      <div className='quiz-image'>
        {currentQuestionIndex <= 1 && (
          <img
            src={require('../../assets/images/' + Questions[0].image)}
            alt='Common Image'
          />
        )}
        {currentQuestionIndex >= 2 && (
          <img
            src={require('../../assets/images/' +
              Questions[currentQuestionIndex].image)}
            alt={`Question ${currentQuestionIndex + 1} Image`}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
