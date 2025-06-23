import "./Spinner.css";
import { GiCrossedSwords } from "react-icons/gi";

function Spinner() {
  return (
    <div className="spinner-container">
      <span className="sword sword-1">
        <GiCrossedSwords />
      </span>
      <span className="sword sword-2">
        <GiCrossedSwords />
      </span>
      <span className="sword sword-3">
        <GiCrossedSwords />
      </span>
    </div>
  );
}

export default Spinner;
