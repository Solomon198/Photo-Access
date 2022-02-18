import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AlertContainer } from "./alert.styles";
import PropTypes from "prop-types";

enum severity {
  error = "error",
  warning = "warning",
  info = "info",
  success = "success",
}

export default function PopUpAlerts({ severity, title, body }) {
  return (
    <AlertContainer>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {body}
      </Alert>
    </AlertContainer>
  );
}

PopUpAlerts.propTypes = {
  title: PropTypes.string.isRequired,
  severity: severity,
  body: PropTypes.string.isRequired,
};
