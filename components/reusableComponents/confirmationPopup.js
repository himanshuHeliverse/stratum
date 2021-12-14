import React from "react";
import styled from "styled-components";
import { H4 } from "../fonts";

const ConfimrationPopup = ({ enabled, setEnabled, message }) => {
  const [opacity, setOpacity] = React.useState(0);

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
          <HeadingHolder>
            <H4 style={{ textAlign: "center" }}>{message}</H4>
          </HeadingHolder>
          <ModalStyledButton
            onClick={() => {
              setOpacity(0);
              setTimeout(() => {
                setEnabled(false);
              }, 300);
            }}
          >
            Close
          </ModalStyledButton>
        </ModalContentDiv>
      </ModalMainDiv>
    </>
  );
};

export default ConfimrationPopup;

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

const HeadingHolder = styled.div`
  padding-bottom: ${({ paddingLevel }) => (paddingLevel ? "10px" : "60px")};

  @media (max-width: 980px) {
    padding-bottom: 0;
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
  padding-top: 50px;
  width: 350px;
  height: 300px;
  position: fixed;
  top: 50vh;
  margin-left: -175px;
  left: 50vw;
  margin-top: -175px;
  opacity: ${({ opacityLevel }) => opacityLevel};
  background-color: white;
  transition: all 0.3s;
  -ms-transition: all 0.3s;
  -webkit-transition: all 0.3s;
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
