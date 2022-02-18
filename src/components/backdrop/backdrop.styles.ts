import styled from "styled-components";
import MuiBackdrop from "@material-ui/core/Backdrop";

export const Backdrop = styled(MuiBackdrop)`
  z-index: theme.zIndex.drawer + 1;
  color: "#fff";
`;
