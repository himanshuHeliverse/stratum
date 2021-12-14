import React from "react";
import styled from "styled-components";
import { Tag2, P2, PreContainer, Header1, Paragraph1 } from "../fonts";

const ImageParagraphBlock = ({
  title,
  paragraph,
  image,
  imageAlt,
  invert,
  green,
  yellow,
}) => {
  return (
    <MainBackgroundWrapper invert={invert} green={green} yellow={yellow}>
      <InnerDiv invert={invert}>
        <ImageDiv>
          <Image src={image} alt={imageAlt} />
        </ImageDiv>
        <TextDiv>
          <Header1>{title}</Header1>
          <PreContainer>
            <Paragraph1>{paragraph}</Paragraph1>
          </PreContainer>
        </TextDiv>
      </InnerDiv>
    </MainBackgroundWrapper>
  );
};

export default ImageParagraphBlock;

const ImageDiv = styled.div`
  overflow: hidden;
  transition: all 0.8s;
  -moz-transition: all 0.8s;
  -webkit-transition: all 0.8s;
  -o-transition: all 0.8s;
  width: ${({ shiftLeft }) => (shiftLeft ? "48%" : "60%")};
  display: flex;
  height: 25vw;
  width: 50vw;
  max-height: 500px;
  max-width: 1000px;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 980px) {
    justify-content: center;
    width: 86.8vw;
    height: 60vw;
    margin-bottom: 40px;
  }
`;

const Image = styled.img`
  height: 25vw;
  width: 50vw;
  max-height: 500px;
  max-width: 1000px;
  transition: all 0.6s;
  -moz-transition: all 0.6s;
  -webkit-transition: all 0.6s;
  -o-transition: all 0.6s;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 980px) {
    height: 100%;
    width: 100%;
  }
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 550px;
  width: ${({ shiftLeft }) => (shiftLeft ? "50%" : "35%")};
  min-height: max-content;
  justify-content: flex-start;
  @media (max-width: 980px) {
    width: 100%;
    height: max-content;
  }
`;

const InnerDiv = styled.div`
  width: 95%;
  max-width: 2000px;
  display: flex;
  flex-direction: ${({ invert }) => (invert ? "row-reverse" : "row")};
  margin-left: ${({ invert }) => (invert ? "98px" : "-98px")};
  justify-content: space-between;
  align-items: flex-start;
  /* margin-left: ${({ shiftLeft }) => (shiftLeft ? "-320px" : "0px")}; */
  @media (max-width: 980px) {
    width: 86.8%;
    flex-direction: column;
    margin: 0;
  }
`;

const MainBackgroundWrapper = styled.div`
  display: flex;
  background: ${({ yellow, green }) =>
    yellow ? "#E8E4BE" : green ? "#CCE0D3" : "transparent"};
  min-height: max-content;
  flex-direction: column;
  padding-top: 280px;
  padding-bottom: 280px;
  align-items: center;
  @media (max-width: 980px) {
    padding-bottom: 200px;
    padding-top: 200px;
  }
`;
