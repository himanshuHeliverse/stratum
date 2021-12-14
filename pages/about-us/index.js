import React from "react";
import ContactUsBlock from "../../components/aboutComponents/contactUsBlock";
import MainBlock from "../../components/aboutComponents/mainBlock";
import DynamicBlock from "../../components/aboutComponents/dynamicBlock";
import ContactUsPopup from "../../components/reusableComponents/contactUsPopup";
import Layout from "../../components/reusableComponents/layout";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styled from "styled-components";

const About = ({ allData }) => {
  const [openModal, toggleModal] = React.useState(false);
  return (
    <>
      {openModal ? (
        <ContactUsPopup enabled={openModal} setEnabled={toggleModal} />
      ) : null}
      <MobileHiderDiv openModal={openModal}>
        <Layout
          Header={allData?.header}
          HeaderProducts={allData?.stratumCollection}
          Footer={allData?.footer}
          ChildComponent={() => (
            <div>
              <MainBlock
                title={allData?.about?.aboutUsBlocks[0]?.heading}
                paragraph={allData?.about?.aboutUsBlocks[0]?.paragraph}
                image={allData?.about?.aboutUsBlocks[0]?.image?.url}
                imageAlt={
                  allData?.about?.aboutUsBlocks[0]?.image?.alternativeText
                }
              />
              <DynamicBlockHolder>
                <DynamicBlock
                  title={allData?.about?.aboutUsBlocks[1]?.heading}
                  paragraph={allData?.about?.aboutUsBlocks[1]?.paragraph}
                  image={allData?.about?.aboutUsBlocks[1]?.image?.url}
                  imageAlt={
                    allData?.about?.aboutUsBlocks[1]?.image?.alternativeText
                  }
                />
                <DynamicBlock
                  shiftLeft
                  title={allData?.about?.aboutUsBlocks[2]?.heading}
                  paragraph={allData?.about?.aboutUsBlocks[2]?.paragraph}
                  image={allData?.about?.aboutUsBlocks[2]?.image?.url}
                  imageAlt={
                    allData?.about?.aboutUsBlocks[2]?.image?.alternativeText
                  }
                />
                <DynamicBlock
                  invert
                  title={allData?.about?.aboutUsBlocks[3]?.heading}
                  paragraph={allData?.about?.aboutUsBlocks[3]?.paragraph}
                  image={allData?.about?.aboutUsBlocks[3]?.image?.url}
                  imageAlt={
                    allData?.about?.aboutUsBlocks[3]?.image?.alternativeText
                  }
                />
              </DynamicBlockHolder>
              <ContactUsBlock
                title={allData?.about?.ctaBlock?.heading}
                paragraph={allData?.about?.ctaBlock?.paragraph}
                buttonText={allData?.about?.ctaBlock?.buttonText}
                openModal={openModal}
                toggleModal={toggleModal}
              />
            </div>
          )}
        />
      </MobileHiderDiv>
    </>
  );
};

export default About;
const DynamicBlockHolder = styled.div`
  padding: 200px 0 200px 0;
  background: #e6e6e6;
  @media (max-width: 980px) {
    padding: 0;
  }
`;
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
        about {
          id
          shadedHeading
          aboutUsBlocks {
            image {
              alternativeText
              url
            }
            heading
            paragraph
          }
          ctaBlock {
            heading
            paragraph
            buttonText
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
