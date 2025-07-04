import "./Signup.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSignupMutation } from "../services.ts/api";
import { LOGIN } from "../store/user/userSlice";
import { SET_MESSAGE } from "../store/appState/appStateSlice";
import { selectUser } from "~/store/user/userSelectors";

function Signup() {
  const user = useSelector(selectUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    if (user) {
      navigator("/atlas");
    }
  }, [user]);

  const [signup, { isLoading, error }] = useSignupMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await signup({ username, password }).unwrap();
      const userData = {
        username: result.username,
        userId: result.userId,
      };
      //update state
      dispatch(LOGIN(userData));
      //clear fields
      setUsername("");
      setPassword("");

      return navigator("/atlas");
    } catch (error) {
      console.error(error);
      dispatch(SET_MESSAGE("Signup failed, please try again later."));
    }
  }

  return (
    <div className="signup outer-wrapper">
      <div className="signup__inner-wrapper inner-wrapper">
        <div className="signup__title">
          <h1 className="signup-title">Create an Account</h1>
        </div>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="signup__input-wrapper">
            <label htmlFor="signup-username">Username:</label>
            <input
              id="signup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              autoComplete="false"
            />
          </div>

          <div className="signup__input-wrapper">
            <label htmlFor="signup-password">Password:</label>
            <input
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>

          <div className="signup__button-wrapper">
            <button className="primary">Signup</button>
            {error ? <p>Signup failed</p> : null}
            <Link to="/login">
              Already have an account? <span>Login</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
