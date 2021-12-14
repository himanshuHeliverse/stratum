import React from "react";
import styled from "styled-components";
import CloseButton from "../../static/images/cross.svg";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { H2, P5 } from "../fonts";
import AppContext from "../context/appContext";
import validator from "validator";
import {
  login,
  registerUser,
  loginSocial,
  forgotPassword,
} from "../reusableComponents/auth";
import { saveCartToStrapi } from "../cartComponents/cartUtilities";

const AuthenticationPopup = ({ enabled, setEnabled }) => {
  const router = useRouter();
  const appContext = React.useContext(AppContext);

  const [opacity, setOpacity] = React.useState(0);
  const [registerMode, setRegisterMode] = React.useState(false);
  const [passwordResetMode, setPasswordResetMode] = React.useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = React.useState(-1);
  const [forgotPasswordFailureMessage, setForgotPasswordFailureMessage] =React.useState("");

  const [data, setData] = React.useState({
    email: "",
    Firstname: "",
    password: "",
    Lastname: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [confirmationPassword, setConfirmationPassword] = React.useState("");
  const [error, setError] = React.useState({});

  const [validationWarning, setValidationWarning] = React.useState(false);
  const [validationWarningMessage, setValidationWarningMessage] = React.useState(false);
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidFirstname, setInvalidFirstname] = React.useState(false);
  const [invalidLastname, setInvalidLastname] = React.useState(false);
  const [invalidPassword1, setInvalidPassword1] = React.useState(false);
  const [invalidPassword2, setInvalidPassword2] = React.useState(false);

  const setValidationWarningTimed = (message) => {
    if (message === "Email Address") {
      setValidationWarning(true);
      setInvalidEmail(true);
      setValidationWarningMessage("Email Address Invalid");
    } else if (message === "Firstname Empty") {
      setInvalidFirstname(true);
      setValidationWarning(true);
      setValidationWarningMessage("Please Enter a Firstname");
    }
    else if (message === "Lastname Empty") {
      setInvalidLastname(true);
      setValidationWarning(true);
      setValidationWarningMessage("Please Enter Lastname");
    }

    else if (message === "Passwords Match") {
      setInvalidPassword1(true);
      setInvalidPassword2(true);
      setValidationWarning(true);
      setValidationWarningMessage("Passwords Mismatched");
    } else if (message === "Password Short") {
      setInvalidPassword1(true);
      setValidationWarning(true);
      setValidationWarningMessage("Password is too short");
    } else if (message === "Please provide your password.") {
      setInvalidPassword1(true);
      setValidationWarning(true);
      setValidationWarningMessage("Invalid Password");
    } else if (message === "Identifier or password invalid.") {
      setInvalidEmail(true);
      setInvalidPassword1(true);
      setValidationWarning(true);
      setValidationWarningMessage("Invalid Password or Email");
    } else if (message === "Email is already taken.") {
      setInvalidEmail(true);
      setValidationWarning(true);
      setValidationWarningMessage("Email is already taken");
    } else {
      setValidationWarning(true);
      setValidationWarningMessage(message);
    }
    setTimeout(() => {
      disableValidationWarning();
    }, 8000);
  };

  const disableValidationWarning = () => {
    setValidationWarning(false);
    setValidationWarningMessage("");
  };

  React.useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  return (
    <>
      <ModalOverlayDiv
        onClick={() => {
          setOpacity(0);
          setTimeout(() => {
            setEnabled(false);
          }, 300);
        }}
        opacityLevel={opacity}
      />
      <ModalMainDiv opacityLevel={opacity}>
        <ModalLeftDiv>
          <StyledImg src={"/images/hero-bg.jpg"} />
        </ModalLeftDiv>
        <ModalRightDiv>
          <CrossHolderDiv>
            <CloseButton
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpacity(0);
                setTimeout(() => {
                  setEnabled(false);
                }, 300);
              }}
            />
          </CrossHolderDiv>
          <HeadingHolder paddingLevel={registerMode}>
            <H2 style={{ textAlign: "center" }}>
              {passwordResetMode
                ? "Reset Password"
                : registerMode
                  ? "Register"
                  : "Login"}
            </H2>
          </HeadingHolder>
          {forgotPasswordSuccess === 0 ? (
            <>
              <SubtitleSmall>{forgotPasswordFailureMessage}</SubtitleSmall>
              <ModalStyledButton
                color="email"
                disabled={loading}
                onClick={() => {
                  setForgotPasswordSuccess(-1);
                }}
              >
                {"Re-enter Email"}
              </ModalStyledButton>
            </>
          ) : forgotPasswordSuccess === 1 ? (
            <>
              <SubtitleSmall>
                Password Reset Email Sent Successfully
              </SubtitleSmall>
              <ModalStyledButton
                color="email"
                disabled={loading}
                onClick={() => {
                  setForgotPasswordSuccess(-1);
                }}
              >
                {"Go back to Login"}
              </ModalStyledButton>
            </>
          ) : (
            <>
              <UpperSectionDiv>
                {registerMode ? (<>
                  <FieldHolderDiv>
                    <P5>First name</P5>
                    <StyledInput invalid={invalidFirstname} onChange={(e) => { setData({ ...data, Firstname: e.target.value }); setInvalidFirstname(false); }}
                      value={data.Firstname}
                      type="text"
                      name="Firstname"
                      placeholder="Enter your Firstname"
                    />
                  </FieldHolderDiv>
                  <FieldHolderDiv>
                    <P5>Last name</P5>
                    <StyledInput invalid={invalidLastname} onChange={(e) => { setData({ ...data, Lastname: e.target.value }); setInvalidLastname(false); }}
                      value={data.Lastname}
                      type="text"
                      name="Lastname"
                      placeholder="Enter your Lastname"
                    />
                  </FieldHolderDiv>
                </>
                ) : null}
                <FieldHolderDiv>
                  <P5>Email</P5>
                  <StyledInput
                    invalid={invalidEmail}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                      setInvalidEmail(false);
                    }}
                    value={data.email}
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </FieldHolderDiv>
                {!passwordResetMode ? (
                  <FieldHolderDiv>
                    <P5>Password</P5>
                    <StyledInput
                      invalid={invalidPassword1}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                        setInvalidPassword1(false);
                      }}
                      value={data.password}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                  </FieldHolderDiv>
                ) : null}
                {registerMode ? (
                  <FieldHolderDiv>
                    <P5>Re-enter Password</P5>
                    <StyledInput
                      invalid={invalidPassword2}
                      onChange={(e) => {
                        setConfirmationPassword(e.target.value);
                        setInvalidPassword2(false);
                      }}
                      value={confirmationPassword}
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter your password"
                    />
                  </FieldHolderDiv>
                ) : null}
              </UpperSectionDiv>
              <div style={{ height: "0px" }}>
                {validationWarning ? (
                  <MiniText style={{ color: "red", marginTop: "-8px" }}>
                    {validationWarningMessage}
                  </MiniText>
                ) : null}
              </div>
              <MidSectionDiv>
                {passwordResetMode ? (
                  <MiniText
                    active
                    onClick={() => {
                      disableValidationWarning();
                      setPasswordResetMode(!passwordResetMode);
                    }}
                  >
                    Return to Login
                  </MiniText>
                ) : registerMode ? (
                  <MiniText
                    active
                    onClick={() => {
                      disableValidationWarning();
                      setRegisterMode(!registerMode);
                    }}
                  >
                    Already have an account? Sign in
                  </MiniText>
                ) : (
                  <>
                    <MiniText
                      onClick={() => {
                        disableValidationWarning();
                        setPasswordResetMode(!passwordResetMode);
                      }}
                      active
                    >
                      Forgot Password?
                    </MiniText>
                    <MiniText
                      active
                      onClick={() => {
                        setRegisterMode(!registerMode);
                      }}
                    >
                      New here? Create an account
                    </MiniText>
                  </>
                )}
              </MidSectionDiv>
              {passwordResetMode ? (
                <LowerSectionDiv>
                  <ModalStyledButton
                    color="email"
                    disabled={loading}
                    onClick={() => {
                      forgotPassword(data.email)
                        .then((res) => {
                          setForgotPasswordSuccess(1);
                        })
                        .catch((error) => {
                          setForgotPasswordFailureMessage(
                            error?.response?.data?.message[0]?.messages[0]
                              ?.message
                          );
                          setForgotPasswordSuccess(0);
                        });
                    }}
                  >
                    {"Send Reset Email"}
                  </ModalStyledButton>
                </LowerSectionDiv>
              ) : (
                <LowerSectionDiv>
                  <ModalStyledButton
                    color="email"
                    disabled={loading}
                    onClick={() => {
                      setInvalidEmail(false);
                      setInvalidPassword1(false);
                      setInvalidPassword2(false);
                      if (!validator.isEmail(data.email)) {
                        setValidationWarningTimed("Email Address");
                      } else {
                        setLoading(true);
                        disableValidationWarning();
                        if (registerMode) {
                          if (confirmationPassword !== data.password || data.Firstname === "") {
                            if (data.Firstname === "") {
                              setValidationWarningTimed("First name Empty");
                              setLoading(false);
                            }
                             else
                             {
                              setValidationWarningTimed("Passwords Match");
                              setLoading(false);
                              }
                          } 
                          else
                           {
                            registerUser(data.Firstname,data.Lastname, data.email, data.password)
                              .then((res) => {
                                appContext.setUser(res.data.user);
                                setOpacity(0);
                                setTimeout(() => {
                                  setEnabled(false);
                                }, 300);
                                setLoading(false);
                              })
                              .catch((error) => { 
                                setValidationWarningTimed(
                                  error?.response?.data?.message[0]?.messages[0]
                                    ?.message
                                );
                                setLoading(false);
                              });
                          }
                        } else {
                          login(data.email, data.password)
                            .then((res) => {
                              setLoading(false);
                              appContext.setUser(res.data.user);
                              if (appContext?.cart?.items?.length !== 0) {
                                saveCartToStrapi(appContext.cart.items);
                                setOpacity(0);
                                setTimeout(() => {
                                  setEnabled(false);
                                }, 300);
                              }
                              setOpacity(0);
                              setTimeout(() => {
                                setEnabled(false);
                              }, 300);
                            })
                            .catch((error) => {
                              setValidationWarningTimed(
                                error?.response?.data?.message[0]?.messages[0]
                                  ?.message
                              );
                              setLoading(false);
                            });
                        }
                      }
                    }}
                  >
                    {loading
                      ? "Loading.."
                      : registerMode
                        ? "Create Account with Email"
                        : "Login with Email"}
                  </ModalStyledButton>
                  <ModalStyledButton
                    color="google"
                    onClick={(e) => {
                      loginSocial("google")
                        .then((res) => {
                          setLoading(false);
                          appContext.setUser(res?.data?.user);
                          setOpacity(0);
                          setTimeout(() => {
                            setEnabled(false);
                          }, 300);
                        })
                        .catch((error) => {
                          setError(error?.response?.data);
                          setLoading(false);
                        });
                    }}
                  >
                    {registerMode
                      ? "Create Account with Google"
                      : "Login with Google"}
                  </ModalStyledButton>
                  <ModalStyledButton
                    color="facebook"
                    onClick={(e) => {
                      loginSocial("facebook")
                        .then((res) => {
                          setLoading(false);
                          appContext.setUser(res?.data?.user);
                          setOpacity(0);
                          setTimeout(() => {
                            setEnabled(false);
                          }, 300);
                        })
                        .catch((error) => {
                          setError(error?.response?.data);
                          setLoading(false);
                        });
                    }}
                  >
                    {registerMode
                      ? "Create Account with Facebook"
                      : "Login with Facebook"}
                  </ModalStyledButton>
                </LowerSectionDiv>
              )}
            </>
          )}
        </ModalRightDiv>
      </ModalMainDiv>
    </>
  );
};

export default AuthenticationPopup;

const StyledImg = styled.img``;

const ModalLeftDiv = styled.div`
  display: block;
  background: black;
  overflow: hidden;
  width: 50%;
  @media (max-width: 980px) {
    display: none;
  }
`;
const ModalRightDiv = styled.div`
  width: 50%;
  display: flex;
  padding-top: 1.5%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  @media (max-width: 980px) {
    width: 100vw;
    padding: 0;
  }
`;

const CrossHolderDiv = styled.div`
  display: flex;
  width: 100%;
  margin-right: 40px;
  justify-content: flex-end;
  @media (max-width: 980px) {
    width: 90%;
    margin-top: 12vw;
  }
`;

const HeadingHolder = styled.div`
  padding-bottom: ${({ paddingLevel }) => (paddingLevel ? "10px" : "60px")};

  @media (max-width: 980px) {
    padding-bottom: 0;
  }
`;

const SubtitleSmall = styled(P5)`
  /* padding-top: 6px; */
  font-size: 16px;
  @media (max-width: 980px) {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.02em;
    text-align: center;
  }
`;

const MiniText = styled(P5)`
  font-size: 11px !important;
  color: #999999;
  cursor: ${({ active }) => (active ? "pointer" : "arrow")};

  &:hover {
    color: ${({ active }) => (active ? "#000000" : "#999999")};
  }
`;

const ModalOverlayDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(72, 72, 72, 0.8);
  opacity: ${({ opacityLevel }) => opacityLevel};
  transition: all 0.3s;
  -ms-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  z-index: 5;
  @media (max-width: 980px) {
    display: none;
  }
`;

const ModalMainDiv = styled.div`
  z-index: 10;
  position: fixed;
  width: 950px;
  height: 700px;
  top: 55vh;
  margin-left: -500px;
  left: 50vw;
  margin-top: -400px;
  opacity: ${({ opacityLevel }) => opacityLevel};
  background-color: white;
  transition: all 0.3s;
  -ms-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  display: flex;
  flex-direction: row;
  @media (max-width: 980px) {
    top: 0;
    margin: -80px 0 0 0;
    left: 0;
    width: 100%;
    position: static;
  }
`;

const ModalStyledButton = styled.button`
  margin-bottom: 20px;
  width: 300px;
  @media (max-width: 980px) {
    width: 80vw;
  }
  height: 40px;
  cursor: pointer;
  border: none;
  ${({ color }) =>
    color === "facebook"
      ? `background-image: linear-gradient(
          to right,
          #503be6 0%, 
          #0202cc 50%, 
          #3c57d6 100%
        )`
      : color === "google"
        ? `background-image: linear-gradient( 
        to right, 
        #f54728 0%, 
        #d21313 50%, 
        #ec2b18 100% );`
        : `background-image: linear-gradient(
        to right,
        #5a5959 0%, 
        #3a3a3a 50%, 
        #585757 100%
  )`};

  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  background-size: 200% auto;
  color: white;
  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`;

const MidSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 80%;
`;
const LowerSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FieldHolderDiv = styled.div`
    width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;
const UpperSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const StyledInput = styled.input`
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  border: none;
  outline: none;
  height: 30px;
  width: 100%;
  border-bottom: ${({ invalid }) =>
    invalid ? "1px solid red" : "1px solid #999999"};

  color: #999999;
  &:focus {
    color: #000000;
    border-bottom: 1px solid #000000;

    &::placeholder {
      transition: all 0.5s;
      -moz-transition: all 0.5s;
      -webkit-transition: all 0.5s;
      -o-transition: all 0.5s;
      color: #000000;
    }
  }
  &::placeholder {
    color: #cccccc;
    font-size: 13px;
  }

  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.05em;
  padding-left: 10px;
  margin-left: -4px;
`;
