import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { inputAction, signUpAction } from "../auth.actions";
import Components from "../../../components/index";
import { Note } from "../../../components/styled.components/shared";
import { Title } from "./signup.style";

type Props = {
  fullName: string;
  password: string;
  phoneNumber: string;
  history: any;
  signUpStatus?: string;
  errorSignUp: string;

  setFullName: (text: string) => void;
  setPassword: (text: string) => void;
  setPhoneNumber: (text: string) => void;
  doSignUp: (payload: any, navigation: any) => void;
};
const mapStoreToProps = (store: any) => ({
  fullName: store.Auth.fullName,
  password: store.Auth.password,
  signUpStatus: store.Auth.signUpStatus,
  phoneNumber: store.Auth.phoneNumber,
  errorSignUp: store.Auth.errorSignUp,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFullName: (text: string) =>
    dispatch({ type: inputAction.SET_SIGNUP_FULLNAME_CALLER, payload: text }),
  setPassword: (text: string) =>
    dispatch({ type: inputAction.SET_SIGNUP_PASSWORD_CALLER, payload: text }),
  setPhoneNumber: (text: string) =>
    dispatch({
      type: inputAction.SET_SIGNUP_PHONENUMBER_CALLER,
      payload: text,
    }),
  doSignUp: (payload: any, navigation: any) =>
    dispatch({ type: signUpAction.SIGNUP_CALLER, payload, navigation }),
});

class SignUP extends Component<Props> {
  render() {
    return (
      <>
        <Title className="createAccountTitle" component="h1" variant="h5">
          Create Account
        </Title>
        <Note>
          Create a access photo account to enjoy all priviledges that comes with
          an application with great flexibility and tools
        </Note>
        {this.props.errorSignUp &&
          this.props.signUpStatus === signUpAction.SIGNUP_FAILED && (
            <div className="alert alert-danger mt-2" role="alert">
              {this.props.errorSignUp}
            </div>
          )}
        <Components.TextInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={this.props.fullName}
          onChange={(text) => this.props.setFullName(text)}
          id="fullName"
          label="Full Name"
          name="fullName"
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
          type="text"
          autoFocus
        />
        <Components.TextInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          onChange={(text) => this.props.setPhoneNumber(text)}
          label="Email"
          value={this.props.phoneNumber}
          name="phoneNumber"
          type="email"
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
        />
        <Components.TextInput
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          value={this.props.password}
          label="Password"
          onChange={(text) => this.props.setPassword(text)}
          type="password"
          id="password"
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
        />

        <Components.Button
          disabled={this.props.signUpStatus === signUpAction.SIGNUP_STARTED}
          fullWidth
          variant="contained"
          color="primary"
          className="my-3"
          onClick={() => {
            this.props.doSignUp(
              {
                phoneNumber: this.props.phoneNumber,
                password: this.props.password,
                countryCode: "NG",
                fullName: this.props.fullName,
              },
              this.props.history
            );
          }}
        >
          Sign Up
          {this.props.signUpStatus === signUpAction.SIGNUP_STARTED && (
            <span
              className="spinner-border spinner-border-sm ml-3"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </Components.Button>

        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link className="links" to="/auth/login">
              {"Have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(SignUP);
