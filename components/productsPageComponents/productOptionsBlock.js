import React from "react";
import styled from "styled-components";
import { Button2, H5, H6, Tag2, Tagline2 } from "../fonts";
// import ArIcon from "../../static/images/ar-icon.svg";
import AppContext from "../context/appContext";
import ArrowDown from "../../static/images/arrow-down.svg";
import { useRouter } from "next/router";
import {
  BlackButton,
  BlackButtonText,
} from "../reusableComponents/blackButton";

const ProductOptionsBlock = ({ products, category }) => {
  const router = useRouter();
  const appContext = React.useContext(AppContext);
  const queryParams = useRouter().query;
  const [productImageOpacity, setProductImageOpacity] = React.useState(0);
  const [presetParam, setPresetParam] = React.useState(queryParams?.slug[1]);
  const [formParam, setFormParam] = React.useState(queryParams?.slug[2]);
  const [finishParam, setFinishParam] = React.useState(queryParams?.slug[3]);
  const [previousImage, setPreviousImage] = React.useState("");
  const [previousImageMobile, setPreviousImageMobile] = React.useState("");

  const [hoverState, setHoverState] = React.useState({ drop: 0, open: false });

  const [hoverStateMobile, setHoverStateMobile] = React.useState({ drop: 0 });

  const getProduct = () => {
    return products.find(
      (value) =>
        value?.preset?.type === queryParams?.slug[1] &&
        value?.form?.type === queryParams?.slug[2] &&
        value?.finish?.type === queryParams?.slug[3]
    );
  };

  React.useEffect(() => {
    setProductImageOpacity(1);
    if (formParam === "" || formParam === undefined || formParam === null) {
      setFormParam("Angular");
    }
    if (
      finishParam === "" ||
      finishParam === undefined ||
      finishParam === null
    ) {
      setFinishParam("Baltic Birch");
    }
    if (
      presetParam === "" ||
      presetParam === undefined ||
      presetParam === null
    ) {
      setPresetParam("High Table");
    }
  }, []);

  const handleClick = (e, path, type, value) => {
    e.preventDefault();
    localStorage.setItem("previousImage", getProduct()?.image?.url);
    localStorage.setItem("previousImageMobile", getProduct()?.mobileImage?.url);
    setPreviousImage(getProduct()?.image?.url);
    setPreviousImageMobile(getProduct()?.mobileImage?.url);
    if (type === "form" && value !== formParam) {
      setProductImageOpacity(0.5);
      router.push(path, path, { scroll: false, shallow: true });
    } else if (type === "preset" && value !== presetParam) {
      setProductImageOpacity(0.5);
      router.push(path, path, { scroll: false, shallow: true });
    } else if (type === "finish" && value !== finishParam) {
      setProductImageOpacity(0.5);
      router.push(path, path, { scroll: false, shallow: true });
    }
  };
  React.useEffect(() => {
    setPreviousImage(localStorage.getItem("previousImage"));
    setPreviousImageMobile(localStorage.getItem("previousImageMobile"));
    localStorage.setItem("previousImage", getProduct()?.image?.url);
    localStorage.setItem("previousImageMobile", getProduct()?.mobileImage?.url);
    if (localStorage.getItem("dropdownHover1") === "true")
      setHoverState({ drop: 1, open: true });
    else if (localStorage.getItem("dropdownHover2") === "true")
      setHoverState({ drop: 2, open: true });
    else if (localStorage.getItem("dropdownHover3") === "true")
      setHoverState({ drop: 3, open: true });
    else setHoverState({ drop: 0, open: false });
  }, []);
  return (
    <>
      <Wrapper>
        <BackgroundImageDiv>
          <BackgroundImage
            src={previousImage}
            imageOpacity={1 - (productImageOpacity % 1)}
          />
          <BackgroundImage
            url={getProduct()?.image?.formats?.small?.url}
            src={getProduct()?.image?.url}
            imageOpacity={productImageOpacity}
          />
          <BackgroundImage
            mobile
            src={previousImageMobile}
            imageOpacity={1 - (productImageOpacity % 1)}
          />
          <BackgroundImage
            mobile
            url={
              getProduct()?.mobileImage?.formats?.small?.url
                ? getProduct()?.mobileImage?.formats?.small?.url
                : getProduct()?.image?.formats?.small?.url
            }
            src={
              getProduct()?.mobileImage?.url
                ? getProduct()?.mobileImage?.url
                : getProduct()?.image?.url
            }
            imageOpacity={productImageOpacity}
          />
        </BackgroundImageDiv>
        <InnerDiv>
          <TopContent>
            <ProductOptionDiv>
              <Tagline2Styled>preset</Tagline2Styled>
              <ProductOptionButton>
                <DropDownLi
                  onMouseEnter={() => {
                    localStorage.setItem("dropdownHover1", true);
                    setHoverState({ drop: 1, open: true });
                  }}
                  onMouseLeave={() => {
                    localStorage.setItem("dropdownHover1", false);
                    setHoverState({ drop: 0, open: false });
                  }}
                  onClick={() => {
                    if (hoverStateMobile.drop !== 1) {
                      setHoverStateMobile({ drop: 1 });
                    } else {
                      setHoverStateMobile({ drop: 0 });
                    }
                  }}
                  Height={category?.Preset?.length}
                >
                  <Dropbtn>
                    <ArrowSVGDiv>
                      <ArrowDown viewBox="0 0 1800 1800" />
                    </ArrowSVGDiv>
                    <ArrowSVGDivMobile
                      invert={hoverStateMobile.drop === 1 ? true : false}
                    >
                      <ArrowDown viewBox="0 0 2750 2750" />
                    </ArrowSVGDivMobile>
                    <Button2 noHover>{presetParam}</Button2>
                  </Dropbtn>
                  <DropDownContent
                    hoverTrigger={
                      hoverState.drop === 1 ? hoverState.open : false
                    }
                    hoverTriggerMobile={
                      hoverStateMobile.drop === 1 ? true : false
                    }
                    Height={category?.Preset?.length}
                  >
                    {category?.Preset.map((value) => (
                      <SubB
                        onClick={(e) =>
                          handleClick(
                            e,
                            `/products/${category?.name}/${value.type}/${formParam}/${finishParam}`,
                            "preset",
                            value.type
                          )
                        }
                        key={value.type}
                        shaded={value.type === presetParam}
                      >
                        {value.type}
                      </SubB>
                    ))}
                  </DropDownContent>
                </DropDownLi>
              </ProductOptionButton>
            </ProductOptionDiv>
            <ProductOptionDiv>
              <Tagline2Styled>form</Tagline2Styled>
              <ProductOptionButton>
                <DropDownLi
                  onMouseEnter={() => {
                    localStorage.setItem("dropdownHover2", true);
                    setHoverState({ drop: 2, open: true });
                  }}
                  onMouseLeave={() => {
                    localStorage.setItem("dropdownHover2", false);
                    setHoverState({ drop: 0, open: false });
                  }}
                  onClick={() => {
                    if (hoverStateMobile.drop !== 2) {
                      setHoverStateMobile({ drop: 2 });
                    } else {
                      setHoverStateMobile({ drop: 0 });
                    }
                  }}
                  Height={category?.Form?.length}
                >
                  <Dropbtn onClick={() => {}}>
                    <ArrowSVGDiv>
                      <ArrowDown viewBox="0 0 1800 1800" />
                    </ArrowSVGDiv>
                    <ArrowSVGDivMobile
                      invert={hoverStateMobile.drop === 2 ? true : false}
                    >
                      <ArrowDown viewBox="0 0 2750 2750" />
                    </ArrowSVGDivMobile>
                    <Button2 noHover>{formParam}</Button2>
                  </Dropbtn>
                  <DropDownContent
                    hoverTrigger={
                      hoverState.drop === 2 ? hoverState.open : false
                    }
                    hoverTriggerMobile={
                      hoverStateMobile.drop === 2 ? true : false
                    }
                    Height={category?.Form?.length}
                  >
                    {category?.Form.map((value) => (
                      <SubB
                        onClick={(e) =>
                          handleClick(
                            e,
                            `/products/${category?.name}/${presetParam}/${value.type}/${finishParam}`,
                            "form",
                            value.type
                          )
                        }
                        key={value.type}
                        shaded={value.type === formParam}
                      >
                        {value.type}
                      </SubB>
                    ))}
                  </DropDownContent>
                </DropDownLi>
              </ProductOptionButton>
            </ProductOptionDiv>
            <ProductOptionDiv>
              <Tagline2Styled>finish</Tagline2Styled>
              <ProductOptionButton>
                <DropDownLi
                  onMouseEnter={() => {
                    localStorage.setItem("dropdownHover3", true);
                    setHoverState({ drop: 3, open: true });
                  }}
                  onMouseLeave={() => {
                    localStorage.setItem("dropdownHover3", false);
                    setHoverState({ drop: 0, open: false });
                  }}
                  onClick={() => {
                    if (hoverStateMobile.drop !== 3) {
                      setHoverStateMobile({ drop: 3 });
                    } else {
                      setHoverStateMobile({ drop: 0 });
                    }
                  }}
                  Height={category?.Finish?.length}
                >
                  <Dropbtn>
                    <ArrowSVGDiv>
                      <ArrowDown viewBox="0 0 1800 1800" />
                    </ArrowSVGDiv>
                    <ArrowSVGDivMobile
                      invert={hoverStateMobile.drop === 3 ? true : false}
                    >
                      <ArrowDown viewBox="0 0 2750 2750" />
                    </ArrowSVGDivMobile>
                    <Button2 noHover>{finishParam}</Button2>
                  </Dropbtn>
                  <DropDownContent
                    hoverTrigger={
                      hoverState.drop === 3 ? hoverState.open : false
                    }
                    hoverTriggerMobile={
                      hoverStateMobile.drop === 3 ? true : false
                    }
                    Height={category?.Finish?.length}
                  >
                    {category?.Finish.map((value) => (
                      <SubB
                        onClick={(e) =>
                          handleClick(
                            e,
                            `/products/${category?.name}/${presetParam}/${formParam}/${value.type}`,
                            "finish",
                            value.type
                          )
                        }
                        key={value.type}
                        shaded={value.type === finishParam}
                      >
                        {value.type}
                      </SubB>
                    ))}
                  </DropDownContent>
                </DropDownLi>
              </ProductOptionButton>
            </ProductOptionDiv>
          </TopContent>
          <BottomContent>
            <BottomContentSubDiv>
              <BlackButton>
                <BlackButtonText
                  onClick={() => {
                    appContext.addItem(getProduct());
                    alert("Add to cart")
                  }}
                >
                  add to cart
                </BlackButtonText>
              </BlackButton>
              <Tagline2>
                {getProduct()?.price ? "CHF" : null} {getProduct()?.price}
              </Tagline2>
            </BottomContentSubDiv>
            {/* <ArIcon viewBox="0 0 70 70" /> */}
          </BottomContent>
        </InnerDiv>
      </Wrapper>
    </>
  );
};

export default ProductOptionsBlock;

const ArrowSVGDiv = styled.div`
  width: 35px;
  height: 20px;
  margin: -10px 4px 0 4px;
  @media (max-width: 980px) {
    display: none;
  }
`;

const Tagline2Styled = styled(Tagline2)`
  color: #4c4c4c;
`;

const ArrowSVGDivMobile = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 4px;
  margin-top: -1px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  transform: ${({ invert }) => (invert ? "rotateX(180deg)" : null)};
  @media (min-width: 980px) {
    display: none;
  }
`;
const ProductOptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 980px) {
    justify-content: center;
    text-align: center;
  }
`;

const StyledLi = styled.li`
  float: left;
`;

const Dropbtn = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: black;
  width: 255px;
  height: 46px;
  text-align: center;
  text-decoration: none;
  @media (max-width: 980px) {
    justify-content: center;
    height: 35px;
    width: 28vw;
    padding: 0;
  }
`;

const DropDownContent = styled.div`
  height: 0;
  width: 255px;
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
  -webkit-transition: 0.4s;
  transition: 0.4s;
  @media (max-width: 980px) {
    width: 28vw;
    padding: 0;
    min-width: 50px;
    ${({ hoverTriggerMobile, Height }) =>
      hoverTriggerMobile
        ? `
    height: ${Height * 30}px;
    @media (max-width: 980px) {
      height: ${Height * 38}px;
    }
  `
        : null}
  }
  @media (min-width: 980px) {
    ${({ hoverTrigger, Height }) =>
      hoverTrigger
        ? `
    height: ${Height * 30}px;
    @media (max-width: 980px) {
      height: ${Height * 38}px;
    }
  `
        : null}
  }
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;
  @media (min-width: 980px) {
    &:hover ${DropDownContent} {
      height: ${({ Height }) => Height * 30}px;
      @media (max-width: 980px) {
        height: ${({ Height }) => Height * 38}px;
      }
    }
  }
`;

const SubA = styled(H6)`
  &:hover {
    background-color: ${({ noHover }) => (noHover ? "none" : "#f1f1f1")};
  }
  @media (max-width: 980px) {
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const SubB = styled(H6)`
  width: 100%;
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
    line-height: 10px;
    text-align: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

const PriceText = styled(Tag2)`
  margin: 4px 0 0 0;
  color: black !important;
  margin-top: 5px !important;

  @media (max-width: 980px) {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
`;

const ProductOptionButton = styled.button`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  height: 46px;
  min-height: max-content;
  width: max-content;
  border: none;
  border-radius: 1px;
  margin: 0 0 10px 0;
  @media (max-width: 980px) {
    min-width: max-content;
    width: 80px;
    height: 35px;
    margin: 0 0 0 10px;
    padding: 0;
    @media (max-width: 630px) {
      width: 28vw;
      margin: 0;
      padding: 0;
    }
  }
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 980px) {
    padding: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
  }
`;

const BottomContentSubDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 980px) {
    flex-direction: column;
  }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 75vw;
    padding: 0 5vw 0 5vw;
    margin-top: -16px;
    @media (max-width: 630px) {
      justify-content: space-between;
      width: 90vw;
      padding: 0 5vw 0 5vw;
    }
  }
`;

const BackgroundImageDiv = styled.div`
  overflow: hidden;
  z-index: -1;
  width: 100vw;
  height: 50vw;
  position: absolute;
  display: flex;
  @media (max-width: 980px) {
    width: 100vw;
    height: 100vw;
    justify-content: center;
    align-items: center;
  }
`;

const BackgroundImage = styled.img`
  background: url(${({ url }) => url}) no-repeat;
  background-size: 100% 50vw;
  display: ${({ mobile }) => (mobile ? "none" : "block")};
  opacity: ${({ imageOpacity }) => imageOpacity};
  /* filter: blur(${({ imageOpacity }) => imageOpacity}px); */
  width: 100vw;
  height: 50vw;
  position: absolute;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  @media (max-width: 980px) {
    width: 100vw;
    height: 100vw;
    display: ${({ mobile }) => (!mobile ? "none" : "block")};
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  max-width: 1600px;
  height: 80%;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 980px) {
    justify-content: flex-end;
    padding: 0;
    margin: 0;
    height: 100vw;
    width: 100%;
    gap: 20px;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 50vw;
  min-height: max-content;
  overflow: hidden;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  @media (max-width: 980px) {
    justify-content: flex-start;
    flex-direction: column;
    height: max-content;
  }
`;
