import styled from "styled-components";

export const H1 = styled.h1`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 96px;
  line-height: 96px;

  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: #000000;
`;
export const H2 = styled.h2`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 50px;

  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: #29292b;

  @media (max-width: 980px) {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.05em;
  }
`;
export const H3 = styled.h3`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 40px;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #4c4c4c;

  @media (max-width: 980px) {
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.05em;
  }
`;
export const H4 = styled.h4`
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #29292b;
  padding: 0;
  margin: 0;
  @media (max-width: 980px) {
    font-size: 20px;
    line-height: 20px;

    letter-spacing: 0.05em;
    text-transform: uppercase;

    color: #29292b;
  }
`;
export const H5 = styled.h5`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium, sans-serif;
  font-style: normal;
  font-size: 24px;
  line-height: 24px;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #000000;
  @media (max-width: 980px) {
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 0.03em;
  }
`;
export const H6 = styled.h6`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 22px;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #29292b;
  @media (max-width: 980px) {
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;
export const H7 = styled.h6`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #000000;
`;
export const H8 = styled.h6`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 10px;

  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #000000;
`;

export const P1 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 39px;
  /* identical to box height, or 150% */

  letter-spacing: 0.1em;

  color: #000000;
  @media (max-width: 980px) {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    /* or 150% */

    letter-spacing: 0.1em;

    color: #29292b;
  }
`;
export const PreContainer = styled.pre`
  white-space: pre-wrap;
`;
export const P2 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Object Sans, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 150%;

  letter-spacing: 0.1em;

  color: #29292b;
  @media (max-width: 980px) {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;

    letter-spacing: 0.1em;
  }
`;
export const P3 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  letter-spacing: 0.1em;

  color: #000000;
  @media (max-width: 980px) {
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;

export const P4 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 18px;
  /* identical to box height, or 200% */

  letter-spacing: 0.05em;

  color: #000000;
`;

export const P5 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 150% */

  letter-spacing: 0.05em;

  color: #000000;
`;

export const I1 = styled.i`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: normal;
  font-size: 36px;
  line-height: 150%;
  /* identical to box height, or 54px */

  letter-spacing: 0.05em;

  color: #000000;
`;
export const I2 = styled.i`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: normal;
  font-size: 24px;
  line-height: 150%;
  /* identical to box height, or 36px */

  letter-spacing: 0.05em;

  color: #605e5e;

  @media (max-width: 980px) {
    font-family: Inter, sans-serif;
    font-style: italic;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    /* or 18px */

    letter-spacing: 0.05em;

    color: #86868b;
  }
`;
export const I3 = styled.i`
  margin: 0;
  padding: 0;
  font-family: Inter, sans-serif;
  font-style: italic;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  /* identical to box height, or 18px */

  letter-spacing: 0.05em;

  color: #000000;
`;

export const Tag2 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Bold, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #86868b;

  @media (max-width: 980px) {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.02em;
  }
`;
export const Tag5 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  letter-spacing: 0.1em;
  text-transform: uppercase;

  color: #86868b;
  @media (max-width: 980px) {
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
`;
export const t6 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 11px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #000000;
`;

export const UniformRegular = styled.p`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro Medium, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;

  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #000000;
`;

/////////////////*******************************************    NEW FONTS   ******************************************************** *////////////////////

export const Tagline1 = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    /* Tag 3 (mobile) */

    font-family: Uniform Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.02em;
    text-transform: uppercase;

    color: #86868b;
  }
  /* Tag 1 (desktop) */

  font-family: Uniform Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #86868b;
`;

export const Header1 = styled.h1`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Sharp Sans No1 SemiBold;
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    line-height: 45px;
    /* identical to box height */

    text-align: inherit;
    text-transform: capitalize;

    color: #4c4c4c;
  }
  font-family: Sharp Sans No1 SemiBold;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 45px;
  /* identical to box height */

  text-align: inherit;
  text-transform: capitalize;

  color: #4c4c4c;
`;

export const Header2 = styled.h2`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Sharp Sans No1 Medium;
    font-style: normal;
    font-weight: 800;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0.05em;
    text-transform: capitalize;

    color: #29292b;
  }
  font-family: Sharp Sans No1 Medium;
  font-style: normal;
  font-weight: 800;
  font-size: 50px;
  line-height: 62px;
  letter-spacing: 0.05em;
  text-transform: capitalize;

  color: #29292b;
`;

export const Tagline2 = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Uniform Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 11px;
    letter-spacing: 0.02em;
    text-transform: uppercase;

    color: #86868b;
  }
  /* Tag 2 (desktop) */

  font-family: Uniform Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #86868b;
`;

export const Tagline4 = styled.p`
  margin: 0;
  padding: 0;
  font-family: Uniform Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 11px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

  color: #86868b;
`;

export const Header2_5 = styled.h3`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Sharp Sans No1 Medium;
    font-style: normal;
    font-weight: 800;
    font-size: 22px;
    line-height: 27px;
    /* identical to box height */

    letter-spacing: 0.05em;
    text-transform: capitalize;
    color: ${({ black }) => (black ? "#29292B" : "#ffffff")};

    /* color: #ffffff; */
  }
  font-family: Sharp Sans No1 Medium;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  /* identical to box height */

  text-align: inherit;
  letter-spacing: 0.05em;
  text-transform: capitalize;
  color: ${({ black }) => (black ? "#29292B" : "#ffffff")};

  /* color: #ffffff; */
`;

export const Button1 = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Sharp Sans No1 Bold;
    font-style: normal;
    font-weight: 800;
    font-size: 18px;
    line-height: 22px;
    text-align: inherit;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    color: ${({ black }) => (black ? "#29292B" : "#ffffff")};
  }
  font-family: Sharp Sans No1 Bold;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  text-align: inherit;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: ${({ black }) => (black ? "#29292B" : "#ffffff")};
`;

export const Button2 = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Sharp Sans No1 Bold;
    font-style: normal;
    font-weight: 800;
    font-size: 14px;
    line-height: 17px;
    text-align: inherit;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    color: #29292b;
  }
  font-family: Sharp Sans No1 Bold;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 25px;
  text-align: inherit;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: #29292b;
`;

export const Paragraph1 = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Uniform Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 125%;
    /* or 19px */

    letter-spacing: 0.05em;

    color: #29292b;
  }
  /* p1 (desktop) */

  font-family: Uniform Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.05em;

  color: #29292b;
`;

export const Paragraph2 = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
    font-family: Uniform Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    /* or 18px */

    letter-spacing: 0.05em;

    color: #86868b;
  }
  font-family: Uniform Pro;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  /* or 24px */

  letter-spacing: 0.05em;

  color: #86868b;
`;

export const SmallBold = styled.p`
  margin: 0;
  padding: 0;
  @media (max-width: 980px) {
  }
  /* Small Bold (mobile) */

  font-family: Sharp Sans No1 Light;
  font-style: normal;
  font-weight: 800;
  font-size: 8px;
  line-height: 10px;
  /* identical to box height */

  letter-spacing: 0.05em;
  text-transform: uppercase;

  color: #29292b;
`;

export const HorizontalLine = styled.div`
  width: 226px;
  height: 0px;

  border-bottom: 1px solid #86868b;

  @media (max-width: 980px) {
    width: 145px;
    height: 0px;

    border-bottom: 0.5px solid #86868b;
  }
`;
