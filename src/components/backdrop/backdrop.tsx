import React from "react";
import { Backdrop } from "./backdrop.styles";
import PropTypes from "prop-types";

export default function SimpleBackdrop({ open, children }) {
  return <Backdrop open={open}>{children}</Backdrop>;
}

SimpleBackdrop.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.any,
};
