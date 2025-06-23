import "./Navbar.css";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import navlogo from "../../assets/nav-logo.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
import { useGetBattlesCountQuery, useLogoutMutation } from "~/services.ts/api";
import { statusIcons, titler } from "utils";
import { selectUser } from "~/store/user/userSelectors";
import { LOGOUT } from "~/store/user/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [logout, { isLoading: logoutIsLoading, error: logoutError }] =
    useLogoutMutation();

  const {
    data: battlesData,
    error: battleError,
    isLoading: battlesLoading,
  } = useGetBattlesCountQuery();

  const progress = battlesData?.battles
    ? Math.max(...battlesData.battles.map((b) => b.battle_id))
    : null;
  // const title = progress && progress > 0 ? titler(progress) : "";

  const [menuOpen, setMenuOpen] = useState(false);

  async function handleClick() {
    try {
      const result = await logout().unwrap();
      dispatch(LOGOUT());
    } catch (error) {
      console.log(error);
    }
  }

  function handleMenuClick() {
    setMenuOpen(!menuOpen);
  }

  // Code for closing the collapsible <ul> when you click on a link OR LOGOUT BUTTON
  function handleLinkClick(e: React.MouseEvent<HTMLUListElement>) {
    const element = e.target as HTMLElement;
    if (element.tagName === "A" || element.tagName === "BUTTON") {
      if (menuOpen) {
        setMenuOpen(false);
      }
    }
  }

  return (
    <nav className="navbar outer-wrapper">
      <div className="navbar__inner-wrapper inner-wrapper">
        <div className="navbar__logo-container">
          <img
            onClick={(e) => {
              user && navigate("/");
            }}
            className="navbar__logo"
            src={navlogo}
            alt="website-logo"
          />
        </div>

        <div className="navbar__main">
          <div className="navbar__user-info">
            {user && progress ? (
              <div className="navbar__progress">
                {statusIcons(progress).map(function (item, index, arr) {
                  return <item.Component key={index} className={item.class} />;
                })}
              </div>
            ) : null}
          </div>
          <ul
            onClick={handleLinkClick}
            className={menuOpen ? "navbar__links menu-open" : "navbar__links"}
          >
            <NavLink to="/atlas">
              <FaGlobeEurope
                onClick={() => setMenuOpen(false)}
                className="globe"
              />
            </NavLink>
            <NavLink to="/background">Background</NavLink>
            <NavLink to="/commanders">Commanders</NavLink>

            {!user ? <NavLink to="/signup">Signup</NavLink> : null}
            {!user ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <button className="primary" onClick={() => handleClick()}>
                Logout
              </button>
            )}
          </ul>
        </div>

        <div onClick={handleMenuClick} className="mobile-nav-toggler">
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
