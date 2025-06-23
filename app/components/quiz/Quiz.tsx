import { useState, useEffect } from "react";
import "./Quiz.css";
import {
  useUnlockNextBattleMutation,
  useUpdateBattleMutation,
} from "../../services.ts/api";
import type { Question, QuestionData } from "../../types/types";
import { useDispatch } from "react-redux";
import { SET_MESSAGE } from "~/store/appState/appStateSlice";

export default function Quiz({
  questionDataArr,
  uid,
  battleId,
}: {
  questionDataArr: QuestionData[];
  uid: string;
  battleId: number;
}) {
  const dispatch = useDispatch();
  const [unlockNextBattle, { isLoading, error, isSuccess }] =
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

  async function completeBattle() {
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
      if (score === 2 && !isSuccess && battleId != 12) {
        //unlock next battle & update completed status
        completeBattle();
      }

      if (score === 2 && isSuccess) {
        dispatch(SET_MESSAGE("Unlocked: New video & battle"));
      }
    },
    [score, isSuccess]
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
                      className="primary"
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
