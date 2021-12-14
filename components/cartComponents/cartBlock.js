import React from "react";
import { Button1, Paragraph2, P3, Paragraph1, Tag2, Button2, Tagline1 } from "../fonts";
import styled from "styled-components";
import { useRouter } from "next/router";
import ArrowUp from "../../static/images/arrow-full-up.svg";
import ArrowDown from "../../static/images/arrow-full-down.svg";
import { BlackButton, BlackButtonText } from "../reusableComponents/blackButton";

const CartBlock = ({
	appContext,
	checkout,
	toggleModal,
	shippingDetails,
	setContactUsPopupEnabled,
	setContactUsPopupMessage,
}) => {
	const router = useRouter();
	const handleClick = (e, path) => {
		e.preventDefault();
		router.push(path);
	};
	let mockTitles = ["ITEM", "DESCRIPTION", "SIZE", "WEIGHT", "FINISH", "QUANTITY", "ITEM TOTAL"];
	if (checkout) {
		mockTitles = ["ITEM", "DESCRIPTION", "SIZE", "WEIGHT", "FINISH", "ITEM TOTAL"];
	}
	return (
		<Wrapper checkout={checkout}>
			<InnerDiv checkout={checkout}>
				{appContext?.cart?.items?.length > 0 ? (
					<>
						<UpperDiv checkout={checkout}>
							{!checkout ? (
								<UpperDivLeft>
									<Button1 black>
										You have {appContext?.cart?.items?.length} item
										{appContext?.cart?.items?.length > 1 ? "s" : null} in your shopping cart
									</Button1>
									<StyledClickableP3
										onClick={(e) => {
											handleClick(e, "/");
											appContext?.setScrollToCollection(true);
										}}
									>
										Continue Shopping
									</StyledClickableP3>
									{!checkout ? (
										<MobileOnly>
											<BlackButton>
												<BlackButtonText
													onClick={(e) =>
														appContext.isAuthenticated
															? handleClick(e, "/checkout")
															: toggleModal(true)
													}
												>
													CHECKOUT
												</BlackButtonText>
											</BlackButton>
										</MobileOnly>
									) : null}
								</UpperDivLeft>
							) : (
								<UpperDivLeft checkout={checkout}>
									<Button1>Cart Items</Button1>
								</UpperDivLeft>
							)}
							<UpperDivRight>
								{!checkout ? (
									<StyledClickableP3 onClick={(e) => setContactUsPopupEnabled(true)}>
										CONTACT US
									</StyledClickableP3>
								) : null}{" "}
							</UpperDivRight>
						</UpperDiv>
						<LowerDiv>
							<LowerScrollDiv>
								<LowerDivTitlesRow>
									{mockTitles.map((value, index) => (
										<ProductDescriptionComponentsDiv
											borderBottom
											key={value}
											width={
												index === mockTitles.length - 1
													? "10%"
													: index === mockTitles.length - 2
													? "8%"
													: null
											}
											content={
												index === mockTitles.length - 1
													? "end"
													: index > 1 && index < 6
													? "center"
													: null
											}
										>
											<P3>{value}</P3>
										</ProductDescriptionComponentsDiv>
									))}
								</LowerDivTitlesRow>
								<LowerDivTitlesRow mobile>
									<P3>Your Items</P3>
								</LowerDivTitlesRow>
								{appContext?.cart?.items?.map((value) => {
									return (
										<LowerDivProductRow key={value?.published_at}>
											<ProductDescriptionComponentsDiv>
												<ProductImage checkout={checkout} src={value?.image?.url} />
											</ProductDescriptionComponentsDiv>
											<OtherProductDetailsHolder>
												<ProductDescriptionComponentsDiv>
													<ProductDescriptionDiv>
														<Button2>{value?.productTitle}</Button2>
														{/* <P3>serial #{value?.id}</P3> */}
													</ProductDescriptionDiv>
												</ProductDescriptionComponentsDiv>

												<ProductDescriptionComponentsDiv content="center">
													<ProductDescriptionDiv>
														<Paragraph2>{value.size}</Paragraph2>
													</ProductDescriptionDiv>
												</ProductDescriptionComponentsDiv>
												<ProductDescriptionComponentsDiv content="center">
													<ProductDescriptionDiv>
														<Paragraph2>{value.weight}</Paragraph2>
													</ProductDescriptionDiv>
												</ProductDescriptionComponentsDiv>
												<ProductDescriptionComponentsDiv content="center">
													<ProductDescriptionDiv>
														<Paragraph2>{value.finishProp}</Paragraph2>
													</ProductDescriptionDiv>
												</ProductDescriptionComponentsDiv>
												{!checkout ? (
													<ProductDescriptionComponentsDiv width={"8%"} content="center">
														<QuantityDiv>
															<ArrowUp
																style={{ cursor: "pointer" }}
																onClick={() => {
																	appContext?.addItem(value);
																}}
															/>
															<Paragraph2>{value.quantity}</Paragraph2>
															<ArrowDown
																style={{ cursor: "pointer" }}
																onClick={() => {
																	appContext?.removeItem(value);
																}}
															/>
														</QuantityDiv>
													</ProductDescriptionComponentsDiv>
												) : null}
												<ProductDescriptionComponentsDiv width={"10%"} content="end">
													<Paragraph2 style={{ color: "#29292B", fontWeight: "800" }}>
														CHF {value.price * value.quantity}
													</Paragraph2>
												</ProductDescriptionComponentsDiv>
											</OtherProductDetailsHolder>
										</LowerDivProductRow>
									);
								})}
							</LowerScrollDiv>
							<LowerDivShipping>
								{!checkout ? (
									<LowerDivShippingLeft>
										<P3
											style={{
												fontWeight: "bold",
												fontSize: "14px",
												lineHeight: "14px",
											}}
										>
											SHIPPING TO
										</P3>
										<DropDownLi Height={shippingDetails?.length}>
											<Dropbtn>
												<ArrowSVGDiv>
													<ArrowDown />
												</ArrowSVGDiv>
												<ArrowSVGDivMobile>
													<ArrowDown />
												</ArrowSVGDivMobile>
												<P3>
													{shippingDetails ? shippingDetails[appContext.shippingTo]?.Area : null}
												</P3>
											</Dropbtn>
											<DropDownContent>
												{shippingDetails?.map((value, index) =>
													value.active ? (
														<StyledHoverP3
															onClick={(e) => appContext.setShippingTo(index)}
															key={value.Area}
														>
															{value.Area}
														</StyledHoverP3>
													) : null
												)}
											</DropDownContent>
										</DropDownLi>
										<P3>
											{shippingDetails ? shippingDetails[appContext.shippingTo]?.Alert : null}
										</P3>
									</LowerDivShippingLeft>
								) : null}
								<LowerDivShippingRight checkout={checkout}>
									<FinalDetailsHolderDiv height={"45px"}>
										<P3>SHIPPING</P3>
										<Paragraph2>
											CHF{" "}
											{shippingDetails ? shippingDetails[appContext.shippingTo]?.Shipping : null}
										</Paragraph2>
									</FinalDetailsHolderDiv>
									<FinalDetailsHolderDiv height={"45px"}>
										<P3>VAT</P3>
										<Paragraph2>
											{shippingDetails ? shippingDetails[appContext.shippingTo]?.VAT : null}%
										</Paragraph2>
									</FinalDetailsHolderDiv>
									<FinalDetailsHolderDiv height={"60px"}>
										<P3>TOTAL PRICE</P3>
										<Paragraph2 style={{color:"#29292B", fontWeight:"800", fontSize:'16px'}}>
											CHF{" "}
											{shippingDetails
												? appContext?.cart?.total +
												  (shippingDetails[appContext.shippingTo]?.VAT / 100) *
														appContext?.cart?.total +
												  shippingDetails[appContext.shippingTo]?.Shipping
												: null}
										</Paragraph2>
									</FinalDetailsHolderDiv>
									<FinalDetailsButtonHolderDiv>
										{!checkout ? (
											<CheckoutButtonHolder>
												<BlackButtonCustom>
													<BlackButtonText
														onClick={(e) =>
															appContext.isAuthenticated
																? handleClick(e, "/checkout")
																: toggleModal(true)
														}
													>
														CHECKOUT
													</BlackButtonText>
												</BlackButtonCustom>
												<MobileOnly onClick={(e) => setContactUsPopupEnabled(true)}>
													<Tagline1>QUESTIONS? CONTACT US.</Tagline1>
												</MobileOnly>
											</CheckoutButtonHolder>
										) : null}
									</FinalDetailsButtonHolderDiv>
								</LowerDivShippingRight>
							</LowerDivShipping>
						</LowerDiv>
					</>
				) : (
					<EmptyCartDiv>
						<Button1 black>Your Shopping Cart is Empty</Button1>
						<StyledClickableP3
							onClick={(e) => {
								handleClick(e, "/");
								appContext?.setScrollToCollection(true);
							}}
						>
							Continue Shopping
						</StyledClickableP3>
					</EmptyCartDiv>
				)}
			</InnerDiv>
		</Wrapper>
	);
};

export default CartBlock;

const CheckoutButtonHolder = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-end;
	gap: 20px;
`;

const MobileOnly = styled.div`
	@media (min-width: 980px) {
		display: none;
	}
`;

const BlackButtonCustom = styled(BlackButton)`
	@media (max-width: 980px) {
		width: 100%;
		padding: 5px 0;
		// height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const OtherProductDetailsHolder = styled.div`
	width: 100%;
	min-height: 100px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 980px) {
		flex-direction: column;
	}
`;

const EmptyCartDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 40px;
	min-height: 36vh;
`;

const QuantityDiv = styled.div`
	width: 80px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 15px;
	border: 1px solid black;
	@media (max-width: 980px) {
		width: 80px;
		gap: 15px;
	}
`;

const ArrowSVGDiv = styled.div`
	width: 50px;
	height: 20px;
	margin-left: -4px;
	@media (max-width: 980px) {
		display: none;
	}
`;

const ArrowSVGDivMobile = styled.div`
	width: 20px;
	height: 20px;
	margin-left: 4px;
	margin-top: -1px;

	@media (min-width: 980px) {
		display: none;
	}
`;

// const ProductOptionDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   @media (max-width: 980px) {
//     justify-content: center;
//   }
// `;

const StyledLi = styled.li`
	float: left;
`;

const Dropbtn = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	cursor: pointer;
	color: black;
	border: 1px solid black;
	width: 240px;
	min-height: 30px;
	text-align: center;
	text-decoration: none;
	@media (max-width: 980px) {
		width: 45vw;
		padding: 0;
	}
`;

const DropDownContent = styled.div`
	height: 0;
	width: 242px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: absolute;
	background-color: #000000;
	overflow: hidden;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	-webkit-transition: 0.3s;
	transition: 0.3s;
	@media (max-width: 980px) {
		width: 45.2vw;
		padding: 0;
		min-width: 50px;
	}
`;

const DropDownLi = styled(StyledLi)`
	display: inline-block;
	width: 240px;
	&:hover ${DropDownContent} {
		height: ${({ Height }) => Height * 30}px;
		@media (max-width: 980px) {
			height: ${({ Height }) => Height * 38}px;
		}
	}
	@media (max-width: 980px) {
		width: 45vw;
		padding: 0;
	}
`;

const ProductImage = styled.img`
	width: ${({ checkout }) => (checkout ? "8vw" : "10vw")};
	height: ${({ checkout }) => (checkout ? "4vw" : "5vw")};
	@media (max-width: 980px) {
		width: 36vw;
		height: 18vw;
	}
`;

const StyledClickableP3 = styled(Paragraph1)`
	color: #86868b;
	cursor: pointer;
	font-weight: bold;
	&:hover {
		color: #555555;
	}
	transition: all 0.4s;
	@media (max-width: 980px) {
		font-size: 10px;
		line-height: 11px;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
`;

const StyledHoverP3 = styled(Paragraph1)`
	width: 100%;
	text-align: center;
	padding: 3px 0 3px 0;
	color: ${({ shaded }) => (shaded ? "#FFFFFF" : "#c2c2c2")};
	&:hover {
		background-color: ${({ noHover }) => (noHover ? "none" : "#333333")};
		cursor: pointer;
	}
	@media (max-width: 980px) {
		padding: 15px 0 15px 0;
		font-style: normal;
		font-weight: bold;
		font-size: 10px;
		line-height: 11px;
		text-align: center;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}
`;

const ProductDescriptionComponentsDiv = styled.div`
	display: flex;
	padding: 20px 0 20px 0;
	flex: 1 1 0px;
	width: 0;
	width: ${({ width }) => (width ? width : "15%")};
	text-align: ${({ content }) =>
		content === "end" ? "right" : content === "center" ? "center" : "left"};
	align-items: ${({ content }) =>
		content === "end" ? "right" : content === "center" ? "center" : "left"};
	justify-content: ${({ content }) =>
		content === "end" ? "right" : content === "center" ? "center" : "left"};
	@media (max-width: 980px) {
		border-bottom: ${({ borderBottom }) => (borderBottom ? "1px solid black" : "none")};
		justify-content: flex-start;
		width: 100%;
		// min-width: 140px;
		padding: 3px 0 3px 0;
		text-align: center;
	}
`;

const ProductDescriptionDiv = styled.div`
	display: flex;
	flex-direction: column;
`;

const UpperDiv = styled.div`
	width: 100%;
	/* height: ${({ checkout }) => (checkout ? "100%" : "10vh")}; */
	padding-bottom: ${({ checkout }) => (checkout ? "6vh" : "10vh")};
	display: flex;
	flex-direction: row;
	border-bottom: 1px solid black;
	min-height: max-content;
	height: max-content;
	@media (max-width: 980px) {
		padding-bottom: 5vh;
	}
`;
const UpperDivLeft = styled.div`
	width: ${({ checkout }) => (checkout ? "100%" : "30%")};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 20px;
	@media (max-width: 980px) {
		width: 60%;
	}
`;
const UpperDivRight = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	@media (max-width: 980px) {
		width: 40%;
	}
`;

const LowerDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const LowerScrollDiv = styled.div`
	@media (max-width: 980px) {
		/* overflow-x: scroll; */
	}
	border-bottom: 1px solid black;
`;

const LowerDivTitlesRow = styled.div`
	width: 100%;
	height: 4vh;
	padding-top: 1vh;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid black;
	display: ${({ mobile }) => (mobile ? "none" : "flex")};
	@media (max-width: 980px) {
		/* border-bottom: none; */
		display: ${({ mobile }) => (!mobile ? "none" : "flex")};
	}
`;
const LowerDivProductRow = styled.div`
	width: 100%;
	min-height: 100px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	@media (max-width: 980px) {
		border-bottom: 1px solid black;
		/* flex-direction: column; */
		padding: 20px 0 20px 0;
	}
`;
const LowerDivShipping = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	@media (max-width: 980px) {
		flex-direction: column;
	}
`;
const LowerDivShippingLeft = styled.div`
	width: 70%;
	display: flex;
	flex-direction: column;
	padding-top: 10px;
	gap: 10px;
	@media (max-width: 980px) {
		width: 100%;
		margin-top: 30px;
		justify-content: center;
		align-items: flex-start;
	}
`;

const FinalDetailsHolderDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	min-height: ${({ height }) => height};
	border-bottom: solid 1px black;
`;
const FinalDetailsButtonHolderDiv = styled.div`
	margin-top: 10px;
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: flex-end;
	align-items: center;
	@media (max-width: 980px) {
		justify-content: center;
		margin-top: 30px;
	}
`;

const LowerDivShippingRight = styled.div`
	width: ${({ checkout }) => (checkout ? "100%" : "30%")};
	display: flex;
	flex-direction: column;
	@media (max-width: 980px) {
		width: 100%;
		margin-top: 30px;
	}
`;

const InnerDiv = styled.div`
	width: ${({ checkout }) => (checkout ? "100%" : "86.8%")};
	max-width: 1600px;
	height: max-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 980px) {
		flex-direction: column;
		height: max-content;
	}
`;

const Wrapper = styled.div`
	display: flex;
	height: max-content;
	flex-direction: column;
	padding-top: ${({ checkout }) => (checkout ? "0px" : "200px")};
	padding-bottom: ${({ checkout }) => (checkout ? "0px" : "80px")};
	align-items: center;
	@media (max-width: 980px) {
		height: max-content;
		padding-top: ${({ checkout }) => (checkout ? "0px" : "50px")};
		padding-bottom: ${({ checkout }) => (checkout ? "0px" : "40px")};
	}
`;
