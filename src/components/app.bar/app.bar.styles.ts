import styled from "styled-components";
import MuiAppBar from "@material-ui/core/AppBar";
import brand from "../../configs/colors.presets";
import MuiIconButton from "@material-ui/core/IconButton";

export const AppBar = styled(MuiAppBar)`
  background-color: ${brand.background};
`;

export const IconButton = styled(MuiIconButton)`
  color: ${brand.color};
`;
