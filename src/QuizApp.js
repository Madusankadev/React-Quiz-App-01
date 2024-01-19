// QuizApp.js

import React, { useState } from 'react';
import './QuizApp.css';

const questionsData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    question: 'Which programming language is used for React development?',
    options: ['Java', 'Python', 'JavaScript', 'C++'],
    correctAnswer: 'JavaScript',
  },
  {
    question: 'What does JSX stand for?',
    options: ['JavaScript XML', 'Java XML', 'JSON XML', 'JS XML'],
    correctAnswer: 'JavaScript XML',
  },
  {
    question: 'What is the purpose of React Router?',
    options: ['State management', 'Navigation', 'Ajax requests', 'Styling'],
    correctAnswer: 'Navigation',
  },
  {
    question: 'What hook is used for side effects in functional components?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 'useEffect',
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionClick = (selectedOption) => {
    const isCorrect = selectedOption === questionsData[currentQuestion].correctAnswer;

    setUserAnswers([...userAnswers, { question: currentQuestion, answer: selectedOption, correct: isCorrect }]);
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedOption(selectedOption);
  };

  const handleNextClick = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // Clear selected option for the next question
      setQuizCompleted(false);
    } else {
      // Quiz is completed
      setQuizCompleted(true);
    }
  };

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setUserAnswers(userAnswers.slice(0, -1)); // Remove the current answer for the current question
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null); // Clear selected option for the previous question
      setQuizCompleted(false);
    }
  };
  

  const handleRestartClick = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setSelectedOption(null);
    setQuizCompleted(false);
  };

  return (
    <div className="quiz-container">
      {!quizCompleted ? (
        
        <div>
            <h1>Quize App</h1>
          <div className="question-box">
            <h2>{questionsData[currentQuestion].question}</h2>
            <hr />
            <div className="options-box">
              {questionsData[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${selectedOption === option ? 'selected' : ''} ${userAnswers.find((answer) => answer.question === currentQuestion && answer.answer === option && answer.correct) ? 'correct' : ''} ${userAnswers.find((answer) => answer.question === currentQuestion && answer.answer === option && !answer.correct) ? 'incorrect' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="button-box">
            {currentQuestion > 0 && (
              <button onClick={handleBackClick}>Back</button>
            )}
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div>
      ) : (
        <div className="summary">
          <p>Quiz completed. Your score: {score}</p>
          <p>Number of correct answers: {userAnswers.filter(answer => answer.correct).length}</p>
          <button onClick={handleRestartClick}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
