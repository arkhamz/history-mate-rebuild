import { useNavigate } from "react-router";
import SpringFade from "../components/spring-fade/springFade";
import "./Home.css";
import Footer from "../components/footer/Footer";

function Home() {
  const navigator = useNavigate();

  function handleClick() {
    navigator("/signup");
  }

  return (
    <>
      <div className="home-container outer-wrapper">
        <SpringFade>
          <div className="home-content">
            <h2 className="home-title"> Explore Historical Battles & Events</h2>
            <p className="home-subtitle">
              An interactive journey through history
            </p>
            <button onClick={handleClick} className="home-btn">
              Thirty Years' War (1618-1648)
            </button>
          </div>
        </SpringFade>
      </div>
      <Footer />
    </>
  );
}

export default Home;
