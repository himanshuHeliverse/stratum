import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import fetch from "isomorphic-fetch";
import styled from "styled-components";
import CardSection from "./cardSection";
import AppContext from "../../components/context/appContext";
import CartBlock from "../cartComponents/cartBlock";
import { H5, P3, H6 } from "../fonts";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import ConfimrationPopup from "../reusableComponents/confirmationPopup";

const [confirmationpopup,setconfirmtionpopup]= useState(false)
function CheckoutForm({
  context,
  shippingDetails,
  setOrderConfirmPopupEnabled,
}) {
  const [data, setData] = useState({
    address: "",
    city: "",
    stripe_id: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const appContext = useContext(AppContext);

  const onChange = (e) => {
    const updateItem = (data[e.target.name] = e.target.value);
    setData({ ...data, updateItem });
  };

  const submitOrder = async () => {
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    let productIds = [];

    appContext?.cart?.items?.map(
      (value) =>
      (productIds = [
        ...productIds,
        {
          product: value.id,
          quantity: value.quantity,
          size: value.size,
          weight: value.weight,
          finishProp: value.finishProp,
        },
      ])
    );

    const token = await stripe.createToken(cardElement);
    const userToken = Cookies.get("token");
    const Total = Number(
      Math.round(
        appContext?.cart?.total +
        (shippingDetails[appContext.shippingTo]?.VAT / 100) *
        appContext?.cart?.total +
        shippingDetails[appContext.shippingTo]?.Shipping +
        "e2"
      ) + "e-2"
    );
    const response = await fetch(`${process.env.STRAPI_URL}/orders`, {
      method: "POST",
      headers: userToken && { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        amount: Total,
        VAT: shippingDetails[appContext.shippingTo]?.VAT,
        shipping: shippingDetails[appContext.shippingTo]?.Shipping,
        products: productIds,
        address: data.address,
        city: data.city,
        state: appContext?.user?.id,
        token: token?.token?.id,
      }),
    });
    if (!response.ok) {
      setError(response.statusText);
    } else {
      setOrderConfirmPopupEnabled(true);
    }
    return response.json();
  };

  return (
    <Wrapper>
      <InnerDiv>
        <LeftDiv>
          <CartBlock
            checkout={true}
            appContext={context}
            shippingDetails={shippingDetails}
          />
        </LeftDiv>
        <RightDiv>
          <StyledH5>Order Details</StyledH5>
          <DetailsHolderDiv>
            <DetailsHolderSubDiv>
              <StyledH6>Address</StyledH6>
              <StyledInput name="address" onChange={onChange} />
            </DetailsHolderSubDiv>
            <DetailsHolderSubDiv>
              <StyledH6>City</StyledH6>
              <StyledInput name="city" onChange={onChange} />
            </DetailsHolderSubDiv>
          </DetailsHolderDiv>
          <DetailsHolderDiv>
            <CardSection
              loading={loading}
              data={data}
              stripeError={error}
              submitOrder={() =>
                submitOrder().then(() => {
                  appContext.emptyCart();
                })
              }
            />
          </DetailsHolderDiv>
        </RightDiv>
      </InnerDiv>
    </Wrapper>
  );
}
export default CheckoutForm;

const DetailsHolderSubDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

const DetailsHolderDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const LeftDiv = styled.div`
  width: 80%;
  min-height: 500px;
  height: max-content;
  @media (max-width: 980px) {
    height: 100%;
    width: 100%;
  }
`;
const RightDiv = styled.div`
  width: 50%;
  min-height: 500px;
  height: max-content;
  gap: 40px;
  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    height: 100%;
    width: 100%;
  }
`;
const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  gap: 5%;
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
  padding-top: 220px;
  padding-bottom: 100px;
  align-items: center;
  @media (max-width: 980px) {
    height: max-content;
    padding-top: 100px;
    padding-bottom: 40px;
  }
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

const StyledInput = styled.input`
  transition: all 0.5s;
  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -o-transition: all 0.5s;
  border: none;
  outline: none;
  height: 30px;
  width: 100%;
  border-bottom: 1px solid #999999;
  color: #999999;
  &:focus {
    color: #000000;
    border-bottom: 1px solid #000000;

    &::placeholder {
      transition: all 0.5s;
      -moz-transition: all 0.5s;
      -webkit-transition: all 0.5s;
      -o-transition: all 0.5s;
      color: #000000;
    }
  }
  &::placeholder {
    color: #cccccc;
    font-size: 13px;
  }

  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.05em;
  padding-left: 10px;
  margin-left: -4px;
`;
