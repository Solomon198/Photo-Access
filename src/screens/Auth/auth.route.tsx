/* eslint-disable */
import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Login from "./login /login";
import SignUp from "./signup/signup";
import ForgotPassword from "./forgot.password/forgot.password";
import RessetPassword from "./resset.password/resset.password";
import Avatar from "@material-ui/core/Avatar";
import Verification from "./verifications/verification";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Config from "../../configs/env.config";
import Components from "../../components";
import shadows, { Shadows } from "@material-ui/core/styles/shadows";
import { AuthContainer } from "../../components/styled.components/shared";

createMuiTheme({
  shadows: shadows.map(() => "none") as Shadows,
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    maxWidth: "100%",
  },
  paper: {
    flex: 1,
    height: "100%",
    maxHeight: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AuthRoute() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        style={{
          backgroundImage: 'url("/img/job2.png")',
        }}
        xs={false}
        sm={4}
        md={7}
        className={classes.image}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <AuthContainer>
            <Router>
              <Switch>
                <Route path="/auth/signup" component={SignUp} />
                <Route path="/auth/login" component={Login} />
                <Route
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <Route path="/auth/verification" component={Verification} />
                <Route
                  path="/auth/resset-password"
                  component={RessetPassword}
                />
              </Switch>
            </Router>
          </AuthContainer>
        </div>
      </Grid>
    </Grid>
  );
}

export default AuthRoute;
