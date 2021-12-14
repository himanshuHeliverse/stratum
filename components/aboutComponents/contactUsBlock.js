import React from "react";
import styled from "styled-components";
import { H3, Header2_5, P1, Paragraph1, PreContainer } from "../fonts";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";

const ContactUsBlock = ({
  title,
  paragraph,
  buttonText,
  openModal,
  toggleModal,
}) => {
  return (
    <MainBackgroundWrapper>
      <InnerDiv>
        <InnerGapDiv>
          <Header2_5 black>{title}</Header2_5>
          <PreContainer style={{ textAlign: "center" }}>
            <Paragraph1>{paragraph} </Paragraph1>
          </PreContainer>
        </InnerGapDiv>
        <BlackButton
          onClick={() => {
            toggleModal(true);
          }}
        >
          <BlackButtonText>{buttonText}</BlackButtonText>
        </BlackButton>
      </InnerDiv>
    </MainBackgroundWrapper>
  );
};

export default ContactUsBlock;

const InnerGapDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledH3 = styled(H3)`
  color: black;
`;

const TextBlock = styled.p`
  margin: 0;
  padding: 0;
  font-family: Object Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 0.05em;
  color: #000000;
  text-align: center;
  padding: 20px 0 20px 0;
  @media (max-width: 980px) {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    /* or 150% */

    letter-spacing: 0.05em;

    color: #29292b;
  }
`;
const InnerDiv = styled.div`
  width: 800px;
  max-width: 86.68%;
  display: flex;
  height: 320px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 980px) {
    width: 600px;
    height: max-content;
  }
`;

const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 180px;
  padding-bottom: 180px;
  align-items: center;
  @media (max-width: 980px) {
    padding-top: 100px;
    padding-bottom: 40px;
  }
`;
