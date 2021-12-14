import React from "react";
import styled from "styled-components";
import { H2, Tag2, P1, PreContainer, Tagline1, Header1, Paragraph1 } from "../fonts";
import VideoJS from "../reusableComponents/videoPlayer";

const CollectionBlock = ({ data }) => {
	const videoJsOptions = {
		controls: true,
		responsive: true,
		fluid: true,
		sources: [
			{
				src: data?.video[0]?.url,
				type: "video/mp4",
			},
		],
	};
	return (
		<Wrapper>
			<InnerDiv>
				<TextHolderDiv>
					<Tagline1>{data?.subheading}</Tagline1>
					<Header1 style={{ fontSize: "32px", lineHeight:"50px" }}>{data?.heading}</Header1>
					{data?.showText ? (
						<PreContainer>
							<Paragraph1>{data?.paragraph}</Paragraph1>
						</PreContainer>
					) : (
						<VideoDiv>
							<VideoJS options={videoJsOptions} />
						</VideoDiv>
					)}
				</TextHolderDiv>
			</InnerDiv>
		</Wrapper>
	);
};

export default CollectionBlock;
const TextHolderDiv = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	@media (max-width: 980px) {
		width: 100%;
		text-align: left;
	}
`;

const VideoDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-top: 50px;
	justify-content: center;
	align-items: center;
`;

const InnerDiv = styled.div`
	width: 86.8%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 980px) {
		text-align: center;
	}
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-top: 80px;
	padding-bottom: 80px;
	background: #e6e6e6;
	height: 1200px;
	align-items: center;
	@media (max-width: 980px) {
		padding-top: 40px;
		padding-bottom: 40px;
	}
`;
