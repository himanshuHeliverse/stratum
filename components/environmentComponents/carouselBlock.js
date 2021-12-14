import React from "react";
import styled from "styled-components";
import { Button2, H3, Header2_5 } from "../fonts";
import ArrowLeft from "../../static/images/arrow-left.svg";
import ArrowRight from "../../static/images/arrow-right.svg";
import { useSwipeable } from "react-swipeable";

const CarouselBlock = ({ CarouselImages, CarouselImagesMobile }) => {
  const [bgUrl, setBgUrl] = React.useState(0);
  const shiftImage = (forward) => {
    if (forward) {
      if (bgUrl < CarouselImages?.length - 1) setBgUrl(bgUrl + 1);
      else setBgUrl(0);
    } else {
      if (bgUrl > 0) setBgUrl(bgUrl - 1);
      else setBgUrl(CarouselImages?.length - 1);
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
  return (
    <MobileOuterDiv>
      <Wrapper {...handlers}>
        <BackgroundImageDiv>
          {CarouselImages?.map((value, index) => (
            <BackgroundImage
              key={value?.alternativeText}
              src={value?.url}
              imageOpacity={index}
              imageOpacity2={bgUrl}
            />
          ))}
          {CarouselImagesMobile?.map((value, index) => (
            <BackgroundImageMobile
              key={value?.alternativeText}
              src={value?.url}
              imageOpacity={index}
              imageOpacity2={bgUrl}
            />
          ))}
        </BackgroundImageDiv>
        <InnerDiv>
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

export default CarouselBlock;

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: 980px) {
    width: 100%;
    height: 50%;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 4.5%;
  padding-bottom: 23px;
  @media (max-width: 980px) {
    width: 100%;
    justify-content: space-between;
    padding: 0 10px 0 10px;
    /* display: none; */
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  z-index: 1;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 45vw;
  @media (max-width: 980px) {
    height: 86.8vw;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 60vw;
  @media (max-width: 980px) {
    padding-top: 40px;
    align-items: center;
    height: 86.8vw;
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
    width: 86.8vw;
    height: 86.8vw;
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
  }
`;

const BackgroundImageMobile = styled.img`
  position: absolute;
  opacity: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? 1 : 0};
  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  width: 86.8vw;
  height: 86.8vw;
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
