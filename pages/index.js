import React from "react";
import HeroBlock from "../components/homeComponents/heroBlock";
import CollectionBlock from "../components/homeComponents/collectionBlock";
import OurPhilosophyBlock from "../components/homeComponents/videoBlock";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Layout from "../components/reusableComponents/layout";
import AppContext from "../components/context/appContext";
import Head from "next/head";
const Home = ({ allData }) => {
  const appContext = React.useContext(AppContext);
  React.useEffect(() => {
    if (appContext?.scrollToCollection === true) {
      let anchorTarget = "#stratum_collection";
      const anchor = document.querySelector(anchorTarget);
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      appContext?.setScrollToCollection(false);
    }
  });
  return (
    <Layout
      Header={allData?.header}
      HeaderProducts={allData?.stratumCollection}
      Footer={allData?.footer}
      HomeGrey
      ChildComponent={() => (
        <>
          <Head>
            <title>Stratum</title>
            <meta name="description" content="Stratum" />
            <link rel="icon" href="./static/images/stratum-logo.svg" />
          </Head>
          <HeroBlock data={allData?.homepage?.topSection} />
          <div id="stratum_collection">
            <CollectionBlock
              data={allData?.homepage?.imagesComponent}
              products={allData?.stratumCollection?.collectionProduct}
            />
            <OurPhilosophyBlock data={allData?.homepage?.videoComponent} />
          </div>
        </>
      )}
    />
  );
};

export default Home;

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
            mobileImage {
              url
              alternativeText
            }
            mobileHoverImage {
              url
              alternativeText
            }
            tagline
            taglineColorLight
            order
          }
        }
        homepage {
          topSection {
            heading
            subheading
            buttonText
            CarouselProducts {
              headingLight
              button
              heroImage {
                url
                alternativeText
                formats
              }
              mobileImage {
                url
                alternativeText
                formats
              }
              sub_product {
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
                image {
                  url
                  alternativeText
                }
                mobileImage {
                  url
                  alternativeText
                }
              }
              button
            }
          }
          imagesComponent {
            heading
            subheading
            productsToDisplay
          }
          videoComponent {
            heading
            subheading
            showText
            paragraph
            video {
              alternativeText
              url
            }
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
