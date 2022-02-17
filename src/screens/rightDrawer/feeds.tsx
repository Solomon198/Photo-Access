import React from "react";
import { connect } from "react-redux";
import FeedsContent from "../user/Content";
import "./style.css";
import brand from "../../configs/colors.presets";
import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  LinearProgress,
  Hidden,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { GetAllJobs } from "../user/user.actions";
import joi from "joi";
import DialogComponent from "../../components/dialog";

const postJobSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  more: joi.string().required(),
  priority: joi.string().required(),
  address: joi.string().required(),
});

const mapStateToProps = (state: any) => ({
  jobs: state.User.jobs,
  getAllJobStatus: state.User.getAllJobStatus,
  postJobStatus: state.User.postJobStatus,
  title: state.User.title,
  description: state.User.description,
  more: state.User.more,
  priority: state.User.priority,
  address: state.User.address,
});

type Props = {
  jobs: any[];
  getAllJobStatus: string;

  getJobs: () => void;
};

const mapDispatchStateToProps = (dispatch: any) => ({
  getJobs: () => dispatch({ type: GetAllJobs.GET_JOBS__CALLER }),
});

class Feeds extends React.Component<Props> {
  state = {
    activeIndex: Infinity,
    error: "",
    showModal: false,
    jobId: "",
  };

  componentDidMount() {
    this.props.getJobs();
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    const isLoadingJobs =
      this.props.getAllJobStatus === GetAllJobs.GET_JOBS__STARTED;

    return (
      <div
        style={{
          backgroundColor: brand.background,
          height: "100%",
          width: "100%",
        }}
        className="hide-scroll-bar"
      >
        {isLoadingJobs && (
          <LinearProgress color={isLoadingJobs ? "primary" : "secondary"} />
        )}

        <div style={{ marginBottom: 10 }} />
        <div
          style={{
            backgroundColor: brand.background,
            height: "100%",
            width: "100%",
          }}
          className="hide-scroll-bar"
        >
          <div
            className="d-flex justify-content-center "
            style={{ height: "100%", overflow: "hidden" }}
          >
            {/* {isLoadingJobs && (
                <div className='text-center'>
                  <CircularProgress />
                </div>
              )} */}

            {this.props.jobs.length === 0 && !isLoadingJobs && (
              <div style={{ marginTop: 200, textAlign: "center" }}>
                <h4 style={{ textAlign: "center" }}>No jobs posted yet !!!!</h4>
              </div>
            )}
            <Hidden implementation="js" mdUp>
              <div
                style={{ height: "100%", width: "100%" }}
                className="scroll hide-scroll-bar mx-2"
              >
                {this.props.jobs.map((val, index) => (
                  <FeedsContent
                    isDeleting={false}
                    onClick={(jobId: string) =>
                      this.setState({ showModal: true, jobId })
                    }
                    data={val}
                    index={index}
                    activeIndex={this.state.activeIndex}
                    setActiveIndex={(index) => {
                      if (this.state.activeIndex === index) {
                        this.setState({ activeIndex: Infinity });
                      } else {
                        this.setState({ activeIndex: index });
                      }
                    }}
                  />
                ))}
              </div>
            </Hidden>
            <Hidden implementation="js" smDown>
              <div
                style={{ height: "100%", width: "60%" }}
                className="scroll hide-scroll-bar mx-auto"
              >
                {this.props.jobs.map((val, index) => (
                  <FeedsContent
                    isDeleting={false}
                    onClick={(jobId: string) =>
                      this.setState({ showModal: true, jobId })
                    }
                    data={val}
                    index={index}
                    activeIndex={this.state.activeIndex}
                    setActiveIndex={(index) => {
                      if (this.state.activeIndex === index) {
                        this.setState({ activeIndex: Infinity });
                      } else {
                        this.setState({ activeIndex: index });
                      }
                    }}
                  />
                ))}
              </div>
            </Hidden>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Feeds);
