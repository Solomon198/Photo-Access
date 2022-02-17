import React from "react";
import { connect } from "react-redux";
import { Paper, Button, TextField, Avatar } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { ListItem, ListItemText } from "@material-ui/core";
import Payment from "../../components/payment";
import { SnackBarActions } from "../../utilities/utils.actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { LinearProgress } from "@material-ui/core";
import { GetSubscription, SetSubscription } from "../user/user.actions";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import moment from "moment";

type Props = {
  configureSnack: (config: any) => void;
  getSubscriptionDetails: (userId) => void;
  setSubscription: (payload: any) => void;
  user: any;
  subscription: any;
  subscriptionGetStatus: string;
  subscriptionSetStatus: string;
};
const mapStateToProps = (state: any) => ({
  user: state.Auth.user,
  subscription: state.User.subscription,
  subscriptionGetStatus: state.User.subscriptionGetStatus,
  subscriptionSetStatus: state.User.subscriptionSetStatus,
});

const mapDispatchStateToProps = (dispatch: any) => ({
  getSubscriptionDetails: (userId: string) =>
    dispatch({
      type: GetSubscription.GET_SUBSCRIPTION_CALLER,
      payload: userId,
    }),
  configureSnack: (payload: any) =>
    dispatch({ type: SnackBarActions.CONFIGURE_SNACKBAR_CALLER, payload }),
  setSubscription: (payload: any) =>
    dispatch({ type: SetSubscription.SET_SUBSCRIPTION_CALLER, payload }),
});

class Subscription extends React.Component<Props> {
  state = {
    email: "solomonyunana95@gmail.com",
  };

  componentDidMount() {
    console.log(this.props.subscription);
    this.props.getSubscriptionDetails(this.props.user.userId);
  }
  render() {
    const getSubLoading =
      this.props.subscriptionGetStatus ===
      GetSubscription.GET_SUBSCRIPTION_STARTED;
    const setSubLoading =
      this.props.subscriptionSetStatus ===
      SetSubscription.SET_SUBSCRIPTION_STARTED;
    return (
      <>
        <div className="  mx-2" style={{ background: "#fafafa" }}>
          {getSubLoading ? (
            <>
              <LinearProgress />
            </>
          ) : (
            <Paper className="py-3 col-md-6 text-center mx-auto mt-2">
              {setSubLoading && (
                <>
                  <CircularProgress size={50} />
                  <div>
                    <h5 className="mt-4">Verifying Subscription ... </h5>
                  </div>
                </>
              )}
              {!getSubLoading && !setSubLoading && (
                <div className="text-center mx-auto" style={{ width: "90%" }}>
                  <h5 style={{ textAlign: "center" }}>Monthly Plan</h5>
                  <span
                    className="d-flex justify-content-center "
                    style={{
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      fontSize: 40,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  >
                    <div>
                      <sup>₦</sup>500
                    </div>
                    {this.props.subscription && (
                      <Avatar
                        style={{ width: 50, height: 50 }}
                        className="bg-success"
                      >
                        <DoneAllIcon className="text-white" />
                      </Avatar>
                    )}
                  </span>
                  {this.props.subscription && (
                    <h4 className="my-3">
                      Your subscription is active and will expire in{" "}
                      <span
                        className="text-primary"
                        style={{ fontWeight: "bold" }}
                      >
                        {moment(this.props.subscription.expiryDate).diff(
                          new Date(),
                          "days"
                        ) + 1}{" "}
                      </span>
                      days
                    </h4>
                  )}
                  <ListItem
                    style={{ marginRight: 10, borderRadius: 10 }}
                    className="text-center my-2 bg-light"
                  >
                    <ListItemText
                      primary="Unlimited Jobs"
                      secondary={
                        "View unlimited jobs when you subscribe, there is no limit to number of jobs you can view"
                      }
                    />
                  </ListItem>

                  <ListItem
                    style={{ marginRight: 10, borderRadius: 10 }}
                    className="text-center my-2 "
                  >
                    <ListItemText
                      primary="Jobworld 360 membership"
                      secondary={
                        "Become a member of jobword360 and get chance to be allocated a job by our employers looking for potential employees"
                      }
                    />
                  </ListItem>

                  <ListItem
                    style={{ marginRight: 10, borderRadius: 10 }}
                    className="text-center my-2 bg-light"
                  >
                    <ListItemText
                      primary="Unlimited notification"
                      secondary={
                        "Get unlimited notifications when a new job is posted so you can keep tab on every latest job availabe!!"
                      }
                    />
                  </ListItem>
                  {this.props.subscription ? (
                    <></>
                  ) : (
                    <>
                      <TextField
                        id="outlined-error-helper-text"
                        fullWidth
                        label="Email Address"
                        value={this.state.email}
                        onChange={(e) =>
                          this.setState({ email: e.target.value })
                        }
                        variant="outlined"
                        className="mt-3 mb-2"
                      />
                      <Payment
                        configs={{ amount: 50000, email: this.state.email }}
                        onClose={() =>
                          this.props.configureSnack({
                            show: true,
                            message:
                              "Could not process payment now please try again later",
                            status: "error",
                          })
                        }
                        onSuccess={(reference) =>
                          this.props.setSubscription({
                            transactionReference: reference.reference,
                            userId: this.props.user.userId,
                          })
                        }
                      >
                        <Button
                          size="large"
                          style={{ width: "100%" }}
                          startIcon={<CreditCardIcon />}
                          variant="contained"
                          color="primary"
                          className="mx-auto"
                        >
                          Subscribe Now
                        </Button>
                      </Payment>
                    </>
                  )}
                </div>
              )}
            </Paper>
          )}
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Subscription);
