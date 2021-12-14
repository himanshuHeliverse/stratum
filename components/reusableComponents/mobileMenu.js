import React from "react";
import styled from "styled-components";
import CloseButton from "../../static/images/cross.svg";
import { H6 } from "../fonts";
import { logout } from "../reusableComponents/auth";
import AuthenticationPopup from "./authenticationPopup";
import { useRouter } from "next/router";
import AppContext from "../context/appContext";

const MobileMenu = ({
  toggleMenu,
  openMenu,
  toggleModal,
  openModal,
  headerLinks,
  headerProducts,
}) => {
  const router = useRouter();
  const appContext = React.useContext(AppContext);
  const [expandedProducts, setExpandedProducts] = React.useState(false);
  const [expandedLanguages, setExpandedLanguages] = React.useState(false);
  const [expandedUserOptions, setExpandedUserOptions] = React.useState(false);
  const handleClick = (e, path) => {
    e.preventDefault();
    toggleMenu(false);
    router.push(path);
  };

  return (
    <Wrapper backgroundBlack={!openMenu}>
      {openModal ? (
        <AuthenticationPopup enabled={openModal} setEnabled={toggleModal} />
      ) : null}
      <Nav>
        <CloseButton
          style={{ padding: "2%", margin: "5% 0 0 5%", fill: "white" }}
          onClick={() => toggleMenu(false)}
        />
      </Nav>
      <div style={{ marginTop: "36px" }}>
        <UL>
          <LI>
            <HeaderLinks
              onClick={(e) => setExpandedProducts(!expandedProducts)}
            >
              {headerLinks.Link1}
            </HeaderLinks>
          </LI>
          {expandedProducts
            ? headerProducts?.collectionProduct?.map((value) => (
                <LI
                  key={`${value?.defaultProduct?.finish?.type}${value?.defaultProduct?.preset?.type}${value?.defaultProduct?.form?.type}`}
                >
                  <HeaderLinks
                    onClick={(e) =>
                      handleClick(
                        e,
                        `/products/${value?.defaultProduct?.category?.name}/${value?.defaultProduct?.preset?.type}/${value?.defaultProduct?.form?.type}/${value?.defaultProduct?.finish?.type}`
                      )
                    }
                    style={{ fontSize: "15px", color: "#a1a1a1" }}
                  >
                    {value?.name}
                  </HeaderLinks>
                </LI>
              ))
            : null}
          <LI>
            <HeaderLinks onClick={(e) => handleClick(e, "/environments")}>
              {headerLinks.Link2}
            </HeaderLinks>
          </LI>
          <LI>
            <HeaderLinks onClick={(e) => handleClick(e, "/about-us")}>
              {headerLinks.Link3}
            </HeaderLinks>
          </LI>
          <LI>
            {!appContext.isAuthenticated ? (
              <HeaderLinks
                onClick={() => {
                  toggleModal(true);
                  toggleMenu(false);
                }}
                light
              >
                {headerLinks.Link4}
              </HeaderLinks>
            ) : (
              <HeaderLinks
                onClick={() => {
                  setExpandedUserOptions(!expandedUserOptions);
                }}
                light
              >
                {appContext?.user?.username}
              </HeaderLinks>
            )}
          </LI>
          {expandedUserOptions ? (
            <>
              <LI>
                <HeaderLinks
                  onClick={(e) => handleClick(e, `/dashboard`)}
                  style={{ fontSize: "15px", color: "#a1a1a1" }}
                >
                  Dashboard
                </HeaderLinks>
              </LI>
              <LI>
                <HeaderLinks
                  onClick={(e) => {
                    logout();
                    appContext.setUser(null);
                    setExpandedUserOptions(false);
                  }}
                  style={{ fontSize: "15px", color: "#a1a1a1" }}
                >
                  Logout
                </HeaderLinks>
              </LI>
            </>
          ) : null}
          <LI>
            <HeaderLinks onClick={(e) => handleClick(e, "/cart")} light>
              {headerLinks.Link5}
            </HeaderLinks>
          </LI>
          <LI>
            <HeaderLinks
              onClick={(e) => setExpandedLanguages(!expandedLanguages)}
              light
            >
              {headerLinks.Link6}
            </HeaderLinks>
          </LI>
          {expandedLanguages
            ? headerLinks?.Languages?.map((value) => (
                <LI key={value.LanguageName}>
                  <HeaderLinks style={{ fontSize: "15px", color: "#a1a1a1" }}>
                    {value.LanguageName}
                  </HeaderLinks>
                </LI>
              ))
            : null}
        </UL>
      </div>
    </Wrapper>
  );
};

export default MobileMenu;

const HeaderLinks = styled(H6)`
  cursor: pointer;
  margin: 25px 30px 0 0;
  color: ${({ light }) => (light ? "white" : "white")};
`;

const Wrapper = styled.div`
  background: ${({ backgroundBlack }) =>
    !backgroundBlack ? "black" : "white"};

  min-height: 100vh;
  margin-top: -75px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const UL = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 6px;
`;
const LI = styled.li`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: right;
  color: #ffffff;
`;
// const IconsRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
//   margin-top: 72px;
//   gap: 24px;
// `;
