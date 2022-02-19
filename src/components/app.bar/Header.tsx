import React from "react";
// MUI components
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";

// custom components
import { H5 } from "../styled.components/shared";
import { AppBar, IconButton } from "./app.bar.styles";

// others
import brand from "../../configs/colors.presets";
import PropTypes from "prop-types";
import { User } from "../../types/interfaces";

const DashboardHeader = ({ onDrawerToggle, user }) => (
  <React.Fragment>
    <AppBar color="inherit" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Hidden smUp>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
              >
                <MenuIcon style={{ color: brand.color }} />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid item xs />

          <Grid item>
            <H5>{user?.fullName}</H5>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

DashboardHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  user: PropTypes.any as unknown as User,
};

export default DashboardHeader;
