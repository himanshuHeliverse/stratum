import React from "react";
import styled from "styled-components";
import { H2, Tag2, H5, P2, H6, Tag5, Header2_5, Tagline2, Tagline4 } from "../fonts";
import Carousel from "react-multi-carousel";
import ArrowLeft from "../../static/images/multi-carousel-arrow-left.svg";
import ArrowRight from "../../static/images/multi-carousel-arrow-right.svg";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";

const CustomRightArrow = ({ onClick, ...rest }) => {
	const {
		onMove,
		carouselState: { currentSlide, deviceType },
	} = rest;
	return (
		<ArrowRight
			style={{ right: 0, position: "absolute", cursor: "pointer" }}
			onClick={() => onClick()}
		/>
	);
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
	const {
		onMove,
		carouselState: { currentSlide, deviceType },
	} = rest;
	return (
		<ArrowLeft
			style={{ left: 0, position: "absolute", cursor: "pointer" }}
			onClick={() => onClick()}
		/>
	);
};

const OtherProductsBlock = ({ category, appContext }) => {
	const router = useRouter();
	const handleClick = (e, path) => {
		e.preventDefault();
		router.push(path);
	};
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 6000, min: 3000 },
			items: 3,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};
	return (
		<Wrapper>
			<InnerDiv>
				<TitleHolderDiv>
					<Header2_5 black>{category?.otherProductsCarousel?.heading}</Header2_5>
					<TitleHolderSubDiv>
						<Tagline2>{category?.otherProductsCarousel?.subheading}</Tagline2>
						<StyledTag4
							onClick={(e) => {
								handleClick(e, "/");
								appContext?.setScrollToCollection(true);
							}}
						>
							{"View Entire Collection"}
						</StyledTag4>
					</TitleHolderSubDiv>
				</TitleHolderDiv>
				<CarouselDiv>
					<Carousel
						customLeftArrow={<CustomLeftArrow />}
						customRightArrow={<CustomRightArrow />}
						responsive={responsive}
						ssr={true} // means to render carousel on server-side.
						autoPlaySpeed={1000}
						removeArrowOnDeviceType={["tablet", "mobile"]}
					>
						{category?.otherProductsCarousel?.CarouselProducts?.map((value) => (
							<CarouselImageDiv key={value?.heroImage?.alternativeText}>
								<>
									{/* <BuyButton>
                    <ButtonText>BUY NOW</ButtonText>
                  </BuyButton> */}
									<CarouselOverflowDiv>
										<CarouselImage
											key={value?.heroImage?.alternativeText}
											src={value?.heroImage?.url}
										/>
										<CarouselImage
											mobile
											key={
												value?.mobileImage?.alternativeText
													? value?.mobileImage?.alternativeText
													: value?.heroImage?.alternativeText
											}
											src={
												value?.mobileImage?.url ? value?.mobileImage?.url : value?.heroImage?.url
											}
										/>
									</CarouselOverflowDiv>
									<CarouselImageDetails
										onClick={(e) =>
											value?.sub_product?.preset?.type
												? handleClick(
														e,
														`/products/${category?.name}/${value?.sub_product?.preset?.type}/${value?.sub_product?.form?.type}/${value?.sub_product?.finish?.type}`
												  )
												: null
										}
										key={value?.type}
									>
										<H5>{value?.sub_product?.productTitle}</H5>
										<P2>{value?.sub_product?.productDescription}</P2>
									</CarouselImageDetails>
								</>
							</CarouselImageDiv>
						))}
					</Carousel>
				</CarouselDiv>
				<TextRightSide>
					<StyledTag5
						onClick={(e) => {
							handleClick(e, "/");
							appContext?.setScrollToCollection(true);
						}}
					>
						{"View Entire Collection"}
					</StyledTag5>
				</TextRightSide>
			</InnerDiv>
		</Wrapper>
	);
};

export default OtherProductsBlock;

const StyledTag4 = styled(Tagline4)`
	cursor: pointer;
	:hover {
		color: black;
	}
	@media (max-width: 980px) {
		display: none;
	}
`;
const StyledTag5 = styled(Tagline4)`
	cursor: pointer;
	:hover {
		color: black;
	}
	@media (min-width: 980px) {
		display: none;
	}
`;

const TitleHolderDiv = styled.div`
	width: 93%;
	margin: auto;
	@media (max-width: 980px) {
		text-align: left;
		flex-direction: column-reverse;
		display: flex;
		gap: 10px;
	}
`;

const TitleHolderSubDiv = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 980px) {
		align-items: flex-start;
		text-align: left;
		gap: 10px;
		flex-direction: column;
	}
`;

const BuyButton = styled.button`
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	-webkit-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	-moz-box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	background-color: #ffffff;
	position: absolute;
	width: max-content;
	min-width: 90px;
	height: 20px;

	border: none;
	border-radius: 1px;
	margin: 180px 0 0 0;
	z-index: 100;
	@media (min-width: 980px) {
		display: none;
	}
`;

const ButtonText = styled(H6)`
	@media (max-width: 980px) {
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 10px;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
`;

const CarouselImage = styled.img`
	display: ${({ mobile }) => (mobile ? "none" : "block")};
	min-width: 30vw;
	z-index: -1;
	@media (max-width: 980px) {
		display: ${({ mobile }) => (!mobile ? "none" : "block")};
	}
`;

const CarouselOverflowDiv = styled.div`
	display: flex;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

const CarouselImageDetails = styled.div`
	display: flex;
	cursor: pointer;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.7);
	position: absolute;
	&:hover {
		opacity: 1;
		${CarouselImage} {
			opacity: 0;
			transform: scale(1.05);
		}
	}
	transition: 0.8s;
	@media (max-width: 980px) {
		display: none;
	}
`;
const CarouselImageDiv = styled.div`
	height: 90%;
	width: 90%;
	margin: auto;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 980px) {
		height: 260px;
		width: 100%;
		margin: auto;
	}
`;

const CarouselDiv = styled.div`
	width: 100%;
	display: block;
	height: max-content;
	align-items: center;
	justify-content: center;
	margin-top: 50px;
	@media (max-width: 980px) {
		margin-top: 0;
		padding: 10px 0px;
	}
`;
const TextRightSide = styled.div`
	text-align: right;
	width: 100%;
`;
const InnerDiv = styled.div`
	width: 86.8%;
	max-width: 1600px;
	gap: 0px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 80px;
	padding-bottom: 80px;
	/* background-color: #f7f7fa; */
	align-items: center;
	@media (max-width: 980px) {
		padding-top: 30px;
		padding-bottom: 0;
	}
`;
