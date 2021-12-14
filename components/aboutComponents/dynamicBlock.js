import React from "react";
import styled from "styled-components";
import { H4, Header1, P2, Paragraph1, PreContainer } from "../fonts";

const DynamicBlock = ({
  title,
  paragraph,
  image,
  imageAlt,
  invert,
  shiftLeft,
}) => {
  return (
    <MainBackgroundWrapper>
      <InnerDiv invert={invert} shiftLeft={shiftLeft}>
        <ImageDiv shiftLeft={shiftLeft}>
          <Image src={image} alt={imageAlt} />
        </ImageDiv>
        <TextDiv shiftLeft={shiftLeft}>
          <Header1>{title}</Header1>
          <PreContainer>
            <Paragraph1>{paragraph} </Paragraph1>
          </PreContainer>
        </TextDiv>
      </InnerDiv>
    </MainBackgroundWrapper>
  );
};

export default DynamicBlock;

const ImageDiv = styled.div`
  overflow: hidden;
  transition: all 0.8s;
  -moz-transition: all 0.8s;
  -webkit-transition: all 0.8s;
  -o-transition: all 0.8s;
  width: ${({ shiftLeft }) => (shiftLeft ? "55%" : "65%")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 980px) {
    justify-content: center;

    width: ${({ shiftLeft }) => (shiftLeft ? "90%" : "100%")};
    margin-bottom: 40px;
  }
`;

const Image = styled.img`
  transition: all 0.6s;
  -moz-transition: all 0.6s;
  -webkit-transition: all 0.6s;
  -o-transition: all 0.6s;
  min-width: 100%;
  max-height: 100%;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 980px) {
    min-width: 50vw;
    max-height: 55vw;
    width: 100vw;
    height: 60vw;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 850px;
  width: ${({ shiftLeft }) => (shiftLeft ? "40%" : "30%")};
  min-height: max-content;
  justify-content: flex-start;
  @media (max-width: 980px) {
    height: max-content;
    width: 86.8%;
    min-height: max-content;
    margin-left:20px;
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  display: flex;
  flex-direction: ${({ invert }) => (invert ? "row-reverse" : "row")};
  justify-content: space-between;
  align-items: flex-start;
  margin-left: ${({ shiftLeft }) => (shiftLeft ? "-320px" : "0px")};
  @media (max-width: 980px) {
    flex-direction: column;
    width: 100%;
    margin: 0;
  }
`;

const MainBackgroundWrapper = styled.div`
  display: flex;
  min-height: max-content;
  flex-direction: column;
  padding-top: 120px;
  padding-bottom: 120px;
  align-items: center;
  background: #e6e6e6;
  @media (max-width: 980px) {
    padding-top: 0px;
    padding-bottom: 200px;
  }
`;
