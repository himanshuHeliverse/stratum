import React from "react";
import styled from "styled-components";
import CloseButton from "../../static/images/cross.svg";
import { H2, Tag5, Tag2 } from "../fonts";
import Cookies from "js-cookie";
import validator from "validator";

const ContactUsPopup = ({ enabled, setEnabled, customMessage }) => {
  const [opacity, setOpacity] = React.useState(0);

  const [data, setData] = React.useState({
    email: "",
    name: "",
    message: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [confirmationPassword, setConfirmationPassword] = React.useState("");
  const [error, setError] = React.useState({});

  const [validationWarning, setValidationWarning] = React.useState(false);
  const [validationWarningMessage, setValidationWarningMessage] =
    React.useState(false);
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidName, setInvalidName] = React.useState(false);
  const [invalidMessage, setInvalidMessage] = React.useState(false);

  const setValidationWarningTimed = (message) => {
    if (message === "Email Address") {
      setValidationWarning(true);
      setInvalidEmail(true);
      setValidationWarningMessage("Email Address Invalid");
    } else if (message === "Name Empty") {
      setInvalidName(true);
      setValidationWarning(true);
      setValidationWarningMessage("Please Enter a Valid Name");
    } else if (message === "Message Empty") {
      setInvalidMessage(true);
      setValidationWarning(true);
      setValidationWarningMessage("Please Enter a Message");
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
        <ModalContentDiv>
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
          <HeadingHolder>
            <H2>Contact Us</H2>
            <Tag5>{customMessage}</Tag5>
          </HeadingHolder>
          {!success ? (
            <>
              <UpperSectionDiv>
                <FieldHolderDiv>
                  <Tag2>Name</Tag2>
                  <StyledInput
                    invalid={invalidName}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                      setInvalidName(false);
                    }}
                    value={data.name}
                    type="Name"
                    name="Name"
                    placeholder="Enter your Name"
                  />
                </FieldHolderDiv>

                <FieldHolderDiv>
                  <Tag2>Email</Tag2>
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

                <FieldHolderDiv>
                  <Tag2>Message</Tag2>
                  <StyledTextArea
                    invalid={invalidMessage}
                    onChange={(e) => {
                      setData({ ...data, message: e.target.value });
                      setInvalidMessage(false);
                    }}
                    value={data.message}
                    type="text"
                  />
                </FieldHolderDiv>
              </UpperSectionDiv>
              <div style={{ height: "0px" }}>
                {validationWarning ? (
                  <MiniText style={{ color: "red", marginTop: "-8px" }}>
                    {validationWarningMessage}
                  </MiniText>
                ) : null}
              </div>
              <MidSectionDiv></MidSectionDiv>

              <LowerSectionDiv>
                <ModalStyledButton
                  onClick={async () => {
                    if (!validator.isEmail(data.email)) {
                      setValidationWarningTimed("Email Address");
                    } else if (data.name === null || data.name === "") {
                      setValidationWarningTimed("Name Empty");
                    } else if (data.message === null || data.message === "") {
                      setValidationWarningTimed("Message Empty");
                    } else {
                      const userToken = Cookies.get("token");

                      const response = await fetch(
                        `${process.env.STRAPI_URL}/contact-uses`,
                        {
                          method: "POST",
                          headers: userToken && {
                            Authorization: `Bearer ${userToken}`,
                          },
                          body: JSON.stringify({
                            name: data.name,
                            message: data.message,
                            email: data.email,
                          }),
                        }
                      );
                      if (response?.ok) {
                        setSuccess(true);
                      }
                    }
                  }}
                  color="email"
                  disabled={loading}
                >
                  {loading ? "Loading.." : "Submit"}
                </ModalStyledButton>
              </LowerSectionDiv>
            </>
          ) : (
            <Tag2>Thank you, we will contact you soon</Tag2>
          )}
        </ModalContentDiv>
      </ModalMainDiv>
    </>
  );
};

export default ContactUsPopup;

const ModalContentDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 3% 2% 3% 2%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  @media (max-width: 980px) {
    width: 100vw;
    padding: 0;
  }
`;

const CrossHolderDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  @media (max-width: 980px) {
    width: 90%;
    margin-top: 12vw;
  }
`;

const HeadingHolder = styled.div`
  padding-bottom: ${({ paddingLevel }) => (paddingLevel ? "10px" : "60px")};
  display: flex;
  gap:20px;
  width:80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: 980px) {
    padding-bottom: 0;
  }
`;

const SubtitleSmall = styled(Tag2)`
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

const MiniText = styled(Tag2)`
  font-size: 11px !important;
  color: #999999;
  cursor: ${({ active }) => (active ? "pointer" : "arrow")};

  &:hover {
    color: ${({ active }) => (active ? "#000000" : "#999999")};
  }
`;

const ModalOverlayDiv = styled.div`
  position: fixed;
  z-index: 102;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(72, 72, 72, 0.8);
  opacity: ${({ opacityLevel }) => opacityLevel};
  transition: all 0.3s;
  -ms-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  @media (max-width: 980px) {
    display: none;
  }
`;

const ModalMainDiv = styled.div`
  z-index: 102;
  position: fixed;
  top: 50vh;
  margin-left: -350px;
  left: 50vw;
  margin-top: -350px;
  opacity: ${({ opacityLevel }) => opacityLevel};
  background-color: white;
  transition: all 0.3s;
  -ms-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  width: 700px;
  height: 750px;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  @media (max-width: 980px) {
    width: 100vw;
    height: 80vh;
    top: 0;
    margin: 0;
    left: 0;
    width: 100%;
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
  gap: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const UpperSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  justify-content: center;
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

const StyledTextArea = styled.textarea`
  resize: none;
  height: 100px;
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  /* border: none; */
  outline: none;
  width: 100%;
  border: ${({ invalid }) => (invalid ? "1px solid red" : "1px solid #999999")};

  color: #999999;
  &:focus {
    color: #000000;
    border: 1px solid #000000;

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
  padding-top: 10px;
  margin-left: -4px;

  @media (max-width: 380px) {
    height: 70px;
  }
`;
