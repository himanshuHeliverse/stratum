/* components/Checkout/cardsection.js */

import React from "react";
import styled from "styled-components";
import { CardElement } from "@stripe/react-stripe-js";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";
import { H5, H6, P3 } from "../fonts";

function CardSection(props) {
  return (
    <Wrapper>
      <StyledH6 htmlFor="card-element">Credit or debit card</StyledH6>

      <InnerWrapper>
        <CardHolderDiv>
          <CardElement
            options={{
              style: { width: "100%", base: { fontSize: "20px" } },
            }}
          />
        </CardHolderDiv>
        <ButtonHolderDiv>
          <BlackButton onClick={props.submitOrder}>
            <BlackButtonText>
              {!props.loading ? "Confirm order" : "Loading"}
            </BlackButtonText>
          </BlackButton>
        </ButtonHolderDiv>
        {props.stripeError ? <div>{props.stripeError.toString()}</div> : null}
      </InnerWrapper>
    </Wrapper>
  );
}
export default CardSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  margin-top: 30px;
`;

const InnerWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const CardHolderDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const ButtonHolderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const StyledH5 = styled(H5)`
  @media (max-width: 980px) {
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const StyledH6 = styled(H6)`
  @media (max-width: 980px) {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const StyledP3 = styled(P3)`
  @media (max-width: 980px) {
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;
