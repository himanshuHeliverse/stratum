import React from "react";
import styled from "styled-components";
import { Header2 } from "../fonts";

const HeroBlock = ({
  image,
  imageMobile,
  heroImageTitlePart1,
  heroImageTitlePart2,
}) => {
  return (
    <Wrapper>
      <BackgroundImageDiv>
        <BackgroundImage
          key={image?.alternativeText}
          src={image?.url}
          url={image?.formats?.small?.url}
        />
        <BackgroundImage
          mobile
          key={imageMobile?.alternativeText}
          src={imageMobile?.url}
          url={imageMobile?.formats?.small?.url}
        />
      </BackgroundImageDiv>
      <InnerDiv>
        <MainTextDiv>
          <MainHeadingHolderWhite>
            <Header2>{heroImageTitlePart1}</Header2>
          </MainHeadingHolderWhite>
          <MainHeadingHolderWhite>
            <Header2>{heroImageTitlePart2}</Header2>
          </MainHeadingHolderWhite>
        </MainTextDiv>
      </InnerDiv>
    </Wrapper>
  );
};

export default HeroBlock;

const MainHeadingHolderWhite = styled.div`
  background: white;
  width: max-content;
  height: max-content;
  padding: 5px 10px 5px 10px;
`;
const MainTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 93px;
  gap: 5px;
  @media (max-width: 980px) {
    padding: 20px 0 20px 0;
    justify-content: flex-end;
    align-items: flex-start;
    height: 100%;
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 45vw;
  @media (max-width: 980px) {
    height: 100vw;
    /* margin-left: 20px; */
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 50vw;
  @media (max-width: 980px) {
    align-items: center;
    height: 100vw;
    /* margin-top: 60px; */
  }
`;

const BackgroundImageDiv = styled.div`
  overflow: hidden;
  z-index: -1;
  width: 100vw;
  height: 50vw;
  position: absolute;
  display: flex;

  justify-content: center;
  align-items: center;
  @media (max-width: 980px) {
    width: 100vw;
    height: 100vw;
  }
`;

const BackgroundImage = styled.img`
  background: url(${({ url }) => url}) no-repeat;
  background-size: 100% 50vw;
  width: 100%;
  height: 50vw;
  position: absolute;
  display: ${({ mobile }) => (mobile ? "none" : "block")};
  opacity: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? 1 : 0};
  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  @media (max-width: 980px) {
    width: 100vw;
    height: 100vw;
    display: ${({ mobile }) => (!mobile ? "none" : "block")};
  }
`;
