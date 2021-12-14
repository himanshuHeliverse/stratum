import React from "react";
import Link from "next/link";
import { Button2, H6 } from "../fonts";
import styled from "styled-components";
import AppContext from "../context/appContext";
import { logout } from "../reusableComponents/auth";
import AuthenticationPopup from "./authenticationPopup";
import CloseButton from "../../static/images/cross-thin.svg";
import CartButton from "../../static/images/cart-icon.svg";
import FlagIcon from "../../static/images/switzerland-flag.svg";
// import Stratum from "../../static/images/stratum-logo.svg";
import Hamburger from "../../static/images/hamburger-icon.svg";

const Navbar = ({
  toggleMenu,
  openMenu,
  toggleModal,
  openModal,
  headerLinks,
  headerProducts,
}) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const appContext = React.useContext(AppContext);
  const TotalItemsCount = () => {
    let count = 0;
    appContext?.cart?.items?.map((value) => {
      count = count + value.quantity;
    });
    return count;
  };
  return (
    <>
      <Wrapper color={scrollY > 0 ? "white" : "transparent"} zIndex={openModal}>
        <LargeScreenViewEnabled>
          {openModal ? (
            <AuthenticationPopup enabled={openModal} setEnabled={toggleModal} />
          ) : null}
        </LargeScreenViewEnabled>
        <InnerDiv padding={scrollY > 0 ? true : false}>
          {!openMenu ? (
            <Link passHref href="/">
              <Logo
                src={headerLinks?.NavbarImage?.url}
                alt={headerLinks?.NavbarImage?.alternativeText}
              />
            </Link>
          ) : null}

          <HeaderSecondaryDiv>
            <LinkDiv Height={headerProducts?.collectionProduct?.length}>
              <LinkAnimationContainmentDiv>
                <LinkAnimationDiv />
                {/* <Link
                  passHref
                  href="/products/Balance/Coffee%20Table/Curvilinear/Baltic%20Birch"
                > */}
                <HeaderLinks>{headerLinks.Link1}</HeaderLinks>
                {/* </Link> */}
              </LinkAnimationContainmentDiv>
              <DropDownContent large>
                {headerProducts?.collectionProduct?.map((value) => (
                  <DropDownContentSubDiv
                    key={`${value?.defaultProduct?.finish?.type}${value?.defaultProduct?.preset?.type}${value?.defaultProduct?.form?.type}`}
                  >
                    <Link
                      passHref
                      href={`/products/${value?.defaultProduct?.category?.name}/${value?.defaultProduct?.preset?.type}/${value?.defaultProduct?.form?.type}/${value?.defaultProduct?.finish?.type}`}
                    >
                      <SubB>{value?.name}</SubB>
                    </Link>
                  </DropDownContentSubDiv>
                ))}
              </DropDownContent>
            </LinkDiv>
            <LinkDiv>
              <LinkAnimationContainmentDiv>
                <LinkAnimationDiv />
                <Link passHref href="/environments">
                  <HeaderLinks>{headerLinks.Link2}</HeaderLinks>
                </Link>
              </LinkAnimationContainmentDiv>
            </LinkDiv>
            <LinkDiv>
              <LinkAnimationContainmentDiv>
                <LinkAnimationDiv />
                <Link passHref href="/about-us">
                  <HeaderLinks>{headerLinks.Link3}</HeaderLinks>
                </Link>
              </LinkAnimationContainmentDiv>
            </LinkDiv>
            <LinkDiv Height={2}>
              {appContext.isAuthenticated ? ( <LinkAnimationContainmentDiv><LinkAnimationDiv /> 
                <HeaderLinks>{appContext?.user?.username}</HeaderLinks>
                 </LinkAnimationContainmentDiv> ) : (
                <LinkAnimationContainmentDiv>
                  <LinkAnimationDiv />
                  <HeaderLinks
                    onClick={() => {
                      toggleModal(true);
                    }}
                  >
                    {headerLinks.Link4}
                  </HeaderLinks>
                </LinkAnimationContainmentDiv>
              )}
              {appContext.isAuthenticated ? (
                <DropDownContent>
                  <DropDownContentSubDiv>
                    <Link passHref href={`/dashboard`}>
                      <SubB>Dashboard</SubB>
                    </Link>
                  </DropDownContentSubDiv>
                  <DropDownContentSubDiv
                    onClick={() => {
                      logout();
                      appContext.setUser(null);
                    }}
                  >
                    <SubB>Logout</SubB>
                  </DropDownContentSubDiv>
                </DropDownContent>
              ) : null}
            </LinkDiv>
            <LinkDiv
              Height={
                appContext?.cart?.items?.length === 0
                  ? 1
                  : appContext?.cart?.items?.length
              }
            >
              <LinkAnimationContainmentDiv>
              <CartNumber>{appContext.isAuthenticated ? appContext?.user?.cart?.items?.length:null}</CartNumber>
                <LinkAnimationDiv />
                <Link passHref href="/cart">
                  <StyledCartButton />
                </Link>
              
              </LinkAnimationContainmentDiv>
              {/* <ShoppingCartDropdownContent>
                {appContext?.cart?.items?.length === 0 ? (
                  <ShoppingCartDropdownContentText
                    style={{ textAlign: "center" }}
                  >
                    Your cart is empty!
                  </ShoppingCartDropdownContentText>
                ) : (
                  appContext?.cart?.items?.map((value) => (
                    <ShoppingCartItemsHolderDiv key={value?.productTitle}>
                      <ShoppingCartImage src={value?.image?.url} />
                      <ShoppingCartItemDetailsDiv>
                        <ShoppingCartDropdownContentText>
                          {value?.productTitle}
                        </ShoppingCartDropdownContentText>
                        <ShoppingCartDropdownContentText
                          style={{ fontSize: "10px" }}
                        >
                          quantity: {value?.quantity}
                        </ShoppingCartDropdownContentText>
                      </ShoppingCartItemDetailsDiv>
                      <ShoppingCartItemCrossDiv>
                        <StyledCloseButton
                          onClick={() => {
                            appContext.removeItem(value, true);
                          }}
                        />
                      </ShoppingCartItemCrossDiv>
                    </ShoppingCartItemsHolderDiv>
                  ))
                )}
              </ShoppingCartDropdownContent> */}
            </LinkDiv>
            <LinkDiv Height={headerLinks?.Languages?.length}>
              <LinkAnimationContainmentDiv>
                <LinkAnimationDiv />
                <StyledFlag />
                {/* <Link passHref href="/">
                  <HeaderLinks light>{headerLinks.Link6}</HeaderLinks>
                </Link> */}
              </LinkAnimationContainmentDiv>
              <DropDownContent>
                {headerLinks?.Languages?.map((value) => (
                  <DropDownContentSubDiv key={value.LanguageName}>
                    <SubB padding="0 10px 0 0">{value.LanguageName}</SubB>
                  </DropDownContentSubDiv>
                ))}
              </DropDownContent>
            </LinkDiv>
          </HeaderSecondaryDiv>
          {!openMenu ? (
            <HamburgerStyled onClick={() => toggleMenu(true)} />
          ) : null}
        </InnerDiv>
      </Wrapper>
      <MobileScreenViewEnabled>
        {openModal ? (
          <AuthenticationPopup enabled={openModal} setEnabled={toggleModal} />
        ) : null}
      </MobileScreenViewEnabled>
    </>
  );
};

export default Navbar;

const DropDownContentSubDiv = styled.div`
  width: 95%;
  padding-right: 5%;
  &:hover {
    background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
  }
`;

const CustomHeaderLinkStrong = styled.strong`
  color: white;
  padding: 2px 4px 2px 4px;
  background-color: grey;
  transition: background-color 0.3s;
  -webkit-transition: background-color 0.3s;
  -moz-transition: background-color 0.3s;
`;

// const StyledCloseButton = styled(CloseButton)`
//   cursor: pointer;
//   &:hover {
//     background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
//   }
// `;

const StyledFlag = styled(FlagIcon)`
  cursor: pointer;
  padding: 0 5px 0 5px;
  margin-top: 6px;
  height: 30px;
  /* &:hover {
    background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
  } */
`;

const StyledCartButton = styled(CartButton)`
  cursor: pointer;
  padding: 0 5px 0 5px;
  margin-top: 6px;
  height: 30px;
  /* &:hover {
    background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
  } */
`;
const CartNumber =styled.div`top: -7px;
    right: 0;
    position: absolute;
    font-weight:600;s
    font-size: 18px;
    z-index: 1;`
// const ShoppingCartItemDetailsDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   width: 40%;
// `;
// const ShoppingCartItemCrossDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   width: 10%;
// `;

// const ShoppingCartImage = styled.img`
//   width: 40%;
//   max-height: 100px;
// `;

const ShoppingCartItemsHolderDiv = styled.div`
  display: flex;
  width: 90%;
  max-height: 80px;
  min-height: 80px;
  height: 80px;
  gap: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LargeScreenViewEnabled = styled.div`
  @media (max-width: 980px) {
    display: none;
  }
`;
const MobileScreenViewEnabled = styled.div`
  @media (min-width: 980px) {
    display: none;
  }
`;

const ShoppingCartDropdownContent = styled.div`
  height: 0;
  width: 240px;
  margin: 28px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: absolute;
  background-color: #000000;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  transition: height 0.3s;
  -webkit-transition: height 0.3s;
  -moz-transition: height 0.3s;
`;

const ShoppingCartDropdownContentText = styled(H6)`
  opacity: 0;
  transition: opacity 0.8s;
  -webkit-transition: opacity 0.8s;
  -moz-transition: opacity 0.8s;
  transition-delay: opacity 0.2s;
  width: 100%;
  font-style: normal;
  font-family: Uniform;
  text-align: end;
  font-size: 16px;
  color: ${({ shaded }) => (shaded ? "#FFFFFF" : "#c2c2c2")};
`;

const DropDownContent = styled.div`
  height: 0;
  width: ${({ large }) => (large ? "230px" : "180px")};
  margin: 28px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;

  align-items: center;
  justify-content: center;

  padding: 0;
  position: absolute;
  background-color: #000000;
  overflow: hidden;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  transition: height 0.3s;
  -webkit-transition: height 0.3s;
  -moz-transition: height 0.3s;
`;

const SubB = styled(H6)`
  opacity: 0;
  padding: 10px 0 10px 0px;
  transition: opacity 0.8s;
  -webkit-transition: opacity 0.8s;
  -moz-transition: opacity 0.8s;
  transition-delay: opacity 0.2s;
  text-align: right;
  font-size: 18px;
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: ${({ shaded }) => (shaded ? "#FFFFFF" : "#c2c2c2")};
  &:hover {
    background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
  }
`;

const LinkAnimationDiv = styled.div`
  position: absolute;
  width: 0;
  height: 30px;
  z-index: -1;
  background-color: #000000;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
`;

const LinkAnimationDivUnderlineVariant = styled.div`
  position: absolute;
  width: 0;
  height: 30px;
  z-index: -1;
  border-bottom: black solid 1px;
  transition: 0.3s;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
`;

const LinkAnimationContainmentDiv = styled.div`
  position: relative;
  cursor: pointer;
  height: 30px;
  width: 100%;
`;

const HeaderLinks = styled(Button2)`
  padding: 3px 6px 3px 6px !important;
  cursor: pointer;
  text-align: center;
  transition: 0.6s;
  -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  color: ${({ light }) => (light ? "#86868B" : "#29292b")};
`;

const LinkDiv = styled.div`
  margin: 0 20px 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  &:hover {
    ${DropDownContent} {
      height: ${({ Height }) => Height * 50}px;
    }
  }
  &:hover {
    ${CustomHeaderLinkStrong} {
      background-color: black;
    }
  }
  &:hover {
    ${ShoppingCartDropdownContent} {
      height: ${({ Height }) => Height * 120}px;
    }
  }

  &:hover {
    ${ShoppingCartDropdownContentText} {
      opacity: 1;
    }
  }
  &:hover {
    ${SubB} {
      opacity: 1;
    }
  }
  &:hover {
    ${LinkAnimationDiv} {
      width: 100%;
    }
  }
  &:hover {
    ${LinkAnimationDivUnderlineVariant} {
      width: 100%;
    }
  }
  &:hover {
    ${HeaderLinks} {
      color: white;
    }
  }
`;

const HamburgerStyled = styled(Hamburger)`
  cursor: pointer;
  padding: 2%;
  margin: 0 4.5% 0 0;
  @media (min-width: 980px) {
    display: none;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  padding: 0;
  width: 300px;
  margin-left: 10px;
  @media (max-width: 1200px) {
    width: 200px;
    @media (max-width: 1065px) {
      width: 160px;
      @media (max-width: 1028px) {
        width: 115px;
        @media (max-width: 980px) {
          width: 160px;
          margin: 0 0 0 6.5%;
          padding: 0;
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  height: 66px;
  width: 100vw;
  padding: 0 1.5vw 0 0;
  box-sizing: border-box;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 101;
  /* background-color: ${({ color }) => color}; */
  background-color: white;
  @media (max-width: 980px) {
    z-index: ${({ zIndex }) => (zIndex ? -1 : 101)};
    width: 100vw;
    padding: 0;
  }
`;

const InnerDiv = styled.div`
  /* padding: ${({ padding }) => (padding ? "0 10px 0 10px" : "0")}; */
  padding: 0;
  box-sizing: border-box;
  transition: all 0.3s;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  height: 66px;
  width: 100%;
  max-width: 2000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 980px) {
    padding: 0;
  }
`;
const HeaderSecondaryDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* gap: 15px; */
  @media (max-width: 980px) {
    display: none;
  }
`;
