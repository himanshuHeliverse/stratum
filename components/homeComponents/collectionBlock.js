import React from "react";
import styled from "styled-components";
import { Header2, H6, Tag5, Tagline2, HorizontalLine, Button2 } from "../fonts";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
const CollectionBlock = ({ data, products }) => {
  const [productsToDisplay, setProductsToDisplay] = React.useState([]);
  const [numProductsToDisplay, setNumProductsToDisplay] = React.useState(3);
  // React.useEffect(() => {
  //   let tempArray = [
  //     ...productsToDisplay,
  //     ...products.map((value, index) =>
  //       index < numProductsToDisplay ? value : null
  //     ),
  //   ];
  //   setProductsToDisplay(tempArray);
  // }, [numProductsToDisplay, products]);
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };
  const fetchMoreData = () => {
    setTimeout(() => {
      setNumProductsToDisplay(numProductsToDisplay + 3);
    }, 1500);
  };
console.log(products[0]);
  return (
    <Wrapper>
      <InnerDiv>
        <HeadingsHolderDiv>
          <Tagline2>{data?.subheading}</Tagline2>
          <Header2>{data?.heading}</Header2>
          <HorizontalLine />
        </HeadingsHolderDiv>
        {/* <InfiniteScrollStyled
          dataLength={numProductsToDisplay}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <LoaderHolder>
              <Loader
                type="ThreeDots"
                color="#000000"
                height={100}
                width={100}
                timeout={3000}
              />
            </LoaderHolder>
          }
        > */}
        <CollectionDiv>
          {products.map((value) => {
            const type =
              value?.order % 4 === 0
                ? "90vw"
                : value?.order % 3 === 0
                ? "28vw"
                : value?.order % 2 === 0
                ? "58vw"
                : "90vw";
            return value === null ? null : (
              <ImageHolderDiv
                key={value?.id}
                onClick={(e) =>
                  handleClick(
                    e,
                    `/products/${value?.defaultProduct?.category?.name}/${value?.defaultProduct?.preset?.type}/${value?.defaultProduct?.form?.type}/${value?.defaultProduct?.finish?.type}`
                  )
                }
                width={type}
              >
                <ProductDetailsHolder>
                  <WhiteBox>
                    <Button2>{value?.name}</Button2>
                  </WhiteBox>
                  <StyledTag5 light={value?.taglineColorLight}>
                    {value?.tagline}
                  </StyledTag5>
                </ProductDetailsHolder>
                <ProductImagesVariantTop width={type} src={value?.image?.url} />
                <ProductImagesVariantBottom
                  width={type}
                  src={value?.hoverImage?.url}
                />
                <ProductImagesVariantTop
                  mobile
                  width={type}
                  src={
                    value?.mobileImage?.url
                      ? value?.mobileImage?.url
                      : value?.image?.url
                  }
                  alt={value?.mobileImage?.alternativeText}
                />
                <ProductImagesVariantBottom
                  mobile
                  width={type}
                  src={
                    value?.mobileHoverImage?.url
                      ? value?.mobileHoverImage?.url
                      : value?.hoverImage?.url
                  }
                  alt={value?.mobileHoverImage?.alternativeText}
                />
              </ImageHolderDiv>
            );
          })}
        </CollectionDiv>
        {/* </InfiniteScrollStyled> */}
      </InnerDiv>
    </Wrapper>
  );
};

export default CollectionBlock;

const HeadingsHolderDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 0 25px 0 25px;
  background-color: white;
  transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
`;

const StyledTag5 = styled(Tag5)`
  color: ${({ light }) => (light ? "#EDEDF0" : "#86868B")};
  margin-left: 25px;
  opacity: 0;
  transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
`;

const ProductImagesVariantTop = styled.img`
  opacity: 1;
  width: ${({ width }) => width};
  display: ${({ mobile }) => (mobile ? "none" : "block")};
  height: 30vw;
  position: absolute;
  &:hover {
    opacity: 0;
  }
  transition: 0.8s;
  -moz-transition: 0.8s;
  -o-transition: 0.8s;
  -webkit-transition: 0.8s;
  @media (max-width: 980px) {
    height: 90vw;
    width: 90vw;
    display: ${({ mobile }) => (!mobile ? "none" : "block")};
  }
`;
const ProductImagesVariantBottom = styled.img`
  opacity: 0;
  position: absolute;
  width: ${({ width }) => width};
  display: ${({ mobile }) => (mobile ? "none" : "block")};
  height: 30vw;
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
  transition: 0.8s;
  -moz-transition: 0.8s;
  -o-transition: 0.8s;
  -webkit-transition: 0.8s;

  @media (max-width: 980px) {
    height: 90vw;
    width: 90vw;
    display: ${({ mobile }) => (!mobile ? "none" : "block")};
  }
`;

const ImageHolderDiv = styled.div`
  &:hover ${ProductImagesVariantTop} {
    opacity: 0;
  }
  &:hover ${ProductImagesVariantBottom} {
    opacity: 1;
    transform: scale(1.05);
  }
  &:hover ${WhiteBox} {
    background-color: transparent;
  }
  &:hover ${StyledTag5} {
    opacity: 1;
  }

  position: relative;
  overflow: hidden;
  width: ${({ width }) => width};
  height: 30vw;
  margin-bottom: 0.7vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 980px) {
    width: inherit;
    height: 90vw;
    width: 90vw;
    margin: ${({ padding }) => (padding ? "30px 0 0 0" : "0 0 0 0")};
  }
`;
const ProductDetailsHolder = styled.div`
  width: 100%;
  height: 90%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfiniteScrollStyled = styled(InfiniteScroll)`
  width: 86.8vw;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 980px) {
    gap: 10px;
  }
`;

const CollectionDiv = styled.div`
  width: 86.8vw;
  margin: 90px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 980px) {
    gap: 12px;
  }
`;

const InnerDiv = styled.div`
  width: 86.8%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
  @media (max-width: 980px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`;
