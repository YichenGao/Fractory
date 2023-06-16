import React, { useState, useEffect } from "react";
import { Router, Redirect, globalHistory, redirectTo } from "@reach/router";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.css";

import "./App.css";
import NavBar from "./modules/NavBar";
import ArtCreator from "./pages/ArtCreator";
import Dashboard from "./pages/Dashboard";
import Dtest from "./pages/Dtest";
import FractalCreator from "./pages/FractalCreator";
import PixiTest from "./pages/PixiTest";
import Mode from "./pages/Mode";

const App = () => {
  const [userId, setUserId] = useState<String>(undefined);

  useEffect(() => {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // They are registed in the database and currently logged in.
          setUserId(user._id);
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
        })
      );
  }, []);

  const handleLogin = (res: GoogleLoginResponse) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user: User) => {
      setUserId(user._id);
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  // NOTE:
  // All the pages need to have the props extended via RouteComponentProps for @reach/router to work properly. Please use the Skeleton as an example.
  // const [isAtHome, setIsAtHome] = useState<boolean>(true);

  const useLocation = () => {
    const initialState = {
      location: globalHistory.location,
      navigate: globalHistory.navigate,
    };

    const [state, setState] = useState(initialState);
    useEffect(() => {
      const removeListener = globalHistory.listen((params) => {
        const { location } = params;
        const newState = Object.assign({}, initialState, { location });
        setState(newState);
      });
      return () => {
        removeListener();
      };
    }, []);

    return state;
  };

  const currentLocation = useLocation().location.pathname;
  if (!userId && currentLocation !== "/") {
    return <Redirect to="/" noThrow />;
  }

  return (
    <div className="App-container">
      {userId ? (
        <div className="App-navbar">
          <NavBar
            handleLogin={
              handleLogin as (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
            }
            handleLogout={handleLogout}
            userId={userId}
          />
        </div>
      ) : (
        <></>
      )}
      <Router className="App-content">
        <Home
          path="/"
          handleLogin={
            handleLogin as (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void
          }
          handleLogout={handleLogout}
          userId={userId}
        />

        <Mode path="/create" />
        <ArtCreator path="/create/simple_fractal_creator/*" userId={userId} />
        <FractalCreator path="/create/advanced_fractal_creator/" is_new_project={false} />

        <Dashboard path="/dashboard" userId={userId} />

        <Dtest default={true} />
        <FractalCreator path="/create" is_new_project={false} />
        {/* <PixiTest path="/pixitest" /> */}
      </Router>
    </div>
  );
};

export default App;
