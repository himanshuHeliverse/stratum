import React from "react";
import styled from "styled-components";
import {
  Tag2,
  P2,
  PreContainer,
  Tagline1,
  Header1,
  Paragraph1,
} from "../fonts";

const HeaderBlocks = ({ paragraphWithStrongStart, HeadingAndText }) => {
  return (
    <MainBackgroundWrapper>
      <InnerDiv>
        <SectionDiv>
          {HeadingAndText.map((value) => (
            <TitleTextHolder key={value.subheading}>
              <Tagline1>{value.subheading}</Tagline1>
              <Header1>{value.heading}</Header1>
            </TitleTextHolder>
          ))}
          <TextHolder>
            <Paragraph1>
              <strong>{paragraphWithStrongStart.StrongText}</strong>
              {" " + paragraphWithStrongStart.paragraph}
            </Paragraph1>
          </TextHolder>
        </SectionDiv>
      </InnerDiv>
    </MainBackgroundWrapper>
  );
};

export default HeaderBlocks;
const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 500px;
`;
const TitleTextHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 50%;
  @media (max-width: 980px) {
    width: 100%;
  }
`;
const TextHolder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  align-items: center;
  text-align: center;
  @media (max-width: 980px) {
    width: 100%;
  }
`;
const InnerDiv = styled.div`
  width: 95%;
  max-width: 2000px;
  display: flex;
  flex-direction: ${({ invert }) => (invert ? "row-reverse" : "row")};
  justify-content: space-between;
  align-items: center;
  /* margin-left: ${({ shiftLeft }) => (shiftLeft ? "-320px" : "0px")}; */
  @media (max-width: 980px) {
    width: 86.8%;
    flex-direction: column;
    margin: 0;
  }
`;

const MainBackgroundWrapper = styled.div`
  display: flex;
  min-height: max-content;
  flex-direction: column;
  padding-top: 350px;
  padding-bottom: 500px;
  align-items: center;
  background: #e6e6e6;
  @media (max-width: 980px) {
    padding-top: 200px;
  }
`;
