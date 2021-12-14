import React from "react";
import Layout from "../../components/reusableComponents/layout";
import CartBlock from "../../components/cartComponents/cartBlock";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AppContext from "../../components/context/appContext";
import ContactUsPopup from "../../components/reusableComponents/contactUsPopup";
import styled from "styled-components";

const Cart = ({ allData }) => {
  const appContext = React.useContext(AppContext);
  const [contactUsPopupEnabled, setContactUsPopupEnabled] =
    React.useState(false);
  const [contactUsPopupMessage, setContactUsPopupMessage] =
    React.useState(false);
  return (
    <Layout
      Header={allData?.header}
      HeaderProducts={allData?.stratumCollection}
      Footer={allData?.footer}
      ChildComponent={(props) => (
        <>
          {contactUsPopupEnabled ? (
            <ContactUsPopup
              enabled={contactUsPopupEnabled}
              setEnabled={setContactUsPopupEnabled}
              customMessage={contactUsPopupMessage}
            />
          ) : null}
          <MobileHiderDiv openModal={contactUsPopupEnabled}>
            <CartBlock
              appContext={appContext}
              toggleModal={props.toggleModal}
              shippingDetails={allData?.shoppingCart?.shippingDetails}
              setContactUsPopupMessage={setContactUsPopupMessage}
              setContactUsPopupEnabled={setContactUsPopupEnabled}
            />
          </MobileHiderDiv>
        </>
      )}
    />
  );
};

export default Cart;

const MobileHiderDiv = styled.div`
  @media (max-width: 980px) {
    display: ${({ openModal }) => (openModal ? "none" : "block")};
  }
`;

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.STRAPI_URL + "/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        footer {
          footerParagraph
          secondBlockText
          secondBlockHeading
          thirdBlockText
          thirdBlockHeading
          shadedText
          facebookLink
          instagramLink
          linkedinLink
        }
        header {
          Languages {
            LanguageName
          }
          NavbarImage {
            url
            alternativeText
          }
          Link1
          Link2
          Link3
          Link4
          Link5
          Link6
          sub_products {
            productTitle
            category {
              name
            }
            finish {
              type
            }
            form {
              type
            }
            preset {
              type
            }
          }
        }
        stratumCollection {
          collectionProduct {
            name

            defaultProduct {
              id
              category {
                name
              }
              price
              productTitle
              finish {
                type
              }
              form {
                type
              }
              preset {
                type
              }
              image {
                alternativeText
                url
              }
              mobileImage {
                alternativeText
                url
              }
            }
            id
            image {
              url
              alternativeText
            }
            hoverImage {
              url
              alternativeText
            }
            tagline
            taglineColorLight
            order
          }
        }
        shoppingCart {
          shippingDetails {
            Area
            Alert
            active
            VAT
            Shipping
          }
        }
      }
    `,
  });

  return {
    props: {
      allData: data,
    },
  };
}
