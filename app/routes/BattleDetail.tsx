import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  GiCannon,
  GiCalendar,
  GiFirstAidKit,
  GiPositionMarker,
  GiRallyTheTroops,
  GiMagnifyingGlass,
} from "react-icons/gi";
import "./BattleDetail.css";
import Quiz from "../components/quiz/Quiz";
import SpringFade from "../components/spring-fade/springFade";
import {
  useGetBattleQuestionsAndAnswersQuery,
  useGetUserBattleQuery,
} from "../services.ts/api";
import type { QuestionData } from "../types/types";
import { SelectAuthChecked, selectUser } from "~/store/user/userSelectors";
import { useEffect } from "react";
import Spinner from "~/components/spinner/Spinner";
import { BattleStatUnit } from "~/components/battle-stat-unit/BattleStatUnit";
import { CLEAR_MESSAGE, SET_MESSAGE } from "~/store/appState/appStateSlice";

function BattleDetail() {
  const { id } = useParams();
  const authChecked = useSelector(SelectAuthChecked);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    data: battle,
    isLoading: battleLoading,
    error,
  } = useGetUserBattleQuery(id || "", { skip: !id });

  useEffect(() => {
    //wait until auth check is completed
    if (!authChecked) return;

    if (!user) {
      navigate("/login");
    }
    // Only redirect to /atlas if the query failed or the battle doesn't exist *after loading*
    if (!battleLoading && error) {
      navigate("/atlas");
    }
  }, [authChecked, user, battleLoading, error, navigate]);

  const {
    data: questionDataArr,
    isLoading: questionDataLoading,
    error: questionDataError,
  } = useGetBattleQuestionsAndAnswersQuery(id ?? "1", { skip: !id });

  if (!battle || !user) {
    return <Spinner />;
  }

  const armyOneStrength = battle.army_one.strength;
  const armyOneCasualties = battle.army_one.casualties.replace(
    "killed and wounded",
    ""
  );
  const armyTwoStrength = battle.army_two.strength;
  const armyTwoCasualties = battle.army_two.casualties.replace(
    "killed and wounded",
    ""
  );
  const battleDate = battle.date ? `- ${battle.date}` : "";

  return (
    <div className="battle__container outer-wrapper">
      <div className="inner-wrapper">
        <div className="battle__title">
          <h1>
            {battle.name.startsWith("Siege")
              ? `${battle.name} ${battleDate}`
              : `Battle of ${battle.name}`}
          </h1>
        </div>

        <div className="battle__belligerents">
          <div className="belligerent__container">
            <h2>Commanders</h2>
            {battle.army_one.commanders.map(function (item, i) {
              return (
                <div key={i} className="commander">
                  <img
                    loading="lazy"
                    className="commander-flag"
                    src={item[1]}
                    alt=""
                  />
                  <p>{item[0]}</p>
                </div>
              );
            })}
          </div>
          <div className="belligerent__container">
            <h2>Commanders</h2>
            {battle.army_two.commanders.map(function (item, i) {
              return (
                <div key={i} className="commander">
                  <img
                    loading="lazy"
                    className="commander-flag"
                    src={item[1]}
                    alt=""
                  />
                  <p>{item[0]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="battle__image-container">
          <img
            loading="lazy"
            className="battle-pic"
            src={battle.image_url}
            alt=""
          />
        </div>

        <div className="battle__statistics">
          {/* date - location - forces - casualties - guns */}
          {/* add location field to battles */}
          <BattleStatUnit
            iconComponent={GiCalendar}
            title="DATE"
            value={battle.date}
          />

          <BattleStatUnit
            iconComponent={GiPositionMarker}
            title="LOCATION"
            value={battle.location}
          />

          <BattleStatUnit
            iconComponent={GiCannon}
            title="GUNS"
            value={`${
              armyOneStrength.guns !== 0
                ? ` ${armyOneStrength.guns}`
                : "   unknown"
            } vs ${
              armyTwoStrength.guns !== 0
                ? `   ${armyTwoStrength.guns}`
                : "   unknown"
            }`}
          />

          <BattleStatUnit
            iconComponent={GiFirstAidKit}
            title="CASUALTIES"
            value={`${armyOneCasualties || "Unknown"} vs ${
              armyTwoCasualties || "Unknown"
            }`}
          />

          <BattleStatUnit
            iconComponent={GiRallyTheTroops}
            title="FORCES"
            value={`${
              armyOneStrength.number !== 0
                ? ` ${armyOneStrength.number}`
                : "   unknown"
            } vs ${
              armyTwoStrength.number !== 0
                ? `   ${armyTwoStrength.number}`
                : "   unknown"
            }`}
          />

          <BattleStatUnit
            iconComponent={GiMagnifyingGlass}
            title="RESULT"
            value={battle.result}
          />
        </div>

        <div className="battle__text-container">
          <div className="battle__prelude">
            <SpringFade>
              <div className="prelude">
                <h2>Prelude</h2>
                <p>{battle.prelude}</p>
              </div>
            </SpringFade>
          </div>
          <div className="battle-text">
            <SpringFade>
              <div className="description">
                <h2>Battle</h2>
                <p>{battle.description}</p>
              </div>
            </SpringFade>
          </div>
        </div>

        <div className="battle__extras-container">
          <div className="quiz-wrapper">
            {/* RENDER QUIZ IF BATTLE NOT COMPLETED */}
            {!battle.completed ? (
              <Quiz
                battleId={battle.id}
                uid={user.userId}
                questionDataArr={questionDataArr as QuestionData[]}
              />
            ) : null}
          </div>

          <div className="battle__video-container">
            {battle.completed ? (
              <>
                <iframe
                  loading="lazy"
                  width="560"
                  height="560"
                  src={battle.video_url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </>
            ) : null}
          </div>
        </div>

        <></>
      </div>
    </div>
  );
}

export default BattleDetail;
