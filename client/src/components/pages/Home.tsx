import React, { MouseEventHandler, useState } from "react";
import "./Home.css";
import { RouteComponentProps } from "@reach/router";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo_blue from "../../images/blue_name_logo.png";
import logo_red from "../../images/red_name_logo.png";
import logo_white from "../../images/white_name_logo.png";
import fractal_example1 from "../../images/fractal_example1.png";
import fractal_example2 from "../../images/fractal_example2.png";
import fractal_example3 from "../../images/fractal_example3.png";
import fractal_example4 from "../../images/fractal_example4.png";
import fractal_example5 from "../../images/fractal_example5.png";
import fractal_example6 from "../../images/fractal_example6.png";
import logo_shadow from "../../images/logo_shadow.png";
import { Link } from "@reach/router";

import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
const GOOGLE_CLIENT_ID = "345260256672-4hgaortvbdeb0t3mb8iuphdvehej9m14.apps.googleusercontent.com";

// type HomeProps = RouteComponentProps;

type HomeProps = RouteComponentProps & {
  userId: String;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#3454c5",
      contrastText: "#ffffff",
    },
    action: {
      hover: "#6987db",
      disabledBackground: "rgba(0,0,0,0.20)",
      disabled: "#444444",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 24,
    button: {
      fontWeight: 700,
    },
  },
});

const Home = (props: HomeProps) => {
  return (
    <div className="home-background">
      <Container fluid>
        <Row>
          <Col>
            <Carousel fade>
              <Carousel.Item>
                <img className="d-block w-100" src={fractal_example1} alt="First slide" />
                <Carousel.Caption>
                  <div className="centerImage">
                    <img className="navbar-logo-icon" height="125" width="700" src={logo_shadow} />
                    <h3 className="home-text">Create Fractal Art in just a few steps.</h3>
                    <p className="home-text">Log in to turn your imagination into reality.</p>
                    <div>
                      {props.userId ? (
                        <ThemeProvider theme={theme}>
                          <Link to="/create" className="link-text">
                            <Button variant="contained" size="large">
                              START CREATING
                            </Button>
                          </Link>
                        </ThemeProvider>
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
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" src={fractal_example2} alt="Second slide" />
                <Carousel.Caption>
                  <div className="centerImage">
                    <img className="navbar-logo-icon" height="125" width="700" src={logo_shadow} />
                    <h3 className="home-text">Create Fractal Art in just a few steps.</h3>
                    <p className="home-text">Log in to turn your imagination into reality.</p>
                    <div>
                      {props.userId ? (
                        <ThemeProvider theme={theme}>
                          <Link to="/create" className="link-text">
                            <Button variant="contained" size="large">
                              START CREATING
                            </Button>
                          </Link>
                        </ThemeProvider>
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
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" src={fractal_example3} alt="Third slide" />
                <Carousel.Caption>
                  <div className="centerImage">
                    <img className="navbar-logo-icon" height="125" width="700" src={logo_shadow} />
                    <h3 className="home-text">Create Fractal Art in just a few steps.</h3>
                    <p className="home-text">Log in to turn your imagination into reality.</p>
                    <div>
                      {props.userId ? (
                        <ThemeProvider theme={theme}>
                          <Link to="/create" className="link-text">
                            <Button variant="contained" size="large">
                              START CREATING
                            </Button>
                          </Link>
                        </ThemeProvider>
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
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" src={fractal_example4} alt="Forth slide" />
                <Carousel.Caption>
                  <div className="centerImage">
                    <img className="navbar-logo-icon" height="125" width="700" src={logo_shadow} />
                    <h3 className="home-text">Create Fractal Art in just a few steps.</h3>
                    <p className="home-text">Log in to turn your imagination into reality.</p>
                    <div>
                      {props.userId ? (
                        <ThemeProvider theme={theme}>
                          <Link to="/create" className="link-text">
                            <Button variant="contained" size="large">
                              START CREATING
                            </Button>
                          </Link>
                        </ThemeProvider>
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
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" src={fractal_example5} alt="Fifth slide" />
                <Carousel.Caption>
                  <div className="centerImage">
                    <img className="navbar-logo-icon" height="125" width="700" src={logo_shadow} />
                    <h3 className="home-text">Create Fractal Art in just a few steps.</h3>
                    <p className="home-text">Log in to turn your imagination into reality.</p>
                    <div>
                      {props.userId ? (
                        <ThemeProvider theme={theme}>
                          <Link to="/create" className="link-text">
                            <Button variant="contained" size="large">
                              START CREATING
                            </Button>
                          </Link>
                        </ThemeProvider>
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
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img className="d-block w-100" src={fractal_example6} alt="Sixth slide" />
                <Carousel.Caption>
                  <div className="centerImage">
                    <img className="navbar-logo-icon" height="125" width="700" src={logo_shadow} />
                    <h3 className="home-text">Create Fractal Art in just a few steps.</h3>
                    <p className="home-text">Log in to turn your imagination into reality.</p>
                    <div>
                      {props.userId ? (
                        <ThemeProvider theme={theme}>
                          <Link to="/create" className="link-text">
                            <Button variant="contained" size="large">
                              START CREATING
                            </Button>
                          </Link>
                        </ThemeProvider>
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
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
