import React from "react";
import Components from "../../components/index";

class Login extends React.Component {
  render() {
    return (
      <div id="page-top">
        <Components.AppMenu />
        <Components.LoginComponent />
      </div>
    );
  }
}

export default Login;
