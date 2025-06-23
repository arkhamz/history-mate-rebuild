import { Link } from "react-router";
import "./Footer.css";

export default function Footer() {
  return (
    <header className="home-footer">
      {/* <div className="footer-logo-container">
        <img className="footer-logo" src={`${test}`} alt="" />
      </div> */}
      <div className="internal">
        <Link to="#">Thirty Years' War</Link>
        <Link to="#">Mongol Conquest</Link>
        <Link to="#">Zulu War</Link>
      </div>
      {/* <div className="social">
        <AiFillFacebook />
        <AiFillTwitterCircle />
        <AiFillInstagram />
      </div> */}
    </header>
  );
}
