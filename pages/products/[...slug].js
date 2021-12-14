import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/reusableComponents/layout";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import BalanceBlock from "../../components/productsPageComponents/balanceBlock";
import MaterialBlock from "../../components/productsPageComponents/materialBlock";
import SpecificationsBlock from "../../components/productsPageComponents/specificationsBlock";
import GetInspiredBlock from "../../components/productsPageComponents/getInspiredBlock";
import OtherProductsBlock from "../../components/productsPageComponents/otherProductsBlock";
import ProductOptionsBlock from "../../components/productsPageComponents/productOptionsBlock";
import { Tagline4 } from "../../components/fonts";
import AppContext from "../../components/context/appContext";
import ContactUsPopup from "../../components/reusableComponents/contactUsPopup";
import styled from "styled-components";

const Product = ({ allData }) => {
  const appContext = React.useContext(AppContext);
  const router = useRouter();
  const queryParams = useRouter().query;
  const [popupEnabled, setPopupEnabled] = React.useState(false);

  const getProduct = (products) => {
    return products.find(
      (value) =>
        value?.preset?.type === queryParams?.slug[1] &&
        value?.form?.type === queryParams?.slug[2] &&
        value?.finish?.type === queryParams?.slug[3]
    );
  };
  return (
    <Layout
      Header={allData?.header}
      HeaderProducts={allData?.stratumCollection}
      Footer={allData?.footer}
      ChildComponent={() => (
        <>
          {popupEnabled ? (
            <ContactUsPopup
              enabled={popupEnabled}
              setEnabled={setPopupEnabled}
              customMessage={allData?.contactUsFormProductsPage?.Dialogue}
            />
          ) : null}

          <MobileHiderDiv openModal={popupEnabled}>
            <div id="options">
              <ProductOptionsBlock
                products={allData?.products}
                category={allData?.categories[0]}
              />
            </div>
            <TitleHolder>
              <Tagline4>Product Description</Tagline4>
              <HorizontalLine />
            </TitleHolder>
            <div id="balance">
              <BalanceBlock
                setPopupEnabled={setPopupEnabled}
                category={allData?.categories[0]}
              />
            </div>
            {allData?.categories[0]?.sections[0] ? (
              <div id="getinspired">
                <GetInspiredBlock
                  category={allData?.categories[0]?.sections[0]}
                />
              </div>
            ) : null}
            <div
              style={{
                background: "#e6e6e6",
              }}
            >
              <div id="material_details">
                <TitleHolder>
                  <Tagline4>Material Details</Tagline4>
                  <HorizontalLine />
                </TitleHolder>
              </div>
              {allData?.categories[0]?.sections[1] ? (
                <div id="material1">
                  <MaterialBlock
                    category={allData?.categories[0]?.sections[1]}
                  />
                </div>
              ) : null}
              {allData?.categories[0]?.sections[2] ? (
                <div id="material2">
                  <MaterialBlock
                    revert
                    category={allData?.categories[0]?.sections[2]}
                  />
                </div>
              ) : null}
            </div>
            <div id="product_specifications" />

            {getProduct(allData?.products)?.productSpecifications ? (
              <>
                <TitleHolder>
                  <Tagline4>Product Specifications</Tagline4>
                  <HorizontalLine />
                </TitleHolder>
                <SpecificationsBlock
                  data={getProduct(allData?.products)?.productSpecifications}
                  setPopupEnabled={setPopupEnabled}
                />
              </>
            ) : null}
            {allData?.categories[0]?.otherProductsCarousel ? (
              <OtherProductsBlock
                appContext={appContext}
                category={allData?.categories[0]}
              />
            ) : null}
          </MobileHiderDiv>
        </>
      )}
    />
  );
};

export default Product;

const MobileHiderDiv = styled.div`
  @media (max-width: 980px) {
    display: ${({ openModal }) => (openModal ? "none" : "block")};
  }
`;

const TitleHolder = styled.div`
  display: flex;
  padding-top: 60px;
  width: 100%;
  gap: 3px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 980px) {
    align-items: flex-end;
    width: 95%;
    padding-top: 20px;
  }
`;
const HorizontalLine = styled.div`
  width: ${({ full }) => (full ? "100%" : "44px")};
  border-bottom: 0.5px solid #86868b;
`;

export async function getStaticProps(props) {
  const client = new ApolloClient({
    uri: process.env.STRAPI_URL + "/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        contactUsFormProductsPage {
          Dialogue
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
        
        products {
          id
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
          isFeatured
          published_at
          productSpecifications{
            Image{
              alternativeText
              url
            }
            Image2{
              alternativeText
              url
            }
            SpecificationsField{
              Title
              Value
            }
          }
        }
        categories(where: { name: "${props.params.slug[0]}" }) {
          name
          Form {
            type
          }
          Finish {
            type
          }
          Preset {
            type
          }
          sections {
            sections {
              heading
              paragraph
              subheading
              anchorLinks {
                anchor
                title
              }
              button
            }
            otherProductsCarousel {
              heading
              subheading
              buttonText
              CarouselProducts {
                button
                headingLight
                heroImage {
                  url
                  alternativeText
                }
                mobileImage {
                  url
                  alternativeText
                }
                sub_product {
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
                  category {
                    name
                  }
                  mobileImage {
                    alternativeText
                    url
                  }
                }
                button
              }
            }
          }
          
          otherProductsCarousel {
            heading
            subheading
            CarouselProducts {
              button
              heroImage {
                url
                alternativeText
              }
              sub_product {
                productTitle
                productDescription
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
              button
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
export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: process.env.STRAPI_URL + "/graphql",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        categories {
          Form {
            type
          }
          Finish {
            type
          }
          Preset {
            type
          }
          name
        }
      }
    `,
  });

  let arrayPaths = [];

  data?.categories?.map((value) => {
    value?.Form?.map((preset) => {
      value?.Preset?.map((form) => {
        value?.Finish?.map((finish) => {
          arrayPaths = [
            {
              params: {
                slug: [
                  `${value?.name}`,
                  `${form?.type}`,
                  `${preset?.type}`,
                  `${finish?.type}`,
                ],
              },
            },
            ...arrayPaths,
          ];
        });
      });
    });
  });

  return {
    paths: arrayPaths, //indicates that no page needs be created at build time
    fallback: false, //indicates the type of fallback
  };
};
