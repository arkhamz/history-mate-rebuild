import { useState, useEffect } from "react";
import "./Quiz.css";
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
  //current = currentQuestionIndex
  const [score, setScore] = useState(0);

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
    //set battle.completed = true
    const updateResult = await updateBattle({
      user_id: uid,
      battle_id: battleId,
      completed: true,
    }).unwrap();

    //unlock next battle
    const unlockResult = await unlockNextBattle({
      user_id: uid,
      battle_id: battleId,
      completed: true,
    }).unwrap();
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
        <div className="questions outer-wrapper">
          <div className="questions__inner-wrapper inner-wrapper">
            <div className="question__answers-container">
              <div>
                <h3 className="question-text">
                  {questionDataArr[current].question.text}{" "}
                  {`(${current + 1} / ${questionDataArr.length})`}
                </h3>
              </div>

              <div className="question__answers">
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
          </div>
        </div>
      ) : null}
    </>
  );
}
