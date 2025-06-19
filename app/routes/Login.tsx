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
      dispatch(SET_MESSAGE("Signup failed, please try again later."));
    }
  }

  return (
    <div className="login-container outer-wrapper">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-username">
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
          />
        </div>
        <div className="listing-form-bedroom">
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
        </div>

        <div className="login-form-button">
          <button>Login</button>
          {error ? <p>Signup failed</p> : null}
        </div>
      </form>
    </div>
  );
}

export default Login;
