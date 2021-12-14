import React from "react";
import styled from "styled-components";
import { H1, H4, Header2 } from "../fonts";
import ArrowLeft from "../../static/images/arrow-left.svg";
import ArrowRight from "../../static/images/arrow-right.svg";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/router";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";

const HeroBlock = ({ data }) => {
  const [bgUrl, setBgUrl] = React.useState(0);
  const shiftImage = (forward) => {
    if (forward) {
      if (bgUrl < data?.CarouselProducts?.length - 1) setBgUrl(bgUrl + 1);
      else setBgUrl(0);
    } else {
      if (bgUrl > 0) setBgUrl(bgUrl - 1);
      else setBgUrl(data?.CarouselProducts?.length - 1);
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
          {data?.CarouselProducts?.map((value, index) => (
            <>
              <BackgroundImage
                key={value?.heroImage?.url}
                src={value?.heroImage?.url}
                url={value?.heroImage?.formats?.small?.url}
                imageOpacity={index}
                imageOpacity2={bgUrl}
              />
              <BackgroundImage
                mobile
                key={value?.mobileImage?.url}
                url={
                  value?.mobileImage?.formats?.small?.url
                    ? value?.mobileImage?.formats?.small?.url
                    : value?.heroImage?.formats?.small?.url
                }
                src={
                  value?.mobileImage?.url
                    ? value?.mobileImage?.url
                    : value?.heroImage?.url
                }
                imageOpacity={index}
                imageOpacity2={bgUrl}
              />
            </>
          ))}
        </BackgroundImageDiv>
        <InnerDiv>
          <MainTextDiv>
            <MainHeadingHolderWhite>
              <Header2 light={data?.CarouselProducts[bgUrl]?.headingLight}>
                {data?.heading}
              </Header2>
            </MainHeadingHolderWhite>
            <MainHeadingHolderWhite>
              <Header2 light={data?.CarouselProducts[bgUrl]?.headingLight}>
                {data?.subheading}
              </Header2>
            </MainHeadingHolderWhite>
            {/* <div>
              <MainHeroTitle
                light={data?.CarouselProducts[bgUrl]?.headingLight}
              >
                {data?.heading}
              </MainHeroTitle>
              <MainHeroTitle
                light={data?.CarouselProducts[bgUrl]?.headingLight}
              >
                {data?.subheading}
              </MainHeroTitle>
            </div> */}
            {/* <BlackButtonTurnedWhite
              onClick={() => {
                const anchor = document.querySelector(`#stratum_collection`);
                anchor.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <StyledH4
              // onClick={(e) =>
              //   handleClick(
              //     e,
              //     `/products/${data?.CarouselProducts[bgUrl]?.sub_product?.category?.name}/${data?.CarouselProducts[bgUrl]?.sub_product?.preset?.type}/${data?.CarouselProducts[bgUrl]?.sub_product?.form?.type}/${data?.CarouselProducts[bgUrl]?.sub_product?.finish?.type}`
              //   )
              // }
              >
                {data?.buttonText}
              </StyledH4>
            </BlackButtonTurnedWhite> */}
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

const BottomDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const MainTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 75px;
  @media (max-width: 980px) {
    padding: 50px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 4.5%;
  padding-bottom: 23px;
  @media (max-width: 980px) {
    display: none;
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 45vw;
  @media (max-width: 980px) {
    width: 100vw;
    height: 100vw;
    margin-left: 20px;
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
    width: 100vw;
    height: 100vw;
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

const MainHeadingHolderWhite = styled.div`
  background: white;
  width: max-content;
  height: max-content;
  padding: 5px 10px 5px 10px;
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

const MobileOuterDiv = styled.div`
  @media (max-width: 980px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
