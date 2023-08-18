import React, { useState } from 'react';
import axios from 'axios';
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
  const [selectedOption, setSelectedOption] = useState('');
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);

  const handleOptionChange = (event) => {
    const newSelections = [...form.questionSelections];
    newSelections[currentQuestionIndex] = event.target.value;

    setForm({
      ...form,
      questionSelections: newSelections,
    });

    setIsContinueDisabled(false);
  };

  const handleNextQuestion = () => {
    console.log('handleNextQuestion is working');
    // setSelectedOption('');
    // setSelectedOption(event.target.value);
    setIsContinueDisabled(true);
    
    if (currentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Navigate to the results page when all questions are answered
      // navigate('/results');
    }
  };

  const handlePreviousQuestion = () => {
    console.log('handlePreviousQuestion is working');
    // setSelectedOption('');
    setIsContinueDisabled(true);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  // Create a mapping of options to icon images
  const optionIcons = {
    'House': houseIcon,
    'Apartment': apartmentIcon,
    'A bed in a Shared Bedroom': bedIcon
  };

  const {
    control,
    // reset,
    // trigger,
    // formState: { errors, isValid },
    handleSubmit
  } = useForm();
 
  const [form, setForm] = useState({
    questionSelections: Array(Questions.length).fill(''),
    // genderPreference: '',
    // accommodationType: '',
    // preferredAge: '',
    // topPreference: '',
  });

  const onSubmit = async (formData) => {
    console.log('Form Data:', formData);
    try {      
      // const url = 'http://localhost:8000/user/addpreference';
      // const { data: res } = await axios.post(url, formData);
      // console.log(res.message);

      let token = localStorage.getItem('token');
      token = JSON.parse(token)?.authToken;
      const response = await fetch('http://localhost:8000/addpreference', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('API Error:', error);
    } 
    // });
    //const result = await response.json();
    //console.log(result);
    
    navigate("/addpreference");

    // navigate('/dashboard');
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
                <span>good match for you.</span>
              </p>
              <form className='quiz-form' onSubmit={handleSubmit(onSubmit)}>
                {Questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <label key={index} className='option-label'>
                      <Controller
                        name={`question${currentQuestionIndex}`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type='radio'
                            value={option}
                            checked={
                              form.questionSelections[currentQuestionIndex] ===
                              option
                            }
                            onChange={(e) => {
                              field.onChange(e);
                              handleOptionChange(e);
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
                  )
                )}
              </form>
              <div className='next-button'>
                <button
                  type={
                    currentQuestionIndex < Questions.length - 1
                      ? 'button'
                      : 'submit'
                  }
                  onClick={handleNextQuestion}
                  disabled={isContinueDisabled}
                  className={`continue-button ${
                    isContinueDisabled ? 'disabled' : 'filled-button'
                  }`}
                >
                  {currentQuestionIndex < Questions.length - 1
                    ? 'Continue'
                    : 'Submit'}
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
