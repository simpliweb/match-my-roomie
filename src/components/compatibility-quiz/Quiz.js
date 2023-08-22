import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Questions from './Questions';
import './Quiz.css';

// Import the icon images
import houseIcon from '../../assets/images/icon/House.png';
import apartmentIcon from '../../assets/images/icon/Apartment.png';
import bedIcon from '../../assets/images/icon/Single Bed.png';

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  //   setIsContinueDisabled(false);
  // };

    const [formData, setFormData] = useState({
      genderPreference: '',
      accommodationType: '',
      preferredAge: '',
      topPreference: '',
    });

    // ...

    const handleOptionChange = (fieldName, option) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: option,
      }));
      setIsContinueDisabled(false);
    };

  const handleNextQuestion = () => {
    console.log('handleNextQuestion is working ' + currentQuestionIndex);
    setIsContinueDisabled(true);
    
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    console.log('handlePreviousQuestion is working');
    setIsContinueDisabled(true);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const {
    control,
    handleSubmit
  } = useForm();


  const onSubmit = async (formData) => {
    console.log('Form Data:', formData);
    try {    

      let token = localStorage.getItem('token');
      token = JSON.parse(token)?.authToken;

      const response = await fetch('http://localhost:8000/addpreference', {
        // http://localhost:8000/addpreference
        method: 'POST',
        // body: JSON.stringify({
        //   questionIndex: currentQuestionIndex,
        //   selectedOption: selectedOption,
        // }),
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/result"); // Navigate on success
        } else {
          console.error('Server error:', response.status, response.statusText);
        } 
      } catch (error) {
        console.error('API Error:', error);
      } 
    };

  //Create a mapping of options to icon images
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
          {/* {currentQuestionIndex < Questions.length ? ( */}
          <div className='inner-inner-container'>
            <h2 className='inner-h2'>Roommate Preferences</h2>
            <h3 className='quiz-h3'>
              {Questions[currentQuestionIndex].question}
            </h3>
            <p className='inner-p'>
              This information helps us find a roommate that will be a
              <span>good match for you.</span>
            </p>
            <form className='quiz-form' onSubmit={handleSubmit(onSubmit)}>
              {Questions[currentQuestionIndex].options.map((option, index) => (
                <label key={index} className='option-label'>
                  <Controller
                    // name={`question${currentQuestionIndex}`}
                    name={Questions[currentQuestionIndex].fieldName}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type='radio'
                        value={option}
                        // checked={selectedOption === option}
                        checked={field.value === option}
                        onChange={(e) => {
                          field.onChange(e);
                          // handleOptionChange(e);
                          handleOptionChange(
                            Questions[currentQuestionIndex].fieldName,
                            option
                          );
                        }}
                      />
                    )}
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
              {currentQuestionIndex < Questions.length - 1 ? (
                <div className='next-button'>
                  <button
                    type='button'
                    onClick={handleNextQuestion}
                    disabled={isContinueDisabled}
                    className={`continue-button ${
                      isContinueDisabled ? 'disabled' : 'filled-button'
                    }`}
                  >
                    Continue
                  </button>
                </div>
              ) : null}
              {currentQuestionIndex === Questions.length - 1 && (
                <div className='quiz-submit-button'>
                  <button
                    type='submit'
                    disabled={isContinueDisabled}
                    className={`continue-button ${
                      isContinueDisabled ? 'disabled' : 'filled-button'
                    }`}
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
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
