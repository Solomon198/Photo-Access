import React from "react";
import { connect } from "react-redux";
import StepProgressBar from "react-step-progress";
import Steps from "./cv-steps/index";
import { StepInputAction, SubmitCv } from "./cv-steps/steps.actions";
import * as joi from "joi";
import { CircularProgress } from "@material-ui/core";
import BackDrop from "../../components/backdrop";
import { SnackBarActions } from "../../utilities/utils.actions";
import firebase from "firebase";

type Props = {
  StepOne: any;
  StepTwo: any;
  StepThree: any;
  StepFour: any;
  user: any;
  history: any;
  submitCvStatus: string;
  configureSnackBar: (payload: any) => void;
  setError: (error: string) => void;
  resetSubmitAction: () => void;
  submitCv: (payload: any, history: any) => void;
};
const mapStateToProps = (state: any) => ({
  StepOne: state.Steps.stepOne,
  StepTwo: state.Steps.stepTwo,
  StepThree: state.Steps.stepThree,
  StepFour: state.Steps.stepFour,
  submitCvStatus: state.Steps.submitCvStatus,
  user: state.Auth.user,
});

const mapDispatchStateToProps = (dispatch: any) => ({
  setError: (error: string) =>
    dispatch({ type: StepInputAction.SET_ERROR_TEXT_CALLER, payload: error }),
  resetSubmitAction: () =>
    dispatch({ type: StepInputAction.RESET_SUBMIT_STATUS_CALLER }),
  configureSnackBar: (payload: any) =>
    dispatch({ type: SnackBarActions.CONFIGURE_SNACKBAR_CALLER, payload }),
  submitCv: (payload: any, history: any) =>
    dispatch({ type: SubmitCv.SUBMITCV_CALLER, payload, history }),
});

const StepOneValidator = joi.object({
  fullName: joi.string().required().min(3),
  phoneNumber: joi.string().required().min(11),
  age: joi.number().required(),
  state: joi.number().required(),
  lga: joi.number().required(),
  address: joi.string().required(),
  sex: joi.string().required(),
  file: joi.any().required(),
  preview: joi.any().required(),
});

const StepFourValidator = joi.object({
  fullName: joi.string().required(),
  address: joi.string().required(),
  age: joi.number().required(),
  state: joi.number().required(),
  lga: joi.number().required(),
  phoneNumber: joi.string().required(),
  sex: joi.string().required(),
});

class CreateCV extends React.Component<Props> {
  state = {
    progress: 0,
    uploading: false,
  };

  componentDidMount() {}
  componentWillUnmount() {
    if (this.props.submitCvStatus === SubmitCv.SUBMITCV_STARTED) {
      this.props.resetSubmitAction();
      this.props.configureSnackBar({
        show: true,
        message: "Submiting CV failed !!",
        status: "error",
      });
    }
  }

  submitCv(url: string) {
    const payload = {
      ...this.props.StepOne,
      ...this.props.StepTwo,
      ...this.props.StepThree,
      guarrantor: this.props.StepFour,
    };
    delete payload.file;
    delete payload.preview;
    payload.profilePicture = url;
    payload.userId = this.props.user.userId;
    console.log(payload);
    this.props.submitCv(payload, this.props.history);
  }

  isStepOneValid = () => {
    const { error } = StepOneValidator.validate(this.props.StepOne);
    if (error) {
      this.props.setError(error.message);
      return false;
    }
    return true;
  };

  status() {
    if (this.state.uploading) {
      const progress = isNaN(this.state.progress) ? 0 : this.state.progress;
      return "Uploading Files ... " + progress + "%";
    }
    return "Submitting CV";
  }

  uploadProfilePicture() {
    const storageRef = firebase
      .storage()
      .ref("user/profile")
      .child("IMG" + this.props.user.userId);
    const uploadTask = storageRef.put(this.props.StepOne.file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        // Handle unsuccessful uploads
        this.props.resetSubmitAction();
        this.setState({ uploading: false });
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.setState({ uploading: false }, () => {
            this.submitCv(downloadURL);
          });
        });
      }
    );
  }

  isStepFourValid = () => {
    delete this.props.StepFour.skills;
    const { error } = StepFourValidator.validate(this.props.StepFour);
    if (error) {
      this.props.setError(error.message);
      return false;
    }

    if (typeof this.props.StepOne.file === "string") {
      this.submitCv(this.props.StepOne.file);
    }
    this.setState({ uploading: true }, () => {
      this.uploadProfilePicture();
    });
  };

  render() {
    return (
      <div className="stepper">
        <StepProgressBar
          startingStep={0}
          onSubmit={() => this.isStepFourValid()}
          steps={[
            {
              label: "25%",
              subtitle: "",
              name: "step 1",
              content: <Steps.StepOne />,
              validator: this.isStepOneValid,
            },
            {
              label: "50%",
              subtitle: "",
              name: "step 2",
              content: <Steps.StepTwo />,
              //   validator: step2Validator
            },
            {
              label: "75%",
              subtitle: "",
              name: "step 3",
              content: <Steps.StepThree />,
            },
            {
              label: "100%",
              subtitle: "",
              name: "step 4",
              content: <Steps.StepFour />,
            },
          ]}
        />
        <BackDrop
          open={
            this.props.submitCvStatus === SubmitCv.SUBMITCV_STARTED ||
            this.state.uploading
          }
        >
          <CircularProgress color="inherit" />
          <h5 style={{ marginLeft: 20 }}>{this.status()} </h5>
        </BackDrop>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(CreateCV);
