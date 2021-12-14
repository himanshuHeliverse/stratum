import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AppContext from "../../components/context/appContext";
import Layout from "../../components/reusableComponents/layout";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import InjectedCheckoutForm from "../../components/checkoutComponents/checkoutForm";
import ConfimrationPopup from "../../components/reusableComponents/confirmationPopup";

function Checkout({ allData }) {
  const appContext = useContext(AppContext);
  const { isAuthenticated } = appContext;
  const [orderConfirmPopupEnabled, setOrderConfirmPopupEnabled] =
    React.useState(false);
  const stripePromise = loadStripe(process.env.STRIPE_API_KEY);

  return (
    <Layout
      Header={allData?.header}
      HeaderProducts={allData?.stratumCollection}
      Footer={allData?.footer}
      ChildComponent={() => (
        <div>
          {orderConfirmPopupEnabled ? (
            <ConfimrationPopup
              enabled={orderConfirmPopupEnabled}
              setEnabled={setOrderConfirmPopupEnabled}
              message={"Order Confirmed"}
            />
          ) : null}
          <div style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
            <Elements stripe={stripePromise}>
              <InjectedCheckoutForm
                context={appContext}
                setOrderConfirmPopupEnabled={setOrderConfirmPopupEnabled}
                shippingDetails={allData?.shoppingCart?.shippingDetails}
              />
            </Elements>
          </div>
        </div>
      )}
    />
  );
  // }
}
export default Checkout;

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
