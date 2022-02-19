import styled from "styled-components";
import brand from "../../configs/colors.presets";

export const H5 = styled.h5`
  font-weight: 400;
  color: ${brand.color};
`;

export const H1 = styled.h1`
  color: ${brand.color};
  font-weight: 100;
`;

export const Note = styled.span`
  font-size: 12px;
  font-family: sans-serif;
  color: #333;
  margin: 0px 0px 20px;
  display: block;
`;

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 90%;
  margin: auto;
  @media (min-width: 992px) {
    width: 65%;
    margin: auto;
  }
`;
