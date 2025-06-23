import "./MessageBox.css";
import { selectMessage } from "../../store/appState/appStateSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CLEAR_MESSAGE } from "~/store/appState/appStateSlice";

function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(CLEAR_MESSAGE());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (message) {
    return (
      <div className={"message-box message-active"}>
        {message && <p>{message}</p>}
      </div>
    );
  } else {
    return null;
  }
}

export default MessageBox;
