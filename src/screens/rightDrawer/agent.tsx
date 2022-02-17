import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({});

const mapDispatchStateToProps = (store: any) => ({});

class Agent extends React.Component {
  render() {
    return (
      <>
        <h1>AGENT Component</h1>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Agent);
