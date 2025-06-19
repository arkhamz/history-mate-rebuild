import { useState, useEffect } from "react";
import "./Quiz.css";
import { useDispatch } from "react-redux";
import { TiTickOutline } from "react-icons/ti";
import {
  useUnlockNextBattleMutation,
  useUpdateBattleMutation,
} from "../../services.ts/api";
import type { Question, QuestionData } from "../../types/types";

export default function Quiz({
  questionDataArr,
  uid,
  battleId,
}: {
  questionDataArr: QuestionData[];
  uid: string;
  battleId: number;
}) {
  const [unlockNextBattle, { isLoading, error }] =
    useUnlockNextBattleMutation();

  const [
    updateBattle,
    { isLoading: updateBattleLoading, error: updateBattleError },
  ] = useUpdateBattleMutation();

  const [current, setCurrent] = useState(0);
  //current will act as questions index, represents question user is on
  // current will be increased by one whenever an answer button is clicked
  //e.g. starts with 1st question visible, then moves to next question
  //since we are looping through array of questions
  const [score, setScore] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const dispatch = useDispatch();

  function handleClick(answer: boolean) {
    // If answer is true, increase score. As long as score is not equal to 2
    if (answer === true) {
      if (score < 2) {
        setScore(score + 1);
      }
    }
    //Increase currentObject index if current index is less than last index
    if (current < questionDataArr.length - 1) {
      setCurrent(current + 1);
    }
  }

  async function unlockNextBattleFn() {
    //battle.completed = true
    const updateResult = await updateBattle({
      user_id: uid,
      battle_id: battleId,
      completed: true,
    }).unwrap();

    console.log("updateResult - ", updateResult);

    //unlock next battle
    const unlockResult = await unlockNextBattle({
      user_id: uid,
      battle_id: battleId,
      completed: true,
    }).unwrap();

    console.log("unlockResult - ", unlockResult);
  }

  useEffect(
    function () {
      // only unlock the next battle if battleId is not currently 12, i.e. last battle
      if (score === 2) {
        //unlock next battle
        unlockNextBattleFn();
      }
    },
    [score]
  );

  return (
    <>
      {questionDataArr?.length && score < 2 ? (
        <div className="questions-container">
          <div className="questions-">
            <div className="score">Score: {score}</div>

            <div className="question-count">
              {/* <span>Question {current + 1}</span> / {questions.length} */}
              <h2>
                Question {current + 1} / {questionDataArr.length}{" "}
              </h2>
            </div>

            <div className="question-text">
              <h3>{questionDataArr[current].question.text}</h3>
            </div>

            <div className="score-icon">
              {score === 1 && <i>{<TiTickOutline />}</i>}
              {score === 2 && (
                <>
                  <i>{<TiTickOutline />}</i>
                  <i>{<TiTickOutline />}</i>
                </>
              )}
            </div>
          </div>

          <div className="answer-section">
            {questionDataArr[current].answers.map(function (answ, i) {
              return (
                <button
                  className="answer-btn"
                  key={i}
                  onClick={() => handleClick(answ.is_correct)}
                >
                  {answ.answer_text}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
