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
import EducationIcon from "@material-ui/icons/School";
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

type education = {
  institution: string;
  qualification: string;
  fieldOfStudy: string;
  graduationDate: string;
  state: number;
};
type Props = {
  error: string;
  education: education[];
  setFieldValue: (step: string, property: string, value: any) => void;
};
const mapStateToProps = (state: any) => ({
  error: state.Steps.error,
  education: state.Steps.stepThree.education,
});

const validateInput = joi.object({
  institution: joi.string().required(),
  qualification: joi.number().required(),
  fieldOfStudy: joi.string().required(),
  graduationDate: joi.string().required(),
  state: joi.number().required(),
});

const mapDispatchToProps = (dispatch: any) => ({
  setFieldValue: (step: string, property: string, value: any) =>
    dispatch({
      type: StepInputAction.SET_FIELD_VALUE_CALLER,
      payload: { step, property, value },
    }),
});
class StepThree extends React.Component<Props> {
  state = {
    stateId: "",
    disabled: true,
    addEducation: false,
    showDeleteDialog: false,

    institution: "",
    qualification: "",
    fieldOfStudy: "",
    graduationDate: "",
    state: "",

    error: "",
    removeIndex: 0,
  };

  toggleDialog = () => {
    this.setState({ showDeleteDialog: !this.state.showDeleteDialog });
  };

  addEducation() {
    const { institution, qualification, fieldOfStudy, graduationDate, state } =
      this.state;
    let payload = {
      institution,
      qualification,
      fieldOfStudy,
      graduationDate,
      state,
    };
    const { error } = validateInput.validate(payload);
    if (error) {
      this.setState({ error: error.message });
    } else {
      const education = this.props.education || [];
      education.push(payload as any);
      this.props.setFieldValue("stepThree", "education", education);
      this.setState({
        addEducation: false,
        error: "",
        institution: "",
        qualification: "",
        fieldOfStudy: "",
        graduationDate: "",
        state: "",
      });
    }
  }

  removeEducation = () => {
    const education = Object.assign([], this.props.education);
    education.splice(this.state.removeIndex, 1);
    this.props.setFieldValue("stepThree", "education", education);
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
        {this.state.addEducation && (
          <div>
            <div className="row">
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={this.state.institution}
                  onChange={(e) =>
                    this.setState({ institution: e.target.value })
                  }
                  type="text"
                  id="institution"
                  label="Name of Oranization"
                  name="institution"
                  autoFocus
                />
              </div>
              <div className="col-md-6">
                <FormControl
                  margin="normal"
                  style={{ width: "100%" }}
                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Qualification
                  </InputLabel>
                  <Select
                    onChange={(e: any) =>
                      this.setState({
                        qualification: e.target.value,
                      })
                    }
                    value={this.state.qualification}
                    labelId="demo-simple-select-outlined-labeldfd"
                    id="demo-simple-select-outlineddf"
                    label="State"
                  >
                    {["O level", "A level"].map((qualification, index) => (
                      <MenuItem
                        selected={this.state.qualification === qualification}
                        value={index}
                      >
                        {qualification}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
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
            <div className="row">
              <div className="col-md-6">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="date"
                  value={this.state.graduationDate}
                  onChange={(e) =>
                    this.setState({ graduationDate: e.target.value })
                  }
                  id="graduationDate"
                  label="Graduation Date"
                  name="graduationDate"
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
                  value={this.state.fieldOfStudy}
                  onChange={(e) =>
                    this.setState({ fieldOfStudy: e.target.value })
                  }
                  type="text"
                  id="fieldOfStudy"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Field of Study"
                  name="fieldOfStudy"
                />
              </div>
            </div>
          </div>
        )}

        {this.props.education.length > 0 && !this.state.addEducation && (
          <List>
            {this.props.education.map((experience, index) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EducationIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={experience.institution}
                  secondary={experience.fieldOfStudy}
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
          {this.props.education.length === 0 && !this.state.addEducation && (
            <div>
              <EducationIcon style={{ fontSize: 70 }} />
              <h5>Add Education </h5>
            </div>
          )}

          {!this.state.addEducation && (
            <Fab
              onClick={() => this.setState({ addEducation: true })}
              color="primary"
              aria-label="add"
              style={{ marginTop: 20 }}
            >
              <AddIcon />
            </Fab>
          )}

          {this.state.addEducation && (
            <Button
              onClick={() => this.addEducation()}
              size="large"
              variant="contained"
              color="primary"
            >
              Add Education
            </Button>
          )}

          <DialogComponent
            bodyText="Are you sure you want to remove work education"
            buttonText1="Cancel"
            buttonText2="Remove"
            handleClose={this.toggleDialog}
            handleAction={this.removeEducation}
            open={this.state.showDeleteDialog}
            headerTitle="Remove Education"
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
