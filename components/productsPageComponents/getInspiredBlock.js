import React from "react";
import styled from "styled-components";
import { Button2, H3, Header2_5 } from "../fonts";
import ArrowLeft from "../../static/images/arrow-left.svg";
import ArrowRight from "../../static/images/arrow-right.svg";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";

const HeroBlock = ({ category }) => {
  const [bgUrl, setBgUrl] = React.useState(0);
  const shiftImage = (forward) => {
    if (forward) {
      if (bgUrl < category?.otherProductsCarousel?.CarouselProducts?.length - 1)
        setBgUrl(bgUrl + 1);
      else setBgUrl(0);
    } else {
      if (bgUrl > 0) setBgUrl(bgUrl - 1);
      else
        setBgUrl(category?.otherProductsCarousel?.CarouselProducts?.length - 1);
    }
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left") {
        shiftImage(true);
      } else if (eventData.dir === "Right") {
        shiftImage(false);
      }
    },
  });
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };
  return (
    <MobileOuterDiv>
      <Wrapper {...handlers}>
        <BackgroundImageDiv>
          {category?.otherProductsCarousel?.CarouselProducts?.map(
            (value, index) => (
              <>
                <BackgroundImage
                  key={value?.heroImage?.alternativeText}
                  src={value?.heroImage?.url}
                  imageOpacity={index}
                  imageOpacity2={bgUrl}
                />
                <BackgroundImageMobile
                  key={value?.mobileImage?.alternativeText}
                  src={value?.mobileImage?.url}
                  imageOpacity={index}
                  imageOpacity2={bgUrl}
                />
              </>
            )
          )}
        </BackgroundImageDiv>
        <InnerDiv>
          <MainTextDiv>
            <MainHeroTitle
              light={
                category?.otherProductsCarousel?.CarouselProducts[bgUrl]
                  ?.headingLight
              }
            >
              {category?.otherProductsCarousel?.heading}
            </MainHeroTitle>
            <BlackButtonTurnedWhite>
              <BlackButtonTextTurnedWhite>
                {category?.otherProductsCarousel?.buttonText}
              </BlackButtonTextTurnedWhite>
            </BlackButtonTurnedWhite>
          </MainTextDiv>
          <BottomDiv>
            <ButtonDiv>
              <ArrowLeft
                style={{ cursor: "pointer" }}
                onClick={() => {
                  shiftImage(false);
                }}
              />
              <ArrowRight
                style={{ cursor: "pointer" }}
                onClick={() => {
                  shiftImage(true);
                }}
              />
            </ButtonDiv>
          </BottomDiv>
        </InnerDiv>
      </Wrapper>
    </MobileOuterDiv>
  );
};

export default HeroBlock;

const BlackButtonTextTurnedWhite = styled(Button2)`
  color: #29292b;
  font-size: 20px;
  line-height: 20px;
  padding: 8px 12px 8px 12px !important;
  @media (max-width: 980px) {
    font-size: 14px;
    line-height: 16px;
    padding: 6px 0px 6px 0px !important;
  }
`;
const BlackButtonTurnedWhite = styled(BlackButton)`
  background-color: white;
  @media (max-width: 980px) {
    width: max-content;
    /* min-width: 200px; */
  }
`;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: 980px) {
    justify-content: center;
  }
`;

const MainHeroTitle = styled(Header2_5)`
  /* color: ${({ light }) => (light ? "#ffffff" : "#000000")};
  color: black;
  -webkit-text-fill-color: white; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
  text-shadow: "0 0 1px #666666, 0 0 2px #666666";
  /* color: #ffffff; */
`;

const MainTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 93px;
  justify-content: flex-start;
  gap: 5px;
  @media (max-width: 980px) {
    padding-top: 30px;
    width: max-content;
    min-width: 250px;
    justify-content: center;
    align-items: center;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 4.5%;
  padding-bottom: 23px;
  @media (max-width: 980px) {
    padding: 0 10px 0 10px;
    padding-bottom: 0;
    width: 100%;
    justify-content: space-between;
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  z-index: 1;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45vw;
  @media (max-width: 980px) {
    width: 100%;
    height: 60vw;
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
    /* align-items: center; */
    align-items: flex-start;
    height: 100vw;
  }
`;

const BackgroundImageDiv = styled.div`
  overflow: hidden;
  z-index: 0;
  width: 100vw;
  height: 50vw;
  position: absolute;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  @media (max-width: 980px) {
    width: 100vw;
    height: 100vw;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? 1 : 0};
  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  @media (max-width: 980px) {
    display: none;
    /* width: 100vw;
    height: 100vw; */
  }
`;

const BackgroundImageMobile = styled.img`
  position: absolute;
  opacity: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? 1 : 0};
  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  width: 100vw;
  height: 100vw;
  @media (min-width: 980px) {
    display: none;
  }
`;

const MobileOuterDiv = styled.div`
  @media (max-width: 980px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
