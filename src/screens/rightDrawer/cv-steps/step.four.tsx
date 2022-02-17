import React from "react";
import TextField from "@material-ui/core/TextField";
import "react-step-progress/dist/index.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import States from "../../../assets/ng.states";
import { connect } from "react-redux";
import { StepInputAction } from "./steps.actions";
import { Typography } from "@material-ui/core";

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
};
const mapStateToProps = (state: any) => ({
  fullName: state.Steps.stepFour.fullName,
  address: state.Steps.stepFour.address,
  sex: state.Steps.stepFour.sex,
  age: state.Steps.stepFour.age,
  state: state.Steps.stepFour.state,
  lga: state.Steps.stepFour.lga,
  phoneNumber: state.Steps.stepFour.phoneNumber,
  error: state.Steps.error,
});

const mapDispatchStateToProps = (dispatch: any) => ({
  setFieldValue: (step: string, property: string, value: any) =>
    dispatch({
      type: StepInputAction.SET_FIELD_VALUE_CALLER,
      payload: { step, property, value },
    }),
});

class StepFour extends React.Component<Props> {
  static step = "stepFour";
  render() {
    return (
      <div className="">
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            {this.props.error}
          </div>
        )}

        <Typography className="my-3 text-center" variant="h6" component="h2">
          Guarrantor's Information
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="text"
          value={this.props.fullName}
          onChange={(e) =>
            this.props.setFieldValue(StepFour.step, "fullName", e.target.value)
          }
          id="fullName"
          label="Full Name"
          name="text"
          autoFocus
        />

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
                  StepFour.step,
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
                  StepFour.step,
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
                    StepFour.step,
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
                    StepFour.step,
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
                this.props.setFieldValue(StepFour.step, "age", e.target.value)
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
                  this.props.setFieldValue(StepFour.step, "sex", e.target.value)
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
        <Typography
          style={{ fontSize: 13 }}
          className="my-3 text-danger"
          variant="inherit"
          component="p"
        >
          By submitting you agree that every information provided by you is
          correct and you will be held responsible for any false information you
          provide to Jobworld.
        </Typography>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(StepFour);
