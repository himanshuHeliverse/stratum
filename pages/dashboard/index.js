import React, { useContext } from "react";
import Layout from "../../components/reusableComponents/layout";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import PastOrdersBlock from "../../components/dashboardComponents/pastOrdersBlock";
import AppContext from "../../components/context/appContext";
import ConfimrationPopup from "../../components/reusableComponents/confirmationPopup";
import ContactUsPopup from "../../components/reusableComponents/contactUsPopup";
import styled from "styled-components";

const Dashboard = ({ allData }) => {
  const appContext = useContext(AppContext);
  const [contactUsPopupEnabled, setContactUsPopupEnabled] =
    React.useState(false);
  const [contactUsPopupMessage, setContactUsPopupMessage] =
    React.useState(false);
  const [orderCancelPopupEnabled, setOrderCancelPopupEnabled] =
    React.useState(false);

  return (
    <Layout
      Header={allData?.header}
      Footer={allData?.footer}
      HeaderProducts={allData?.stratumCollection}
      ChildComponent={() => (
        <>
          {orderCancelPopupEnabled ? (
            <ConfimrationPopup
              enabled={orderCancelPopupEnabled}
              setEnabled={setOrderCancelPopupEnabled}
              message={"Order Refunded"}
            />
          ) : null}
          {contactUsPopupEnabled ? (
            <ContactUsPopup
              enabled={contactUsPopupEnabled}
              setEnabled={setContactUsPopupEnabled}
              customMessage={contactUsPopupMessage}
            />
          ) : null}
          <MobileHiderDiv
            openModal={contactUsPopupEnabled || orderCancelPopupEnabled}
          >
            <PastOrdersBlock
              appContext={appContext}
              setOrderCancelPopupEnabled={setOrderCancelPopupEnabled}
              setContactUsPopupEnabled={setContactUsPopupEnabled}
              setContactUsPopupMessage={setContactUsPopupMessage}
            />
          </MobileHiderDiv>
        </>
      )}
    />
  );
};

export default Dashboard;

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
      }
    `,
  });

  return {
    props: {
      allData: data,
    },
  };
}
