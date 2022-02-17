import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { CVType } from '../../types/declarations';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';
import AddressIcon from '@material-ui/icons/LocationCity';
import PersonIcon from '@material-ui/icons/Person';
import EducationIcon from '@material-ui/icons/School';
import {
  Work,
  ContactPhone,
  Face,
  PinDrop,
  Dialpad,
  Close,
  Check,
  Edit,
} from '@material-ui/icons';
import States from '../../assets/ng.states';
import Chip from '@material-ui/core/Chip';
import { GetCvActions } from '../user/user.actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import BackDrop from '../../components/backdrop';
import { User } from '../../types/declarations';
import brand from '../../configs/colors.presets';
import Description from '@material-ui/icons/Description';

const mapStateToProps = (state: any) => ({
  cv: state.User.cv,
  getCvStatus: state.User.getCvStatus,
  user: state.Auth.user,
});

const mapDispatchStateToProps = (dispatch: any) => ({
  getCv: (userId: string) =>
    dispatch({ type: GetCvActions.GET_CV_CALLER, payload: userId }),
});
type Props = {
  history: any;
  cv: CVType;
  user: User;
  getCvStatus: string;
  getCv: (userId: string) => void;
};
class CV extends React.Component<Props> {
  componentDidMount() {
    console.log(this.props.user);
    this.props.getCv(this.props.user.userId);
  }
  render() {
    const cv = this.props.cv || {};
    return (
      <>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: brand.background,
            }}
            className='d-flex justify-content-center align-items-center'
          >
            {Object.keys(cv).length > 0 && (
              <div style={{ marginTop: 10, marginBottom: 10, width: '100%' }}>
                <Paper style={{ width: '90%', margin: 'auto', opacity: 0.75 }}>
                  <div className='container'>
                    <h4
                      style={{
                        textAlign: 'center',
                        paddingTop: 15,
                        marginBottom: 5,
                      }}
                    >
                      Employee Information
                    </h4>
                    <div className='row'>
                      <div className='col-md-4 py-3 text-center'>
                        <Avatar
                          alt='profile picture'
                          className='mx-auto'
                          style={{ width: 120, height: 120 }}
                          src={cv.profilePicture}
                        />

                        {!cv.isApproved && (
                          <Chip
                            icon={<Edit />}
                            className='my-3'
                            label='Edit my  CV'
                            onClick={() =>
                              this.props.history.push('/dashboard/cv/create')
                            }
                          />
                        )}
                        <br></br>

                        <Chip
                          color={cv.isApproved ? 'primary' : 'secondary'}
                          icon={cv.isApproved ? <Check /> : <Close />}
                          className='my-1'
                          label={
                            cv.isApproved ? 'CV approved' : 'CV not Approved'
                          }
                        />
                      </div>

                      <div className='col-md-8'>
                        <div className='row'>
                          <div className='col-md-6 mt-2 mx-auto'>
                            <h6 style={{ fontWeight: 'bold', marginTop: 10 }}>
                              Personal Information
                            </h6>
                            <div className='d-flex flex-row align-items-center'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <PersonIcon style={{ fontSize: 18 }} />
                              </Avatar>
                              <h6 style={{ marginBottom: 0, marginLeft: 10 }}>
                                {cv.fullName}
                              </h6>
                            </div>
                            <div className='d-flex mt-1 flex-row align-items-center'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <Face style={{ fontSize: 18 }} />
                              </Avatar>
                              <h6 style={{ marginBottom: 0, marginLeft: 10 }}>
                                {cv.sex}
                              </h6>
                            </div>

                            <div className='d-flex mt-1 flex-row align-items-center'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <Dialpad style={{ fontSize: 18 }} />
                              </Avatar>
                              <h6 style={{ marginBottom: 0, marginLeft: 10 }}>
                                {cv.age} years
                              </h6>
                            </div>
                          </div>
                          <div className='col-md-6 mt-2 mx-auto'>
                            <h6 style={{ fontWeight: 'bold', marginTop: 10 }}>
                              Contact Information
                            </h6>

                            <div className='d-flex flex-row align-items-center mt-1'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <AddressIcon style={{ fontSize: 18 }} />
                              </Avatar>
                              <h5
                                style={{
                                  fontSize: 14,
                                  marginLeft: 10,
                                  marginBottom: 0,
                                }}
                              >
                                {cv.address}
                              </h5>
                            </div>

                            <div className='d-flex flex-row align-items-center mt-1'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <PinDrop style={{ fontSize: 18 }} />
                              </Avatar>
                              <div>
                                <h5
                                  style={{
                                    fontSize: 14,
                                    marginLeft: 10,
                                    marginBottom: 0,
                                  }}
                                >
                                  {States[cv.state - 1].state.name}
                                </h5>
                                <h6 style={{ fontSize: 12, marginLeft: 10 }}>
                                  {
                                    States[cv.state - 1].state.locals[
                                      cv.lga - 1
                                    ].name
                                  }
                                </h6>
                              </div>
                            </div>

                            <div className='d-flex flex-row align-items-center mt-1'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <ContactPhone style={{ fontSize: 18 }} />
                              </Avatar>
                              <h5
                                style={{
                                  fontSize: 14,
                                  marginLeft: 10,
                                  marginBottom: 0,
                                }}
                              >
                                {cv.phoneNumber}
                              </h5>
                            </div>
                          </div>
                        </div>

                        <div className='row mt-4'>
                          <div className='col-md-6'>
                            <h6 style={{ fontWeight: 'bold' }}>Education</h6>
                            {cv.education.map((education) => (
                              <div className='d-flex flex-row align-items-center mt-1'>
                                <Avatar style={{ width: 25, height: 25 }}>
                                  <EducationIcon style={{ fontSize: 18 }} />
                                </Avatar>
                                <div>
                                  <h5
                                    style={{
                                      fontSize: 14,
                                      marginLeft: 10,
                                      marginBottom: 0,
                                    }}
                                  >
                                    {education.institution}
                                  </h5>
                                  <h6 style={{ marginLeft: 10, fontSize: 12 }}>
                                    {education.fieldOfStudy}
                                  </h6>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className='col-md-6'>
                            <h6 style={{ fontWeight: 'bold' }}>Experiences</h6>
                            {cv.experiences.map((experience) => (
                              <div className='d-flex flex-row align-items-center mt-1'>
                                <Avatar style={{ width: 25, height: 25 }}>
                                  <Work style={{ fontSize: 18 }} />
                                </Avatar>
                                <div>
                                  <h5
                                    style={{
                                      fontSize: 14,
                                      marginLeft: 10,
                                      marginBottom: 0,
                                    }}
                                  >
                                    {experience.organization}
                                  </h5>
                                  <h6 style={{ marginLeft: 10, fontSize: 12 }}>
                                    {experience.position}
                                  </h6>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className='row pb-4 mt-2'>
                          <div className='col-md-6'>
                            <h6 style={{ fontWeight: 'bold', marginTop: 15 }}>
                              Guarrantor Information
                            </h6>
                            <div className='d-flex flex-row align-items-center'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <PersonIcon style={{ fontSize: 18 }} />
                              </Avatar>
                              <h6 style={{ marginBottom: 0, marginLeft: 10 }}>
                                {cv.guarrantor.fullName}
                              </h6>
                            </div>
                            <div className='d-flex mt-1 flex-row align-items-center'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <Face style={{ fontSize: 18 }} />
                              </Avatar>
                              <h6 style={{ marginBottom: 0, marginLeft: 10 }}>
                                {cv.guarrantor.sex}
                              </h6>
                            </div>

                            <div className='d-flex mt-1 flex-row align-items-center'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <Dialpad style={{ fontSize: 18 }} />
                              </Avatar>
                              <h6 style={{ marginBottom: 0, marginLeft: 10 }}>
                                {cv.guarrantor.age} years
                              </h6>
                            </div>
                          </div>
                          <div className='col-md-6 mx-auto'>
                            <h6 style={{ fontWeight: 'bold', marginTop: 10 }}>
                              Guarrantor Contact Information
                            </h6>

                            <div className='d-flex flex-row align-items-center mt-1'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <AddressIcon style={{ fontSize: 18 }} />
                              </Avatar>
                              <h5
                                style={{
                                  fontSize: 14,
                                  marginLeft: 10,
                                  marginBottom: 0,
                                }}
                              >
                                {cv.guarrantor.address}
                              </h5>
                            </div>

                            <div className='d-flex flex-row align-items-center mt-1'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <PinDrop style={{ fontSize: 18 }} />
                              </Avatar>
                              <div>
                                <h5
                                  style={{
                                    fontSize: 14,
                                    marginLeft: 10,
                                    marginBottom: 0,
                                  }}
                                >
                                  {States[cv.guarrantor.state - 1].state.name}
                                </h5>
                                <h6 style={{ fontSize: 12, marginLeft: 10 }}>
                                  {
                                    States[cv.guarrantor.state - 1].state
                                      .locals[cv.lga - 1].name
                                  }
                                </h6>
                              </div>
                            </div>

                            <div className='d-flex flex-row align-items-center mt-1'>
                              <Avatar style={{ width: 25, height: 25 }}>
                                <ContactPhone style={{ fontSize: 18 }} />
                              </Avatar>
                              <h5
                                style={{
                                  fontSize: 14,
                                  marginLeft: 10,
                                  marginBottom: 0,
                                }}
                              >
                                {cv.guarrantor.phoneNumber}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
            )}

            {Object.keys(cv).length === 0 &&
              this.props.getCvStatus !== GetCvActions.GET_CV_FAILED && (
                <div
                  style={{ minHeight: 200 }}
                  className='  d-flex flex-column justify-content-center align-items-center'
                >
                  <h3 style={{ marginTop: 10 }}>Create and Submit my CV</h3>
                  <Button
                    onClick={() =>
                      this.props.history.push('/dashboard/cv/create')
                    }
                    size='large'
                    variant='contained'
                    color='primary'
                  >
                    Create CV
                  </Button>
                </div>
              )}

            {Object.keys(cv).length === 0 &&
              this.props.getCvStatus === GetCvActions.GET_CV_FAILED && (
                <div
                  style={{ minHeight: 200 }}
                  className=' text-center  d-flex flex-column justify-content-center align-items-center'
                >
                  <Description
                    className='text-danger'
                    style={{ fontSize: 70 }}
                  />
                  <h5 style={{ marginTop: 20 }}>
                    Oops!!! Could not get CV please try again
                  </h5>
                  <Button
                    onClick={() => this.props.getCv(this.props.user.userId)}
                    size='large'
                    variant='contained'
                    color='secondary'
                  >
                    Try Again
                  </Button>
                </div>
              )}
          </div>
        </div>
        <BackDrop
          open={
            this.props.getCvStatus === GetCvActions.GET_CV_STARTED &&
            Object.keys(cv).length === 0
          }
        >
          <CircularProgress color='inherit' />
          <h5 style={{ marginLeft: 20 }}>Finding My CV ....</h5>
        </BackDrop>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(CV);
