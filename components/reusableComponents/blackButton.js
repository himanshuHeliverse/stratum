import styled from "styled-components";
import { Button1, H5 } from "../fonts";

export const BlackButton = styled.div`
  cursor: pointer;
  width: max-content;
  height: max-content;
  background: #333333;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  justify-content: center;
  padding: 0 17px 0 17px;
  align-items: center;
  @media (max-width: 980px) {
    padding: 0 24px 0 24px;
    text-align: center !important;
  }
`;

export const BlackButtonText = styled(Button1)`
  color: #ffffff;
  text-align: center;
  padding: 5px 12px 5px 12px !important;
  @media (max-width: 980px) {
    padding: 6px 24px 6px 24px;
    font-style: normal;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    text-align: center !important;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;
