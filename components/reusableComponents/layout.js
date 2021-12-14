import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import MobileMenu from "./mobileMenu";
import { FadeIn } from "animate-css-styled-components";
const Layout = ({ ChildComponent, ...props }) => {
  const [openMenu, toggleMenu] = React.useState(false);
  const [openModal, toggleModal] = React.useState(false);
  return (
    <LayoutDiv>
      <MenuDiv open={openMenu}>
        <FadeIn duration="0.5s">
          <MobileMenu
            headerLinks={props.Header}
            headerProducts={props.HeaderProducts}
            toggleMenu={toggleMenu}
            openMenu={openMenu}
            toggleModal={toggleModal}
            openModal={openModal}
          />
        </FadeIn>
      </MenuDiv>
      {!openMenu ? (
        <FadeIn duration="0.5s">
          <PageContentDiv>
            <Navbar
              headerLinks={props.Header}
              headerProducts={props.HeaderProducts}
              toggleMenu={toggleMenu}
              openMenu={openMenu}
              toggleModal={toggleModal}
              openModal={openModal}
            />
            <MobileHiderDiv open={!openModal}>
              <ChildComponent toggleModal={toggleModal} />
              <Footer footerData={props.Footer} HomeGrey={props.HomeGrey} />
            </MobileHiderDiv>
          </PageContentDiv>
        </FadeIn>
      ) : null}
    </LayoutDiv>
  );
};

export default Layout;

const LayoutDiv = styled.div`
  width: 100%;
  margin-top: 75px;
  display: flex;
  flex-direction: column;
`;

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  transition: 1s;
  display: ${({ open }) => (open ? "flex" : "none")};
  @media (min-width: 980px) {
    display: none;
    position: absolute;
  }
`;
const PageContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const MobileHiderDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 980px) {
    display: ${({ open }) => (open ? "flex" : "none")};
  }
`;
