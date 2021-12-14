import React from "react";
import Layout from "../../components/reusableComponents/layout";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import ContactUsPopup from "../../components/reusableComponents/contactUsPopup";
import MainImageBlock from "../../components/environmentComponents/mainImageBlock";
import HeaderBlocks from "../../components/environmentComponents/headerBlocks";
import ImageParagraphBlock from "../../components/environmentComponents/imageParagraphBlock";
import CarouselBlock from "../../components/environmentComponents/carouselBlock";
import ContactUsBlock from "../../components/environmentComponents/contactUsBlock";
import styled from "styled-components";

const Environments = ({ allData }) => {
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
              <MainImageBlock
                image={allData?.environment?.heroImage}
                imageMobile={allData?.environment?.heroImageMobile}
                heroImageTitlePart1={allData?.environment?.heroImageTitlePart1}
                heroImageTitlePart2={allData?.environment?.heroImageTitlePart2}
              />
              <HeaderBlocks
                paragraphWithStrongStart={
                  allData?.environment?.ParagraphWithStrongStart
                }
                HeadingAndText={allData?.environment?.HeadingAndText}
              />
              <ImageParagraphBlock
                green
                invert
                title={allData?.environment?.imageParagraph[0].title}
                paragraph={allData?.environment?.imageParagraph[0].paragraph}
                image={allData?.environment?.imageParagraph[0].image.url}
                imageAlt={
                  allData?.environment?.imageParagraph[0].image.alternativeText
                }
              />
              <ImageParagraphBlock
                yellow
                title={allData?.environment?.imageParagraph[1].title}
                paragraph={allData?.environment?.imageParagraph[1].paragraph}
                image={allData?.environment?.imageParagraph[1].image.url}
                imageAlt={
                  allData?.environment?.imageParagraph[1].image.alternativeText
                }
              />
              <CarouselBlock
                CarouselImages={allData?.environment?.CarouselImages}
                CarouselImagesMobile={
                  allData?.environment?.CarouselImagesMobile
                }
              />
              <ContactUsBlock
                title={allData?.environment?.contact?.heading}
                paragraph={allData?.environment?.contact?.paragraph}
                buttonText={allData?.environment?.contact?.buttonText}
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

export default Environments;

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
        environment {
          heroImageTitlePart1
          heroImageTitlePart2
          CarouselImages {
            url
            alternativeText
          }
          CarouselImagesMobile {
            url
            alternativeText
          }
          contact {
            heading
            paragraph
            buttonText
          }
          ParagraphWithStrongStart {
            paragraph
            StrongText
          }
          HeadingAndText {
            heading
            subheading
          }
          imageParagraph {
            image {
              alternativeText
              url
            }
            paragraph
            title
          }
          heroImage {
            alternativeText
            url
          }
          heroImageMobile {
            alternativeText
            url
          }
        }
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
                formats
              }
              mobileImage {
                alternativeText
                url
                formats
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
