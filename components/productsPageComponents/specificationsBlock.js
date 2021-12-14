import React from "react";
import styled from "styled-components";
import { H5, P2, Button1, Paragraph1, Paragraph2 } from "../fonts";

const SpecificationsBlock = ({ data, setPopupEnabled }) => {
  return (
    <Wrapper>
      <InnerDiv>
        <SpecsImageHolderDiv>
          <SpecsHolderDiv>
            <SpecsImage
              src={data?.Image?.url}
              key={data?.Image?.url}
              alt={data?.Image?.alternativeText}
            />
            <Button1 black>TOP</Button1>
          </SpecsHolderDiv>
          <SpecsHolderDiv>
            <SpecsImage
              src={data?.Image2?.url}
              key={data?.Image2?.url}
              alt={data?.Image2?.alternativeText}
            />
            <Button1 black>FRONT VIEW</Button1>
          </SpecsHolderDiv>
        </SpecsImageHolderDiv>
        <SpecsDetailsHolderDiv>
          {data?.SpecificationsField?.map((value, index) => (
            <SpecsSubDiv BorderTop={index === 0} key={value}>
              <TextHolderDiv>
                <Button1 black>{value.Title}</Button1>
              </TextHolderDiv>
              <TextHolderDiv>
                <Paragraph2>{value.Value}</Paragraph2>
              </TextHolderDiv>
            </SpecsSubDiv>
          ))}
          <ContactDiv
            onClick={() => {
              setPopupEnabled(true);
            }}
          >
            <Paragraph2>Questions about this product?</Paragraph2>
            <Paragraph2>Contact Us.</Paragraph2>
          </ContactDiv>
        </SpecsDetailsHolderDiv>
      </InnerDiv>
    </Wrapper>
  );
};

export default SpecificationsBlock;

const ContactDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: max-content;
  cursor: pointer;
`;

const SpecsHolderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    padding-bottom: 180px;
    gap: 50px;
  @media (max-width: 980px) {
    align-items: flex-start;
    flex-direction: column-reverse;
    gap: 30px;
    padding-bottom: 60px;
  }
`;
const SpecsImage = styled.img`
  width: 65%;
  @media (max-width: 980px) {
    width: 100%;
  }
`;
const TextHolderDiv = styled.div`
  width: 50%;
`;
const SpecsSubDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  width: 90%;
  height: 84px;
  border-top: ${({ BorderTop }) => (BorderTop ? "1px solid #86868b" : "none")};
  border-bottom: 1px solid #86868b;
`;

const SpecsImageHolderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5%;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;
const SpecsDetailsHolderDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 80px;
  align-items: center;
  @media (max-width: 980px) {
    margin-top: 40px;
  }
`;
