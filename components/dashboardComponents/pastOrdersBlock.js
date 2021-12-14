import React from "react";
import { H5, H6, P3, Tag2 } from "../fonts";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ArrowDown from "../../static/images/arrow-down-small.svg";
import moment from "moment";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";

const PastOrdersBlock = ({
  appContext,
  checkout,
  setOrderCancelPopupEnabled,
  setContactUsPopupEnabled,
  setContactUsPopupMessage,
}) => {
  let mockTitles = ["", "DATE", "ADDRESS", "ITEM TOTAL", "STATUS", "OPTIONS"];
  let mockTitlesProducts = [
    "ITEM",
    "DESCRIPTION",
    "SIZE",
    "WEIGHT",
    "FINISH",
    "QUANTITY",
    "ITEM PRICE",
  ];
  const [trigger, setTrigger] = React.useState(false);

  const router = useRouter();
  const handleClick = (e, path) => {
    e?.preventDefault();
    router.push(path);
  };
  const [fetchedOrders, setFetchedOrders] = React.useState([]);
  const [fetchedOrdersExpand, setFetchedOrdersExpand] = React.useState([]);
  const [loadingRefund, setLoadingRefund] = React.useState([]);
  const fetchAllOrders = async () => {
    const userToken = Cookies.get("token");

    const response = await fetch(`${process.env.STRAPI_URL}/orders`, {
      method: "GET",
      headers: userToken && {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((resp) => {
      resp.json().then((res) => {
        setFetchedOrders(res);
        let array = [];
        res !== null && res !== undefined
          ? res?.map
            ? res?.map(() => {
                array = [...array, false];
              })
            : null
          : null;
        setFetchedOrdersExpand(array);
        setLoadingRefund(array);
      });
    });

    if (!response?.ok) {
    }
    return response;
  };

  const requestRefund = async (orderId, loadingIndex) => {
    const response = await fetch(
      `${process.env.STRAPI_URL}/orders/${orderId}`,
      {
        method: "PUT",
        headers: appContext.userToken && {
          Authorization: `Bearer ${appContext.userToken}`,
        },
        body: JSON.stringify({
          intent: "refund",
        }),
      }
    ).then((resp) => {
      setOrderCancelPopupEnabled(true);
      setTrigger(!trigger);
      let array = loadingRefund.map((value, innerIndex) =>
        innerIndex === loadingIndex ? !value : value
      );
      setLoadingRefund(array);
    });

    if (!response?.ok) {
    }
    return response;
  };

  React.useEffect(() => {
    if (appContext.user === undefined || appContext.user === null) {
      // handleClick(null, "/");
    } else {
      fetchAllOrders();
    }
  }, [trigger]);

  return (
    <Wrapper>
      <InnerDiv>
        <UpperDiv>
          <UpperDivLeft>
            <StyledH5>Orders</StyledH5>
            <StyledClickableP3
              onClick={(e) => {
                handleClick(e, "/");
                appContext?.setScrollToCollection(true);
              }}
            >
              Continue Shopping
            </StyledClickableP3>
          </UpperDivLeft>

          <UpperDivRight>
            {!checkout ? (
              <StyledClickableP3
                onClick={(e) => {
                  setContactUsPopupEnabled(true);
                  setContactUsPopupMessage("");
                }}
              >
                CONTACT US
              </StyledClickableP3>
            ) : null}
          </UpperDivRight>
        </UpperDiv>
        <LowerDiv>
          <LowerScrollDiv>
            <LowerDivTitlesRow>
              {mockTitles.map((value, index) => (
                <ProductDescriptionComponentsDiv
                  key={value}
                  content={index === mockTitles.length - 1 ? "end" : null}
                  width={
                    index === 0
                      ? "5%"
                      : index === 1
                      ? "20%"
                      : index === 2
                      ? "30%"
                      : index === 3
                      ? "20%"
                      : index === 4
                      ? "10%"
                      : "10%"
                  }
                >
                  <StyledP3>{value}</StyledP3>
                </ProductDescriptionComponentsDiv>
              ))}
            </LowerDivTitlesRow>
            {fetchedOrders?.length > 0
              ? fetchedOrders?.map((value, index) => {
                  return (
                    <>
                      <LowerDivProductRow key={value?.published_at}>
                        <ProductDescriptionComponentsDiv
                          width={"5%"}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            let array = fetchedOrdersExpand.map(
                              (value, innerIndex) =>
                                innerIndex === index ? !value : value
                            );
                            setFetchedOrdersExpand(array);
                          }}
                        >
                          <ArrowDownStyled
                            invert={fetchedOrdersExpand[index]}
                          />
                        </ProductDescriptionComponentsDiv>

                        <ProductDescriptionComponentsDiv
                          width={"20%"}
                          content="start"
                        >
                          <StyledH6>
                            {moment(value?.created_at).format("MMMM Do YYYY")}
                          </StyledH6>
                        </ProductDescriptionComponentsDiv>

                        <ProductDescriptionComponentsDiv width={"30%"}>
                          <StyledH6>{`${value.city}, ${value.address}`}</StyledH6>
                        </ProductDescriptionComponentsDiv>

                        <ProductDescriptionComponentsDiv
                          width={"20%"}
                          content="start"
                        >
                          <StyledH6>{value?.totalAmount / 100} CHF</StyledH6>
                        </ProductDescriptionComponentsDiv>

                        <ProductDescriptionComponentsDiv
                          width={"10%"}
                          content="start"
                        >
                          <StyledH6>{value?.status}</StyledH6>
                        </ProductDescriptionComponentsDiv>
                        <ProductDescriptionComponentsDiv
                          width={"10%"}
                          content="end"
                        >
                          {/* {value?.status !== "refunded" &&
                        value?.status !== "refund" ? ( */}
                          <ProductDescriptionDiv
                            style={{ cursor: "pointer" }}
                            // onClick={() => {
                            //   let array = loadingRefund.map((value, innerIndex) =>
                            //     innerIndex === index ? !value : value
                            //   );
                            //   setLoadingRefund(array);
                            //   requestRefund(value.id, index);
                            // }}
                          >
                            {/* {!requestRefund[index] ? (
                              <StyledP3>Request Refund</StyledP3>
                            ) : (
                              <StyledP3>Making Request</StyledP3>
                            )} */}
                            {/* <StyledP3>Cancel Order</StyledP3> */}
                            <StyledP3
                              onClick={(e) => {
                                setContactUsPopupEnabled(true);
                                setContactUsPopupMessage(
                                  "Enquire with us about your product"
                                );
                              }}
                            >
                              Enquire
                            </StyledP3>
                          </ProductDescriptionDiv>
                          {/* ) : null} */}
                        </ProductDescriptionComponentsDiv>
                      </LowerDivProductRow>
                      <ProductsListViewer
                        height={value?.products?.length}
                        visible={fetchedOrdersExpand[index]}
                      >
                        <>
                          <LowerDivTitlesRow
                            visible={fetchedOrdersExpand[index]}
                          >
                            {mockTitlesProducts.map(
                              (
                                mockTitlesProductsValue,
                                mockTitlesProductsValueIndex
                              ) => (
                                <ProductDescriptionComponentsDiv
                                  key={mockTitlesProductsValue}
                                  content={
                                    mockTitlesProductsValueIndex ===
                                    mockTitlesProducts.length - 1
                                      ? "end"
                                      : mockTitlesProductsValueIndex === 2
                                      ? "center"
                                      : null
                                  }
                                >
                                  <StyledP3>{mockTitlesProductsValue}</StyledP3>
                                </ProductDescriptionComponentsDiv>
                              )
                            )}
                          </LowerDivTitlesRow>
                          {value?.products?.map((productDetails) => (
                            <LowerDivProductRow
                              visible={fetchedOrdersExpand[index]}
                              key={productDetails?.product?.published_at}
                            >
                              <ProductDescriptionComponentsDiv>
                                <ProductImage
                                  checkout={true}
                                  src={productDetails?.product?.image?.url}
                                />
                              </ProductDescriptionComponentsDiv>
                              <ProductDescriptionComponentsDiv>
                                <ProductDescriptionDiv>
                                  <StyledH6>
                                    {productDetails?.product?.productTitle}
                                  </StyledH6>
                                  {/* <StyledP3>
                                  serial #{productDetails?.product?.id}
                                </StyledP3> */}
                                </ProductDescriptionDiv>
                              </ProductDescriptionComponentsDiv>
                              <ProductDescriptionComponentsDiv content="center">
                                <ProductDescriptionDiv>
                                  <Tag2>{productDetails?.size}</Tag2>
                                </ProductDescriptionDiv>
                              </ProductDescriptionComponentsDiv>
                              <ProductDescriptionComponentsDiv content="center">
                                <ProductDescriptionDiv>
                                  <Tag2>{productDetails?.weight}</Tag2>
                                </ProductDescriptionDiv>
                              </ProductDescriptionComponentsDiv>
                              <ProductDescriptionComponentsDiv content="center">
                                <ProductDescriptionDiv>
                                  <Tag2>{productDetails?.finishProp}</Tag2>
                                </ProductDescriptionDiv>
                              </ProductDescriptionComponentsDiv>
                              <ProductDescriptionComponentsDiv content="center">
                                <StyledH6>{productDetails?.quantity}</StyledH6>
                              </ProductDescriptionComponentsDiv>
                              <ProductDescriptionComponentsDiv content="end">
                                <StyledH6>
                                  {productDetails?.product?.price} CHF
                                </StyledH6>
                              </ProductDescriptionComponentsDiv>
                            </LowerDivProductRow>
                          ))}
                        </>
                        <TaxDiv>
                          <TaxDivInner>
                            <FinalDetailsHolderDiv height={"45px"}>
                              <StyledP3>SHIPPING</StyledP3>
                              <StyledH6>CHF {value?.shipping}</StyledH6>
                            </FinalDetailsHolderDiv>
                            <FinalDetailsHolderDiv height={"45px"}>
                              <StyledP3>VAT</StyledP3>
                              <StyledH6>VAT {value?.VAT}%</StyledH6>
                            </FinalDetailsHolderDiv>
                            <FinalDetailsHolderDiv grey height={"60px"}>
                              <StyledP3>TOTAL PRICE</StyledP3>
                              <StyledH6>
                                CHF {value?.totalAmount / 100}
                              </StyledH6>
                            </FinalDetailsHolderDiv>
                          </TaxDivInner>
                        </TaxDiv>
                      </ProductsListViewer>
                    </>
                  );
                })
              : null}
          </LowerScrollDiv>
        </LowerDiv>
      </InnerDiv>
    </Wrapper>
  );
};

export default PastOrdersBlock;

const LowerScrollDiv = styled.div`
  @media (max-width: 980px) {
    overflow-x: scroll;
  }
  border-bottom: 1px solid black;
`;

const FinalDetailsHolderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ height }) => height};
  border-bottom: ${({ grey }) =>
    grey ? "1px solid white" : "1px solid black"};
`;
const TaxDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: end;
  @media (max-width: 980px) {
    max-width: 300px;
  }
`;
const TaxDivInner = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    width: 100%;
    margin-top: 30px;
  }
`;

const ProductsListViewer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ visible, height }) => (visible ? height * 150 + 200 : 0)}px;
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  overflow: hidden;
  background-color: ${({ grey }) => (grey ? "black" : "white")};
  border-bottom: ${({ visible, grey }) =>
    visible ? (grey ? "1px solid white" : "1px solid black") : ""};
  @media (max-width: 980px) {
    width: max-content;
  }
`;

const ArrowDownStyled = styled(ArrowDown)`
  padding-left: 30px;
  transform: ${({ invert }) => (invert ? "rotateX(180deg)" : "none")};
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  @media (max-width: 980px) {
    padding: 0;
    width: 25px;
  }
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: black;
  border: 1px solid black;
  width: 240px;
  min-height: 30px;
  text-align: center;
  text-decoration: none;
  @media (max-width: 980px) {
    width: 45vw;
    padding: 0;
  }
`;

const DropDownContent = styled.div`
  height: 0;
  width: 242px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: #000000;
  overflow: hidden;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  @media (max-width: 980px) {
    width: 45.2vw;
    padding: 0;
    min-width: 50px;
  }
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  width: 240px;
  &:hover ${DropDownContent} {
    height: ${({ Height }) => Height * 30}px;
    @media (max-width: 980px) {
      height: ${({ Height }) => Height * 38}px;
    }
  }
  @media (max-width: 980px) {
    width: 45vw;
    padding: 0;
  }
`;

const ProductImage = styled.img`
  width: ${({ checkout }) => (checkout ? "8vw" : "16vw")};
  height: ${({ checkout }) => (checkout ? "4vw" : "8vw")};
`;

const StyledH5 = styled(H5)`
  color: ${({ grey }) => (grey ? "#cccccc" : "black")};

  @media (max-width: 980px) {
    font-size: 16px;
    line-height: 18px;
    word-break: break-all;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const StyledH6 = styled(H6)`
  color: ${({ grey }) => (grey ? "#cccccc" : "black")};

  @media (max-width: 980px) {
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.02em;
    word-break: break-all;
    text-transform: uppercase;
  }
`;

const StyledP3 = styled(P3)`
  color: ${({ grey }) => (grey ? "#cccccc" : "black")};

  @media (max-width: 980px) {
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const StyledClickableP3 = styled(P3)`
  color: #86868b;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: #555555;
  }
  transition: all 0.4s;
  @media (max-width: 980px) {
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const StyledHoverP3 = styled(P3)`
  width: 100%;
  text-align: center;
  padding: 3px 0 3px 0;
  color: ${({ shaded }) => (shaded ? "#FFFFFF" : "#c2c2c2")};
  &:hover {
    background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
    cursor: pointer;
  }
  @media (max-width: 980px) {
    padding: 15px 0 15px 0;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 11px;
    text-align: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const ProductDescriptionComponentsDiv = styled.div`
  width: ${({ width }) => (width ? width : "25%")};
  text-align: ${({ content }) =>
    content === "end" ? "right" : content === "center" ? "center" : "left"};
  @media (max-width: 980px) {
    border-bottom: ${({ borderBottom }) =>
      borderBottom ? "1px solid black" : "none"};
    width: 110px;
    padding: 10px 0 10px 0;
    text-align: center;
  }
`;

const ProductDescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpperDiv = styled.div`
  width: 100%;
  height: ${({ checkout }) => (checkout ? "100%" : "100px")};
  padding-bottom: ${({ checkout }) => (checkout ? "60px" : "100px")};
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  @media (max-width: 980px) {
    padding-bottom: 5vh;
  }
`;
const UpperDivLeft = styled.div`
  width: ${({ checkout }) => (checkout ? "100%" : "30%")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 980px) {
    width: 60%;
  }
`;
const UpperDivRight = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  @media (max-width: 980px) {
    width: 40%;
  }
`;

const LowerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const LowerDivTitlesRow = styled.div`
  gap: 40px;
  /* background-color: ${({ grey }) => (grey ? "#000000" : "")}; */
  opacity: ${({ visible }) =>
    visible === undefined || visible === true ? "1" : "0"};
  transition: opacity 0.5s;
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  /* transition-delay: 0.3s;
  transition-delay: ${({ visible }) =>
    visible === undefined || visible === true ? "0.3s" : "0s"}; */

  width: ${({ grey }) => (grey ? "96%" : "100%")};
  padding-left: ${({ grey }) => (grey ? "2%" : "0")};
  padding-right: ${({ grey }) => (grey ? "2%" : "0")};
  padding-bottom: ${({ grey }) => (grey ? "5px" : "0")};
  height: ${({ grey }) => (grey ? "1.5vh" : "4vh")};
  padding-top: 1vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ grey }) =>
    grey ? "1px solid white" : "1px solid black"};

  @media (max-width: 980px) {
    gap: ${({ extendedGap }) => (extendedGap ? "32px" : "10px")};
    width: max-content;
  }
`;
const LowerDivProductRow = styled.div`
  /* background-color: ${({ grey }) => (grey ? "#000000" : "")}; */
  gap: 40px;
  opacity: ${({ visible }) =>
    visible === undefined || visible === true ? "1" : "0"};
  transition: opacity 0.5s;
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  /* transition-delay: 0.3s; */
  /* transition-delay: ${({ visible }) =>
    visible === undefined || visible === true ? "0.3s" : "0s"}; */
  width: ${({ grey }) => (grey ? "96%" : "100%")};
  padding-left: ${({ grey }) => (grey ? "2%" : "0")};
  padding-right: ${({ grey }) => (grey ? "2%" : "0")};
  padding-bottom: ${({ grey }) => (grey ? "5px" : "0")};
  min-height: ${({ grey }) => (grey ? "50px" : "100px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ grey }) =>
    grey ? "1px solid white" : "1px solid black"};
  @media (max-width: 980px) {
    gap: 10px;
    width: max-content;
  }
`;
const InnerDiv = styled.div`
  width: ${({ checkout }) => (checkout ? "100%" : "86.8%")};
  max-width: 1600px;
  height: max-content;
  display: flex;
  flex-direction: column;
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
  padding-top: ${({ checkout }) => (checkout ? "0px" : "140px")};
  padding-bottom: ${({ checkout }) => (checkout ? "0px" : "100px")};
  align-items: center;
  @media (max-width: 980px) {
    height: max-content;
    padding-top: ${({ checkout }) => (checkout ? "0px" : "100px")};
    padding-bottom: ${({ checkout }) => (checkout ? "0px" : "40px")};
  }
`;
