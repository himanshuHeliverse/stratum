import React from "react";
import styled from "styled-components";
import {
  H2,
  P1,
  Tag2,
  H5,
  PreContainer,
  Header2,
  Tagline2,
  HorizontalLine,
  Paragraph1,
  Paragraph2,
  Button1,
} from "../fonts";
import { StickyContainer, Sticky } from "react-sticky";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";
import ContactUsPopup from "../reusableComponents/contactUsPopup";

const BalanceBlock = ({ category, setPopupEnabled }) => {
  const [buttonPosition, setButtonPosition] = React.useState(true);
  return (
    <StickyContainer>
      <Wrapper>
        <InnerDiv>
          <LeftColumn>
            <LeftColumnUpperDiv>
              <LeftColumnUpperDivInner>
                <Header2>{category?.sections[0]?.sections?.heading}</Header2>
                <Tagline2>
                  {category?.sections[0]?.sections?.subheading}
                </Tagline2>
              </LeftColumnUpperDivInner>
              <HorizontalLine />
            </LeftColumnUpperDiv>
            <ParagraphContainer>
              <PreContainer>
                <Paragraph1>
                  {category?.sections[0]?.sections?.paragraph}
                </Paragraph1>
              </PreContainer>
              <ContactUsDiv
                onClick={() => {
                  setPopupEnabled(true);
                }}
              >
                <Paragraph2>Questions about this product?</Paragraph2>
                <Paragraph2>Contact Us</Paragraph2>
              </ContactUsDiv>
            </ParagraphContainer>
          </LeftColumn>
          <RightColumn>
            <DesktopViewStickyButton>
              <Sticky>
                {({ distanceFromTop }) => {
                  let selectedStyles = 0;
                  if (distanceFromTop < 140) {
                    if (distanceFromTop < -380) {
                      selectedStyles = 1;
                    } else {
                      selectedStyles = 2;
                    }
                  }
                  if (distanceFromTop < -600) {
                    selectedStyles = 3;
                  }
                  return (
                    <StickyDiv
                      position={selectedStyles === 0 ? "relative" : "absolute"}
                      top={selectedStyles === 0 ? false : true}
                      // zIndex={selectedStyles === 1 ? "-1" : "0"}
                      display={selectedStyles === 3 ? "none" : ""}
                      marginTop={"250px"}
                    >
                      <BlackButton
                        onClick={() => {
                          setPopupEnabled(true);
                        }}
                      >
                        <BlackButtonText>
                          {category?.sections[0]?.sections?.button}
                        </BlackButtonText>
                      </BlackButton>
                    </StickyDiv>
                  );
                }}
              </Sticky>
            </DesktopViewStickyButton>
            <MobileViewStickyButton>
              <BlackButton
                onClick={() => {
                  setPopupEnabled(true);
                }}
              >
                <BlackButtonText>
                  {category?.sections[0]?.sections?.button}
                </BlackButtonText>
              </BlackButton>
            </MobileViewStickyButton>
            <RightColumnLowerDivOuter>
              <Sticky>
                {({ distanceFromTop }) => {
                  let selectedStyles = 0;
                  if (distanceFromTop < -205) {
                    if (distanceFromTop < -290) {
                      selectedStyles = 1;
                    } else {
                      selectedStyles = 2;
                    }
                  }
                  if (distanceFromTop < -600) {
                    selectedStyles = 3;
                  }
                  return (
                    <StickyDiv
                      position={selectedStyles === 0 ? "relative" : "absolute"}
                      top={selectedStyles === 0 ? false : true}
                      // zIndex={selectedStyles === 1 ? "-1" : "0"}
                      display={selectedStyles === 3 ? "none" : ""}
                      marginTop={"290px"}
                    >
                      <RightColumnLowerDiv>
                        {category?.sections[0]?.sections?.anchorLinks?.map(
                          (value, index) => (
                            <AnchorText
                              onClick={() => {
                                let anchorTarget = "#product_specifications";
                                if (index === 0)
                                  anchorTarget = "#material_details";
                                const anchor =
                                  document.querySelector(anchorTarget);
                                anchor.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }}
                              key={value.title}
                            >
                              {value.title}
                            </AnchorText>
                          )
                        )}
                      </RightColumnLowerDiv>
                    </StickyDiv>
                  );
                }}
              </Sticky>
            </RightColumnLowerDivOuter>
          </RightColumn>
        </InnerDiv>
      </Wrapper>
    </StickyContainer>
  );
};

export default BalanceBlock;
const ContactUsDiv = styled.div`
  cursor: pointer;
  width: max-content;
  @media (max-width: 980px) {
    display: none;
  }
`;
const StickyDiv = styled.div`
  position: ${({ top }) => (top ? "fixed" : "relative")};
  top: ${({ top, marginTop }) => (top ? marginTop : "")};
  margin-left: -380px;
  display: ${({ display }) => display};
  z-index: ${({ zIndex }) => zIndex};
  transition: all 0.3s;
`;

const DesktopViewStickyButton = styled.div`
  position: relative;
  @media (max-width: 980px) {
    display: none;
  }
`;
const MobileViewStickyButton = styled.div`
  @media (min-width: 980px) {
    display: none;
  }
`;

const AnchorText = styled(Button1)`
  color: #86868b !important;
  /* padding-top: 15px; */
  /* margin: 3px 0 3px 0; */
  cursor: pointer;
  &:hover {
    color: #555555 !important;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
  @media (max-width: 980px) {
    height: 100%;
    width: 100%;
  }
`;
const RightColumn = styled.div`
  display: flex;
  border-left: 1px solid black;
  width: 30%;
  min-width: 400px;
  position: relative;
  height: max-content;
  min-height: 500px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  @media (max-width: 980px) {
    border: none;
    padding-top: 20px;
    min-width: max-content;
    min-height: 80px;
    width: 100%;
    height: max-content;
    align-items: flex-start;
    justify-content: center;
  }
`;

const RightColumnLowerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  gap: 10px;
  /* border-left: 1px solid #ededf0; */
  /* padding-left: 30px; */
  justify-content: flex-start;
  @media (max-width: 980px) {
    /* border: none; */
    display: none;
  }
`;

const RightColumnLowerDivOuter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  position: relative;
  justify-content: flex-end;
`;

const LeftColumnUpperDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const ParagraphContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  min-height: 350px;
  height: max-content;
  justify-content: space-between;
  @media (max-width: 980px) {
    min-height: 150px;
  }
`;

const LeftColumnUpperDivInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  height: max-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 980px) {
    flex-direction: column;
    height: max-content;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  padding-top: 80px;
  padding-bottom: 80px;
  align-items: center;
  @media (max-width: 980px) {
    height: max-content;
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;
