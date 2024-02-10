import React, { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const shuffledData = [...new Set(data)].sort(() => Math.random() - 0.5).slice(0, 10);

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(shuffledData[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("Correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("Correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === shuffledData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(shuffledData[index + 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("Wrong");
        option.current.classList.remove("Correct");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(shuffledData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="outer-container">
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <></>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={Option1}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
              >
                {question.option1}
              </li>
              <li
                ref={Option2}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
              >
                {question.option2}
              </li>
              <li
                ref={Option3}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
              >
                {question.option3}
              </li>
              <li
                ref={Option4}
                onClick={(e) => {
                  checkAns(e, 4);
                }}
              >
                {question.option4}
              </li>
            </ul>
            <button onClick={next}>Next</button>
            <div className="index">{index + 1} of {shuffledData.length} Questions</div>
          </>
        )}
        {result ? (
          <>
            <h2 className="score">
              You Scored {score} out of {shuffledData.length}
            </h2>
            <button onClick={reset}>Reset</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Quiz;
