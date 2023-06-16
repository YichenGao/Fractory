import React, { MouseEventHandler, useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { Link } from "@reach/router";

import "./NavBar.css";
import logo_transparent from "../../images/white_name_logo.png";
import menu_icon from "../../images/menu_icon.svg";

const GOOGLE_CLIENT_ID = "345260256672-4hgaortvbdeb0t3mb8iuphdvehej9m14.apps.googleusercontent.com";

type NavBarProps = {
  userId: String;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};

const NavBar = (props: NavBarProps) => {
  // tracks width of window for responsive menu
  // mobile mode at < 840 px, menuShown becomes true
  const [menuShown, setMenuShown] = useState<boolean>(true);
  const onMenuClick = (event) => {
    setMenuShown(!menuShown);
  };
  window
    .matchMedia("(max-width:840px)")
    .addEventListener("change", (event: MediaQueryListEvent) => {
      setMenuShown(!event.matches);
    });

  return (
    <nav className="NavBar-container">
      <div className="NavBar-logoContainer">
        <Link to="/" className="NavBar-logo">
          <img className="NavBar-logoIcon" src={logo_transparent} />
        </Link>
      </div>
      <div className={`NavBar-list ${menuShown ? "" : "inactive"}`}>
        <Link to="/create" className="NavBar-linkText">
          Create
        </Link>
        <Link to="/dashboard" className="NavBar-linkText">
          My Artworks
        </Link>
      </div>
      <div className={`NavBar-login ${menuShown ? "" : "inactive"}`}>
        <div className="NavBar-linkText">
          {props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={props.handleLogout}
              onFailure={() => console.log(`Failed to logout.`)}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
          )}
        </div>
      </div>
      <div className="NavBar-menu" onClick={onMenuClick}>
        <img className="NavBar-menu-icon filter-white" src={menu_icon} />
      </div>
    </nav>
  );
};

export default NavBar;
