import "./Login.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LOGIN } from "../store/user/userSlice";
import { SET_MESSAGE } from "../store/appState/appStateSlice";
import { useLoginMutation } from "../services.ts/api";
import { selectUser } from "~/store/user/userSelectors";

function Login() {
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

  const [login, { isLoading, error }] = useLoginMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const result = await login({ username, password }).unwrap();

      const userData = {
        username: result.username,
        userId: result.userId,
      };

      dispatch(LOGIN(userData));
      //clear fields
      setUsername("");
      setPassword("");

      navigator("/atlas");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="login outer-wrapper">
      <div className="login__inner-wrapper inner-wrapper ">
        <div className="login__title">
          <h1>Login</h1>
        </div>

        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-wrapper">
            <label htmlFor="login__username">Username:</label>
            <input
              autoComplete="false"
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="login__input-wrapper">
            <label htmlFor="login-password">Password:</label>
            <input
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
            />
          </div>

          <div className="login__button-wrapper">
            <button className="primary">Login</button>
            {error ? <p>Login error</p> : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
