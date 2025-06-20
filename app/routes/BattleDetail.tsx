import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  GiCannon,
  GiPikeman,
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
  useGetAllUserBattlesQuery,
  useGetBattleQuestionsAndAnswersQuery,
} from "../services.ts/api";
import type { Battle, QuestionData } from "../types/types";
import { selectUser } from "~/store/user/userSelectors";
import { useEffect } from "react";
import Spinner from "~/components/spinner/Spinner";

function BattleDetail() {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const {
    data: battles,
    isLoading,
    error,
  } = useGetAllUserBattlesQuery(user?.userId ?? "", { skip: !user?.userId });

  const {
    data: questionDataArr,
    isLoading: questionDataLoading,
    error: questionDataError,
  } = useGetBattleQuestionsAndAnswersQuery(id ?? "1", { skip: !id });

  const battle = battles?.find((i: Battle) => i.id == +id!);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!id || !battle) {
      navigate("/atlas");
    }
  }, [user, id, battle, navigate]);

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
  const battlePrelude = battle.prelude;
  const battleDescription = battle.description;
  const battleResult = battle && battle.result;
  const battleTitle = battle && battle.name;
  const battleDate = battle.date ? `- ${battle.date}` : "";

  return (
    <div className="battle__container outer-wrapper">
      <div className="inner-wrapper">
        <div className="battle__title">
          <h1>
            {battleTitle.startsWith("Siege")
              ? `${battleTitle} ${battleDate}`
              : `Battle of ${battleTitle}`}
          </h1>
        </div>

        <div className="battle__belligerents">
          <div className="beligerents-1">
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
          <div className="beligerents-2">
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

          <div className="stat-unit">
            <div className="stat-unit-icon">
              <GiCalendar />
            </div>
            <div className="stat-unit-text">
              <div className="stat-unit-title">DATE</div>
              <div className="stat-unit-value">{battle.date}</div>
            </div>
          </div>

          <div className="stat-unit">
            <div className="stat-unit-icon">
              <GiPositionMarker />
            </div>
            <div className="stat-unit-text">
              <div className="stat-unit-title">LOCATION</div>
              <div className="stat-unit-value">{"place"}</div>
            </div>
          </div>

          <div className="stat-unit">
            <div className="stat-unit-icon">
              {" "}
              <GiCannon />
            </div>
            <div className="stat-unit-text">
              <div className="stat-unit-title">GUNS</div>
              <div className="stat-unit-value">
                {armyOneStrength.guns !== 0
                  ? ` ${armyOneStrength.guns}`
                  : "   unknown"}{" "}
                vs{" "}
                {armyTwoStrength.guns !== 0
                  ? `   ${armyTwoStrength.guns}`
                  : "   unknown"}{" "}
              </div>
            </div>
          </div>

          <div className="stat-unit">
            <div className="stat-unit-icon">
              <GiFirstAidKit />{" "}
            </div>
            <div className="stat-unit-text">
              <div className="stat-unit-title">CASUALTIES</div>
              <div className="stat-unit-value">{`${
                armyOneCasualties || "Unknown"
              } vs ${armyTwoCasualties || "Unknown"} `}</div>
            </div>
          </div>

          <div className="stat-unit">
            <div className="stat-unit-icon">
              <GiRallyTheTroops />
            </div>
            <div className="stat-unit-text">
              <div className="stat-unit-title">FORCES</div>
              <div className="stat-unit-value">
                {armyOneStrength.number !== 0
                  ? ` ${armyOneStrength.number}`
                  : "   unknown"}{" "}
                vs{" "}
                {armyTwoStrength.number !== 0
                  ? `   ${armyTwoStrength.number}`
                  : "   unknown"}{" "}
              </div>
            </div>
          </div>
          <div className="stat-unit">
            <div className="stat-unit-icon">
              <GiMagnifyingGlass />
            </div>
            <div className="stat-unit-text">
              <div className="stat-unit-title">RESULT</div>
              <div className="stat-unit-value">{battleResult}</div>
            </div>
          </div>
        </div>

        <div className="battle__text-container">
          <div className="battle__prelude">
            <SpringFade>
              <div className="prelude">
                <h2>Prelude</h2>
                <p>{battlePrelude}</p>
              </div>
            </SpringFade>
          </div>
          <div className="battle-text">
            <SpringFade>
              <div className="description">
                <h2>Battle</h2>
                <p>{battleDescription}</p>
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
