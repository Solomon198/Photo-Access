import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({});

const mapDispatchStateToProps = (store: any) => ({});

class Help extends React.Component {
  render() {
    return (
      <>
        <h1>Help</h1>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Help);
