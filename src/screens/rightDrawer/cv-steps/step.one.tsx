import React from "react";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Camera from "@material-ui/icons/Photo";
import "react-step-progress/dist/index.css";
import { InputLabel, Avatar } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import States from "../../../assets/ng.states";
import { connect } from "react-redux";
import { StepInputAction } from "./steps.actions";

type Props = {
  setFieldValue: (step: string, property: string, value: any) => void;
  fullName: string;
  address: string;
  age: number;
  state: number;
  lga: number;
  phoneNumber: string;
  sex: string;
  error: string;
  file: any;
  preview: any;
};
const mapStateToProps = (state: any) => ({
  fullName: state.Steps.stepOne.fullName,
  address: state.Steps.stepOne.address,
  sex: state.Steps.stepOne.sex,
  age: state.Steps.stepOne.age,
  file: state.Steps.stepOne.file,
  preview: state.Steps.stepOne.preview,
  state: state.Steps.stepOne.state,
  lga: state.Steps.stepOne.lga,
  phoneNumber: state.Steps.stepOne.phoneNumber,
  error: state.Steps.error,
});

const mapDispatchStateToProps = (dispatch: any) => ({
  setFieldValue: (step: string, property: string, value: any) =>
    dispatch({
      type: StepInputAction.SET_FIELD_VALUE_CALLER,
      payload: { step, property, value },
    }),
});

class StepOne extends React.Component<Props> {
  static step = "stepOne";

  render() {
    return (
      <div className="">
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            {this.props.error}
          </div>
        )}
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <label htmlFor="btn-upload">
              <input
                id="btn-upload"
                name="btn-upload"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  let fr = new FileReader();
                  let files: any = e.target.files;
                  let _this = this;
                  fr.onload = function (e) {
                    _this.props.setFieldValue(StepOne.step, "file", files[0]);
                    _this.props.setFieldValue(
                      StepOne.step,
                      "preview",
                      this.result
                    );
                  };
                  fr.readAsDataURL(files[0]);
                }}
              />
              <Avatar
                alt="Remy Sharp"
                src={this.props.preview}
                style={{ width: 100, height: 100 }}
              />
              <Avatar
                style={{ top: "50%", right: "30%", position: "absolute" }}
              >
                <Camera />
              </Avatar>
            </label>
          </div>
          <div className="col-md-6">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              value={this.props.fullName}
              onChange={(e) =>
                this.props.setFieldValue(
                  StepOne.step,
                  "fullName",
                  e.target.value
                )
              }
              id="fullName"
              label="Full Name"
              name="text"
              autoFocus
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="address"
              value={this.props.address}
              onChange={(e) =>
                this.props.setFieldValue(
                  StepOne.step,
                  "address",
                  e.target.value
                )
              }
              id="address"
              label="Street Address"
              name="address"
            />
          </div>
          <div className="col-md-6">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.props.phoneNumber}
              onChange={(e) =>
                this.props.setFieldValue(
                  StepOne.step,
                  "phoneNumber",
                  e.target.value
                )
              }
              name="phoneNumber"
              label="Phone Number"
              type="number"
              id="phoneNumber"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormControl
              margin="normal"
              style={{ width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                State
              </InputLabel>
              <Select
                value={this.props.state}
                onChange={(e: any) =>
                  this.props.setFieldValue(
                    StepOne.step,
                    "state",
                    parseInt(e.target.value as string)
                  )
                }
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="State"
              >
                {States.map(({ state: { name, id } }) => (
                  <MenuItem
                    selected={(this.props.state as any) === id}
                    value={id}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-6">
            <FormControl
              margin="normal"
              style={{ width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                LGA
              </InputLabel>
              <Select
                disabled={
                  this.props.state || (this.props.state as any) === 0
                    ? false
                    : true
                }
                value={this.props.lga}
                onChange={(e: any) =>
                  this.props.setFieldValue(
                    StepOne.step,
                    "lga",
                    parseInt(e.target.value as string)
                  )
                }
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="State"
              >
                {this.props.state || (this.props.state as any) === 0
                  ? States[this.props.state - 1].state.locals.map(
                      ({ name, id }) => (
                        <MenuItem
                          selected={(this.props.state as any) === id}
                          value={id}
                        >
                          {name}
                        </MenuItem>
                      )
                    )
                  : null}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="number"
              value={this.props.age}
              onChange={(e) =>
                this.props.setFieldValue(StepOne.step, "age", e.target.value)
              }
              id="age"
              label="Age"
              name=""
            />
          </div>
          <div className="col-md-6">
            <FormControl
              margin="normal"
              style={{ width: "100%" }}
              variant="outlined"
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Sex
              </InputLabel>
              <Select
                value={this.props.sex}
                onChange={(e) =>
                  this.props.setFieldValue(StepOne.step, "sex", e.target.value)
                }
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(StepOne);
