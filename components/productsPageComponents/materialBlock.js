import React from "react";
import styled from "styled-components";
import {
  H3,
  H6,
  Tag2,
  P2,
  PreContainer,
  Header1,
  Paragraph2,
  Paragraph1,
} from "../fonts";
import ArrowLeft from "../../static/images/arrow-left.svg";
import ArrowRight from "../../static/images/arrow-right.svg";
import { useSwipeable } from "react-swipeable";
import { StickyContainer, Sticky } from "react-sticky";

const Material1Block = ({ category, revert }) => {
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
  return (
    <StickyContainer>
      <Wrapper revert={!revert}>
        <InnerDiv revert={revert}>
          <LeftDiv>
            <CarouselDiv {...handlers}>
              {category?.otherProductsCarousel?.CarouselProducts?.map(
                (value, index) => (
                  <CarouselBackgroundImgDiv
                    key={value?.heroImage?.alternativeText}
                    imageOpacity={index}
                    imageOpacity2={bgUrl}
                  >
                    <CarouselBackgroundImg
                      src={
                        value?.mobileImage?.url
                          ? value?.mobileImage?.url
                          : value?.heroImage?.url
                      }
                      alt={
                        value?.mobileImage?.alternativeText
                          ? value?.mobileImage?.alternativeText
                          : value?.heroImage?.alternativeText
                      }
                    />
                    <CarouselBottomDiv
                      imageOpacity={index}
                      imageOpacity2={bgUrl}
                    >
                      {value?.button ? (
                        // <BuyButton>
                        //   <ButtonText>BUY NOW</ButtonText>
                        // </BuyButton>
                        <div />
                      ) : (
                        <div />
                      )}
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
                    </CarouselBottomDiv>
                  </CarouselBackgroundImgDiv>
                )
              )}
            </CarouselDiv>
          </LeftDiv>
          <RightDiv>
            <Header1>{category?.sections?.heading}</Header1>
            {/* <StyledTag2>{category?.sections?.subheading}</StyledTag2> */}
            <PreContainer>
              <Paragraph1>{category?.sections?.paragraph}</Paragraph1>
            </PreContainer>
          </RightDiv>
        </InnerDiv>
      </Wrapper>
    </StickyContainer>
  );
};

export default Material1Block;

const StyledTag2 = styled(Tag2)`
  border-bottom: none;
  padding-bottom: 10px;
  width: max-content;
  @media (max-width: 980px) {
    border-bottom: 1px solid #ededf0;
  }
`;

const LeftDiv = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 980px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const RightDiv = styled.div`
  width: 36%;
  padding-right: 10%;
  height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: max-content;
  gap: 10px;
  @media (max-width: 980px) {
    height: max-content;
    width: 100%;
    padding: 0;
  }
`;

const CarouselBottomDiv = styled.div`
  /* opacity: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? 1 : 0};
  width: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? "100%" : "0"}; */
  z-index: 100;
  position: absolute;
  display: flex;
  width: 35vw;
  height: 35vw;
  max-width: 700px;
  max-height: 700px;

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  @media (max-width: 980px) {
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 0;
    flex-direction: column;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  @media (max-width: 980px) {
    display: none;
  }
`;
const CarouselBackgroundImg = styled.img`
  /* display: ${({ mobile }) => (mobile ? "none" : "block")}; */
  width: 40vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
  position: absolute;
  @media (max-width: 980px) {
    /* display: ${({ mobile }) => (!mobile ? "none" : "block")}; */
    width: 86.8vw;
    height: 86.8vw;
  }
`;

const CarouselBackgroundImgDiv = styled.div`
  opacity: ${({ imageOpacity, imageOpacity2 }) =>
    imageOpacity === imageOpacity2 ? 1 : 0};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  -webkit-transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
  transition: opacity 0.5s cubic-bezier(0.4, 0.82, 0.6, 1);
`;

const CarouselDiv = styled.div`
  width: 40vw;
  height: 40vw;
  max-width: 800px;
  max-height: 800px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  @media (max-width: 980px) {
    width: 86.8vw;
    height: 86.8vw;
    margin-top: 20px;
  }
`;
const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  display: flex;
  flex-direction: ${({ revert }) => (revert ? "row-reverse" : "row")};
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const Wrapper = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  padding-top: 240px;
  /* padding-bottom: 240px; */
  padding-bottom: ${({ revert }) => (revert ? "0px" : "240px")};
  align-items: center;
  
  @media (max-width: 980px) {
    padding-top: 180px;
    padding-bottom: ${({ revert }) => (revert ? "0px" : "180px")};
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
