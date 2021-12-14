import React from "react";
import styled from "styled-components";
import {
  H3,
  Paragraph1,
  Tag2,
  PreContainer,
  Tagline1,
  HorizontalLine,
  Header2_5,
} from "../fonts";

const MainBlock = ({ title, paragraph }) => {
  return (
    <MainBackgroundWrapper>
      <InnerDiv>
        <ContentDiv>
          <Tagline1>ABOUT US</Tagline1>
          <HorizontalLine />
          <Header2_5 black>{title} </Header2_5>
          <PreContainer>
            <Paragraph1>{paragraph}</Paragraph1>
          </PreContainer>
        </ContentDiv>
      </InnerDiv>
    </MainBackgroundWrapper>
  );
};

export default MainBlock;

const StyledH3 = styled(H3)`
  text-align: left;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 52%;
  min-height: max-content;
  margin-left: 40px;
  gap: 10px;
  @media (max-width: 980px) {
    margin: 0;
    width: 100%;
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: inherit;
`;

const LineHorizontal = styled.div`
  display: block;
  margin: 15px 0 15px 0;
  border-bottom: 1px solid #ededf0;
  width: 140px;
`;

const MainBackgroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 240px;
  padding-bottom: 240px;
  align-items: center;
  @media (max-width: 980px) {
    padding-top: 20px;
    padding-bottom: 180px;
  }
`;
