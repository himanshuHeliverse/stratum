import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button2, I2, P2, Paragraph2, PreContainer } from "../fonts";
import FacebookIcon from "../../static/images/facebook-icon.svg";
import InstagramIcon from "../../static/images/instagram-icon.svg";
import LinkedinIcon from "../../static/images/linkedin-icon.svg";
const Footer = ({ footerData, HomeGrey }) => {
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };
  return (
    <Wrapper HomeGrey={HomeGrey}>
      <ShadedDiv>
        <ShadedDivContent>
          <FooterBlockOne>
            <FooterBlockOneMessage>
              <Button2>{footerData?.footerParagraph}</Button2>
            </FooterBlockOneMessage>
            <CopyrightTextDesktop>
              <Paragraph2>{footerData?.shadedText}</Paragraph2>
            </CopyrightTextDesktop>
          </FooterBlockOne>
          <FooterBlockTwo>
            <Button2>{footerData?.secondBlockHeading}</Button2>
            <PreContainer>
              <Paragraph2>{footerData?.secondBlockText}</Paragraph2>
            </PreContainer>
          </FooterBlockTwo>
          <FooterBlockThree>
            <Button2>{footerData?.thirdBlockHeading}</Button2>
            <PreContainer>
              <Paragraph2>{footerData?.thirdBlockText}</Paragraph2>
            </PreContainer>
            <IconsRow>
              {footerData?.facebookLink ? (
                <IconHolder
                  onClick={(e) => {
                    handleClick(e, footerData?.facebookLink);
                  }}
                >
                  <FacebookIcon />
                </IconHolder>
              ) : null}
              {footerData?.instagramLink ? (
                <IconHolder
                  onClick={(e) => {
                    handleClick(e, footerData?.instagramLink);
                  }}
                >
                  <InstagramIcon />
                </IconHolder>
              ) : null}
              {footerData?.linkedinLink ? (
                <IconHolder
                  onClick={(e) => {
                    handleClick(e, footerData?.linkedinLink);
                  }}
                >
                  <LinkedinIcon />
                </IconHolder>
              ) : null}
            </IconsRow>
          </FooterBlockThree>
          <FooterBlockFour>
            <Paragraph2>{footerData?.shadedText}</Paragraph2>
          </FooterBlockFour>
        </ShadedDivContent>
      </ShadedDiv>
    </Wrapper>
  );
};

export default Footer;

const IconHolder = styled.div`
  cursor: pointer;
`;

const IconsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ContactUsFont = styled(Button2)`
  @media (max-width: 1400px) {
    font-size: 18px;
    @media (max-width: 1120px) {
      font-size: 20px;

      @media (max-width: 980px) {
        font-family: Uniform Pro Medium;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px;
        letter-spacing: 0.02em;
        text-align: left;
        color: #86868b;
      }
    }
  }
`;

const LightDetailsText = styled(P2)`
  color: #605e5e;
  @media (max-width: 1400px) {
    font-size: 16px;
    @media (max-width: 1120px) {
      font-size: 12px;

      @media (max-width: 980px) {
        font-family: Inter;
        font-size: 9px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0.05em;
        text-align: left;
        color: #29292b;
      }
    }
  }
`;

const FooterCustomFont = styled.p`
  padding: 0;
  margin: 0;
  font-family: Uniform Pro Medium;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 40px;
  /* or 133% */

  letter-spacing: -0.02em;

  color: #000000;

  @media (max-width: 1400px) {
    font-size: 24px;
    @media (max-width: 1120px) {
      font-size: 20px;

      @media (max-width: 980px) {
        font-family: Uniform Pro Medium;
        font-size: 12px;
        font-style: normal;
        text-transform: uppercase;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0.02em;
        text-align: left;
      }
    }
  }
`;

const FooterBlockOne = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 40%;
  @media (max-width: 980px) {
    width: 96%;
    height: 35%;
    margin: 12px 0 0 0;
  }
`;

const FooterBlockOneMessage = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  max-width: 500px;
  @media (max-width: 980px) {
    width: 96%;
  }
`;

const FooterBlockTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 25%;
  height: 60%;
  padding-left: 5%;
  @media (max-width: 980px) {
    min-width: max-content;
    padding-left: 0;
  }
`;

const FooterBlockThree = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 25%;
  height: 80%;
  padding-left: 5%;
  @media (max-width: 980px) {
    padding-left: 0;
    min-width: max-content;
    justify-content: center;
  }
`;

const FooterBlockFour = styled.div`
  display: none;
  @media (max-width: 980px) {
    display: flex;
    padding-bottom: 8px;
    margin-top: 10px;
  }
`;

const CopyrightTextDesktop = styled.div`
  @media (max-width: 980px) {
    display: none;
  }
`;

const ShadedDivContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1600px;
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  gap: 20px;
  @media (max-width: 980px) {
    flex-direction: column;
    padding-left: 18px;
  }
`;

const ShadedDiv = styled.div`
  background: #e6e6e6;
  height: 100%;
  width: 86.8%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 980px) {
    margin-bottom: 20px;
    min-height: 280px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  background: ${({ HomeGrey }) => (HomeGrey ? "#E6E6E6" : "transparent")};
  @media (max-width: 980px) {
    padding-top: 5em;
    padding-bottom: 5px;
  }
`;
