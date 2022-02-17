import React from "react";
import TextField from "@material-ui/core/TextField";
import "react-step-progress/dist/index.css";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import States from "../../../assets/ng.states";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import WorkIcon from "@material-ui/icons/Work";
import { connect } from "react-redux";
import * as joi from "joi";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogComponent from "../../../components/dialog";
import Helpers from "../../../utilities/helpers";
import { StepInputAction } from "./steps.actions";

type experience = {
  organization: string;
  position: string;
  start: string;
  end: string;
  address: string;
  state: number;
};
type Props = {
  error: string;
  experiences: experience[];
  setFieldValue: (step: string, property: string, value: any) => void;
};
const mapStateToProps = (state: any) => ({
  error: state.Steps.error,
  experiences: state.Steps.stepTwo.experiences,
});

const validateInput = joi.object({
  organization: joi.string().required(),
  position: joi.string().required(),
  start: joi.string().required(),
  end: joi.string().required(),
  address: joi.string().required(),
  state: joi.number().required(),
});

const mapDispatchToProps = (dispatch: any) => ({
  setFieldValue: (step: string, property: string, value: any) =>
    dispatch({
      type: StepInputAction.SET_FIELD_VALUE_CALLER,
      payload: { step, property, value },
    }),
});
class StepTwo extends React.Component<Props> {
  state = {
    stateId: "",
    disabled: true,
    workingExperience: false,
    showDeleteDialog: false,

    organization: "",
    position: "",
    start: "",
    end: "",
    address: "",
    state: "",

    error: "",
    removeIndex: 0,
  };

  toggleDialog = () => {
    this.setState({ showDeleteDialog: !this.state.showDeleteDialog });
  };

  addExperience() {
    const { organization, position, start, end, address, state } = this.state;
    let payload = { organization, position, start, end, address, state };
    const { error } = validateInput.validate(payload);
    if (error) {
      this.setState({ error: error.message });
    } else {
      const experiences = this.props.experiences || [];
      experiences.push(payload as any);
      this.props.setFieldValue("stepTwo", "experiences", experiences);
      this.setState({
        workingExperience: false,
        error: "",
        organization: "",
        position: "",
        start: "",
        end: "",
        address: "",
        state: "",
      });
    }
  }

  removeExperience = () => {
    const experiences = Object.assign([], this.props.experiences);
    experiences.splice(this.state.removeIndex, 1);
    this.props.setFieldValue("stepTwo", "experiences", experiences);
    this.setState({ showDeleteDialog: false, error: "" });
  };

  render() {
    return (
      <div className="">
        {this.props.error && (
          <div className="alert alert-danger" role="alert">
            {this.props.error}
          </div>
        )}

        {this.state.error && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        {this.state.workingExperience && (
          <div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.organization}
                  onChange={(e) =>
                    this.setState({ organization: e.target.value })
                  }
                  type="text"
                  id="organization"
                  label="Name of Oranization"
                  name="organization"
                  autoFocus
                />
              </div>
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.position}
                  onChange={(e) => this.setState({ position: e.target.value })}
                  name="job-title"
                  label="Role / Job title"
                  type="text"
                  id="job-title"
                />
              </div>
            </div>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
              id="address"
              label="Organization Address"
              name="organization-address"
            />

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
                    onChange={(e: any) =>
                      this.setState({
                        state: parseInt(e.target.value as string),
                      })
                    }
                    value={this.state.state}
                    labelId="demo-simple-select-outlined-labeldfd"
                    id="demo-simple-select-outlineddf"
                    label="State"
                  >
                    {States.map(({ state: { name, id } }) => (
                      <MenuItem
                        selected={(this.state.state as any) === id}
                        value={id}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6"></div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="date"
                  value={this.state.start}
                  onChange={(e) => this.setState({ start: e.target.value })}
                  id="dateEmployed"
                  label="Start Date"
                  name="dateEmployed"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.end}
                  onChange={(e) => this.setState({ end: e.target.value })}
                  type="date"
                  id="endDate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="End Date"
                  name="endDate"
                />
              </div>
            </div>
          </div>
        )}

        {this.props.experiences.length > 0 && !this.state.workingExperience && (
          <List>
            {this.props.experiences.map((experience, index) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={experience.organization}
                  secondary={experience.position}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() =>
                      this.setState({
                        showDeleteDialog: true,
                        removeIndex: index,
                      })
                    }
                    edge="end"
                    aria-label="comments"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
        <div className="text-center my-4">
          {this.props.experiences.length === 0 &&
            !this.state.workingExperience && (
              <div>
                <WorkIcon style={{ fontSize: 70 }} />
                <h5>Add working Experience </h5>
              </div>
            )}

          {!this.state.workingExperience && (
            <Fab
              onClick={() => this.setState({ workingExperience: true })}
              color="primary"
              aria-label="add"
              style={{ marginTop: 20 }}
            >
              <AddIcon />
            </Fab>
          )}

          {this.state.workingExperience && (
            <Button
              onClick={() => this.addExperience()}
              size="large"
              variant="contained"
              color="primary"
            >
              Add Experience
            </Button>
          )}

          <DialogComponent
            bodyText="Are you sure you want to remove work experience"
            buttonText1="Cancel"
            buttonText2="Remove"
            handleClose={this.toggleDialog}
            handleAction={this.removeExperience}
            open={this.state.showDeleteDialog}
            headerTitle="Remove Experience"
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
