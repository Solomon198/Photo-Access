import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Components from "../index";
import { Dialog } from "./dialog.styles";
import PropTypes from "prop-types";

const DialogComponent = ({
  open,
  handleClose,
  handleAction,
  bodyText,
  closeText,
  actionText,
  headerTitle,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{headerTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {bodyText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Components.Button transparent onClick={handleClose} color="primary">
        {closeText}
      </Components.Button>
      <Components.Button transparent onClick={handleAction} color="primary">
        {actionText}
      </Components.Button>
    </DialogActions>
  </Dialog>
);

DialogComponent.propTypes = {
  closeText: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
};

export default DialogComponent;
