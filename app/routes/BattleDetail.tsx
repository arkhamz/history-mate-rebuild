import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  GiCannon,
  GiPikeman,
  GiArmBandage,
  GiDeathSkull,
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
  const armyOneCasualties = battle.army_one.casualties;
  const armyTwoStrength = battle.army_two.strength;
  const armyTwoCasualties = battle.army_two.casualties;
  const battlePrelude = battle.prelude;
  const battleDescription = battle.description;
  const battleResult = battle && battle.result;
  const battleTitle = battle && battle.name;

  return (
    <>
      {battle && (
        <div className="battle-container outer-wrapper">
          {/* render page content if progress exists & user progress is greater than or equal to battle Id */}
          {/* greater than means that the user has already unlocked it */}
          <>
            <div className="beligerents-1">
              {/* <h2>Imperial-Allied Forces</h2> */}
              {battle.army_one?.beligerents.map(function (item, i) {
                return (
                  <div className="beligerent" key={i}>
                    <img
                      loading="lazy"
                      className="beligerent-flag"
                      src={item[1]}
                      alt=""
                    />
                    <h3>{item[0]}</h3>
                  </div>
                );
              })}
            </div>

            <div className="commanders-1">
              <h2>Commanders</h2>
              {/* ARMY ONE */}
              {battle.army_one?.commanders.map(function (item, i) {
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

            <div className="stats-1">
              <h2>Battle Statistics</h2>
              <h3>
                <GiPikeman /> -
                {armyOneStrength.number !== 0
                  ? ` ${armyOneStrength.number}`
                  : "   unknown"}
              </h3>
              <h3>
                <GiCannon /> -
                {armyOneStrength.guns !== 0
                  ? `   ${armyOneStrength.guns}`
                  : "   unknown"}
              </h3>
              <div className="casualty">
                <h3>
                  <GiDeathSkull /> / <GiArmBandage /> -
                </h3>
                {armyOneCasualties && `${armyOneCasualties}`}
              </div>
            </div>

            {/* ---------------BATTLE CONTENT - title,picture,date */}
            {/* <div className="content"> */}
            <SpringFade className="content">
              <h1>
                {battleTitle.startsWith("Siege")
                  ? `${battleTitle} - ${battle.date}`
                  : `Battle of ${battleTitle}`}
              </h1>
              <h2>{battle.date}</h2>
              <img
                loading="lazy"
                className="battle-pic"
                src={battle.image_url}
                alt=""
              />
              <h2 className="battle-result">Result: {battleResult}</h2>
            </SpringFade>
            {/* </div> */}

            <div className="battle-detail">
              <SpringFade>
                <div className="prelude">
                  <h2>Prelude</h2>
                  <p>{battlePrelude}</p>
                </div>
              </SpringFade>

              <SpringFade>
                <div className="description">
                  <h2>Battle Summary</h2>
                  <p>{battleDescription}</p>
                </div>
              </SpringFade>
            </div>

            {/* ARMY TWO------------------------------------ */}

            <div className="beligerents-2">
              {/* <h2>Anti-Imperial Forces</h2> */}
              {/* <h2>Beligerent</h2> */}
              {/* ARMY TWO */}
              {battle.army_two.beligerents.map(function (item, i) {
                return (
                  <div className="beligerent" key={i}>
                    <img
                      loading="lazy"
                      className="beligerent-flag"
                      src={item[1]}
                      alt=""
                    />

                    <h3>{item[0]}</h3>
                  </div>
                );
              })}
            </div>

            <div className="commanders-2">
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

            <div className="stats-2">
              <h2>Battle Statistics</h2>
              <h3>
                <GiPikeman /> -
                {armyTwoStrength.number !== 0
                  ? ` ${armyTwoStrength.number}`
                  : "   unknown"}
              </h3>
              <h3>
                <GiCannon /> -
                {armyTwoStrength.guns !== 0
                  ? `   ${armyTwoStrength.guns}`
                  : "   unknown"}
              </h3>
              <div className="casualty">
                <h3>
                  <GiDeathSkull /> / <GiArmBandage /> -
                </h3>
                {armyTwoCasualties && ` ${armyTwoCasualties}`}
              </div>
            </div>

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

            <div className="video">
              {battle.completed ? (
                <>
                  <iframe
                    loading="lazy"
                    width="560"
                    height="315"
                    src={battle.video_url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </>
              ) : null}
            </div>
          </>
        </div>
      )}
    </>
  );
}

export default BattleDetail;
